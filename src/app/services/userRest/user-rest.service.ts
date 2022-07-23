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
    return this.http.post(environment.baseURI + 'user/searchUser/', params, { headers: this.httpOptions });
  }

  getUsersByUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersByUp', { headers: this.httpOptions });
  }

  getUsersByDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersByDown', { headers: this.httpOptions });
  }

  getUsersSurnameByUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersSurnameByUp', { headers: this.httpOptions });
  }

  getUsersSurnameByDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersSurnameByDown', { headers: this.httpOptions });
  }

  getUsersClient()
  {
    return this.http.get(environment.baseURI + 'user/getUsersClient', { headers: this.httpOptions });
  }

  getUsersAdminHotel()
  {
    return this.http.get(environment.baseURI + 'user/getUsersAdminHotel', { headers: this.httpOptions });
  }

  deleteUser(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'user/deleteUser/' + id, params, { headers: this.httpOptions });
  }

}
