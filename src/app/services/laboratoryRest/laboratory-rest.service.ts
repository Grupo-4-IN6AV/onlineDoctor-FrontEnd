import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getLaboratories()
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratories', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveLaboratory(params:{})
  {
    return this.http.post(environment.baseURI + 'laboratory/saveLaboratory', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getLaboratory(id:string)
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratory/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateLaboratory(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'laboratory/updateLaboratory/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteLaboratory(id:string)
  {
    return this.http.delete(environment.baseURI + 'laboratory/deleteLaboratory/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  //FUNCIONES DE DOCTORES//

  getLaboratoriesDoctor(id: string)
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoriesDoctor/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveLaboratoryDoctor(params:{})
  {
    return this.http.post(environment.baseURI + 'laboratory/saveLaboratoryDoctor', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getLaboratoryDoctor(id:string)
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoryDoctor/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateLaboratoryDoctor(id:string, params:{})
  {
    console.log(params)
    return this.http.put(environment.baseURI + 'laboratory/updateLaboratoryDoctor/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteLaboratoryDoctor(id:string, idUser:string)
  {
    return this.http.delete(environment.baseURI + 'laboratory/deleteLaboratoryDoctor/' + id + '/' + idUser, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getLaboratoriesUser()
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoriesUser', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getLaboratoriesPacient()
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoriesPaciente', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveResult(id:string, params: {})
  {
    return this.http.put(environment.baseURI + 'laboratory/saveResultLaboratories/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

}
