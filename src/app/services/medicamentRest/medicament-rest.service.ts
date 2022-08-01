import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class MedicamentRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getMedicaments()
  {
    return this.http.get(environment.baseURI + 'medicament/getMedicaments', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()).set('Authorization', this.credentialReset.getToken()) });
  }

  saveMedicament(params:{})
  {
    return this.http.post(environment.baseURI + 'medicament/saveMedicament', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()).set('Authorization', this.credentialReset.getToken()) });
  }

  getMedicament(id:string)
  {
    return this.http.get(environment.baseURI + 'medicament/getMedicament/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()).set('Authorization', this.credentialReset.getToken()) });
  }

  updateMedicament(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'medicament/updateMedicament/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()).set('Authorization', this.credentialReset.getToken()) });
  }

  deleteMedicament(id:string)
  {
    return this.http.delete(environment.baseURI + 'medicament/deleteMedicament/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()).set('Authorization', this.credentialReset.getToken()) });
  }

  getMedicamentName(params:{})
  {
    return this.http.post(environment.baseURI + 'medicament/getMedicamentByName', params, {headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getMedicamentsByUp()
  {
    return this.http.get(environment.baseURI + 'medicament/getMedicamentAtoZ', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getMedicamentsByDown()
  {
    return this.http.get(environment.baseURI + 'medicament/getMedicamentZtoA', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

    //Implementación de Imágenes//
    requestFiles(
      medicamentID: string,
      files: Array<File>,
      name: string) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        let uri = environment.baseURI + 'medicament/uploadImageMedicament/' + medicamentID;

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
