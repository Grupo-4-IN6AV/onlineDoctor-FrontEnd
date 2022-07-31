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
    return this.http.get(environment.baseURI + 'laboratory/getLaboratories', { headers: this.httpOptions });
  }

  saveLaboratory(params:{})
  {
    return this.http.post(environment.baseURI + 'laboratory/saveLaboratory', params, { headers: this.httpOptions });
  }

  getLaboratory(id:string)
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratory/' + id, { headers: this.httpOptions });
  }

  updateLaboratory(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'laboratory/updateLaboratory/' + id, params, { headers: this.httpOptions });
  }

  deleteLaboratory(id:string)
  {
    return this.http.delete(environment.baseURI + 'laboratory/deleteLaboratory/' + id, { headers: this.httpOptions });
  }

  //FUNCIONES DE DOCTORES//

  getLaboratoriesDoctor(id: string)
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoriesDoctor/' + id, { headers: this.httpOptions });
  }

  saveLaboratoryDoctor(params:{})
  {
    return this.http.post(environment.baseURI + 'laboratory/saveLaboratoryDoctor', params, { headers: this.httpOptions });
  }

  getLaboratoryDoctor(id:string)
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoryDoctor/' + id, { headers: this.httpOptions });
  }

  updateLaboratoryDoctor(id:string, params:{})
  {
    console.log(params)
    return this.http.put(environment.baseURI + 'laboratory/updateLaboratoryDoctor/' + id, params, { headers: this.httpOptions });
  }

  deleteLaboratoryDoctor(id:string, idUser:string)
  {
    return this.http.delete(environment.baseURI + 'laboratory/deleteLaboratoryDoctor/' + id + '/' + idUser, { headers: this.httpOptions });
  }

  getLaboratoriesUser()
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoriesUser', { headers: this.httpOptions });
  }

  getLaboratoriesPacient()
  {
    return this.http.get(environment.baseURI + 'laboratory/getLaboratoriesPaciente', { headers: this.httpOptions });
  }

}
