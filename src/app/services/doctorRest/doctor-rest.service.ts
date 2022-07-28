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
}
