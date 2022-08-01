import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TypeMedicamentRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getTypeMedicaments()
  {
    return this.http.get(environment.baseURI + 'typeMedicament/getTypeMedicaments', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveTypeMedicament(params:{})
  {
    return this.http.post(environment.baseURI + 'typeMedicament/saveTypeMedicament', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getTypeMedicament(id:string)
  {
    return this.http.get(environment.baseURI + 'typeMedicament/getTypeMedicament/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateTypeMedicament(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'typeMedicament/updateTypeMedicament/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteTypeMedicament(id:string)
  {
    return this.http.delete(environment.baseURI + 'typeMedicament/deleteTypeMedicament/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getTypeMedicamentName(params:{})
  {
    return this.http.post(environment.baseURI + 'typeMedicament/getTypeMedicamentByName', params, {headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTypeMedicamentsByUp()
  {
    return this.http.get(environment.baseURI + 'typeMedicament/getTypeMedicamentAtoZ', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getTypeMedicamentsByDown()
  {
    return this.http.get(environment.baseURI + 'typeMedicament/getTypeMedicamentZtoA', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }
}
