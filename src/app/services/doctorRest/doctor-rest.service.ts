import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor
  (
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  )
  {
  }

  //FUNCIONES DE ADMINISTRADOR//
  getDoctors()
  {
    return this.http.get(environment.baseURI + 'doctor/getDoctors', { headers: this.httpOptions });
  }

  saveDoctor(params:{})
  {
    return this.http.post(environment.baseURI + 'doctor/saveDoctorAdmin', params, { headers: this.httpOptions });
  }

  updateDoctor(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'doctor/updateDoctorAdmin/' + id, params, { headers: this.httpOptions });
  }

  getDoctor(id:string)
  {
    return this.http.get(environment.baseURI + 'doctor/getDoctor/' + id, { headers: this.httpOptions });
  }

  searchDoctor(params:{ })
  {
    return this.http.post(environment.baseURI + 'doctor/searchDoctor/', params, { headers: this.httpOptions });
  }

  deleteDoctor(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'doctor/deleteDoctorAdmin/' + id, params, { headers: this.httpOptions });
  }

  getDoctorName(params:{})
  {
    return this.http.post(environment.baseURI + 'doctor/getDoctorByName', params, {headers: this.httpOptions});
  }

  getDoctorsByUp()
  {
    return this.http.get(environment.baseURI + 'doctor/getDoctorAtoZ', { headers: this.httpOptions });
  }

  getDoctorsByDown()
  {
    return this.http.get(environment.baseURI + 'doctor/getDoctorZtoA', { headers: this.httpOptions });
  }

  getSpecialities()
  {
    return this.http.get(environment.baseURI + 'speciality/getSpecialities', { headers: this.httpOptions });
  }

  //Implementación de Imágenes//
  requestFiles(
    doctorID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseURI + 'doctor/uploadImageDoctor/' + doctorID;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) { //AJAX status 4 = ok/done
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.credentialReset.getToken());
      xhr.send(formData)
    })
  }
}
