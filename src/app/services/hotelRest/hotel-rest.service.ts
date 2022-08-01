import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor
  (
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  //FUNCIONES DE ADMINISTRADOR//
  getHotels()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotels', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveHotel(params : {})
  {
    return this.http.post(environment.baseURI + 'hotel/saveHotel', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getHotel(id : string)
  {
    return this.http.get(environment.baseURI + 'hotel/getHotel/' + id,  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getHotelsNameUp()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotelsNameUp',  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getHotelsNameDown()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotelsNameDown',  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getHotelName(params:{})
  {
    return this.http.post(environment.baseURI + 'hotel/getHotelName', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateHotel(id : string, params : {})
  {
    return this.http.put(environment.baseURI + 'hotel/updateHotel/' + id,  params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteHotel(id : string)
  {
    return this.http.delete(environment.baseURI + 'hotel/deleteHotel/' + id,  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }
}
