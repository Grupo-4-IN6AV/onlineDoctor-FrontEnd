import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserRestService
{

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
  getUsers()
  {
    return this.http.get(environment.baseURI + 'user/getUsers', { headers: this.httpOptions });
  }

  saveUser(params:{})
  {
    return this.http.post(environment.baseURI + 'user/saveUser', params, { headers: this.httpOptions });
  }

  updateUser(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'user/updateUser/' + id, params, { headers: this.httpOptions });
  }

  getUser(id:string)
  {
    return this.http.get(environment.baseURI + 'user/getUser/' + id, { headers: this.httpOptions });
  }

  searchUser(params:{ })
  {
    return this.http.post(environment.baseURI + 'user/getUsersByName', params, { headers: this.httpOptions });
  }


  deleteUser(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'user/deleteUser/' + id, params, { headers: this.httpOptions });
  }

  getUsersByUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersAtoZ', { headers: this.httpOptions });
  }

  getUsersByDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersZtoA', { headers: this.httpOptions });
  }

  getUsersDoctor()
  {
    return this.http.get(environment.baseURI + 'user/getUsersDoctor', { headers: this.httpOptions });
  }

  getUserDoctor(id:string)
  {
    return this.http.get(environment.baseURI + 'user/getUserDoctor/' + id, { headers: this.httpOptions });
  }

  getUsersAndDoctors()
  {
    return this.http.get(environment.baseURI + 'user/getUsersAndDoctors', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  //Implementación de Imágenes//
  requestFiles(
    userID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseURI + 'user/uploadImageUser/' + userID;

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
