import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  createShoppingCart(params: {}){
    return this.http.post(environment.baseURI + 'shoppingCart/createShoppingCart', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getShoppingCart(){
    return this.http.get(environment.baseURI + 'shoppingCart/getShoppingCart', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }
}
