import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TypeLaboratoryRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getTypesLaboratory()
  {
    return this.http.get(environment.baseURI + 'typeLaboratory/getTypesLaboratory', { headers: this.httpOptions });
  }

  saveTypeLaboratory(params:{})
  {
    return this.http.post(environment.baseURI + 'typeLaboratory/saveTypeLaboratory', params, { headers: this.httpOptions });
  }

  getTypeLaboratory(id:string)
  {
    return this.http.get(environment.baseURI + 'typeLaboratory/getTypeLaboratory/' + id, { headers: this.httpOptions });
  }

  updateTypeLaboratory(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'typeLaboratory/updateTypeLaboratory/' + id, params, { headers: this.httpOptions });
  }

  deleteTypeLaboratory(id:string)
  {
    return this.http.delete(environment.baseURI + 'typeLaboratory/deleteTypeLaboratory/' + id, { headers: this.httpOptions });
  }

  getTypeLaboratoryName(params:{})
  {
    return this.http.post(environment.baseURI + 'typeLaboratory/getTypeLaboratoryByName', params, {headers: this.httpOptions});
  }

  getTypeLaboratorysByUp()
  {
    return this.http.get(environment.baseURI + 'typeLaboratory/getTypeLaboratoryAtoZ', { headers: this.httpOptions });
  }

  getTypeLaboratorysByDown()
  {
    return this.http.get(environment.baseURI + 'typeLaboratory/getTypeLaboratoryZtoA', { headers: this.httpOptions });
  }

  getTypesLaboratoryDoctor()
  {
    return this.http.get(environment.baseURI + 'typeLaboratory/getTypesLaboratoryDoctor', { headers: this.httpOptions });
  }
  getTypeLaboratoryDoctor(id:string)
  {
    return this.http.get(environment.baseURI + 'typeLaboratory/getTypeLaboratoryDoctor/' + id, { headers: this.httpOptions });
  }
}
