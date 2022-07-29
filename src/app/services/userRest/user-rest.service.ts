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
}
