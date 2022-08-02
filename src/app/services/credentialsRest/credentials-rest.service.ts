import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredentialsRestService
{
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor
  (
    private http: HttpClient
  ){ }

  //Solicitudes HTTP propias de la entidad Usuario
  register(params: {})
  {
    let body = JSON.stringify(params); //CONVERTIR A JSON
    return this.http.post(environment.baseURI + 'user/register', body, {headers: this.httpOptions});
  }

  login(params: {})
  {
    let body = JSON.stringify(params); //CONVERTIR A JSON
    return this.http.post(environment.baseURI + 'user/login', body, { headers: this.httpOptions });
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  }

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity =  JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity;
  }


  getShoppingCart(){
    let globalShoppingCart = localStorage.getItem('shoppingCart');
    let shoppingCart;
    if(globalShoppingCart != undefined){
      shoppingCart =  JSON.parse(globalShoppingCart);
    }else{
      shoppingCart = '';
    }
    return shoppingCart;
  }
}
