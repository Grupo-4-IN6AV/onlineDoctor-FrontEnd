import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getSpecialities()
  {
    return this.http.get(environment.baseURI + 'speciality/getSpecialities', { headers: this.httpOptions });
  }

  saveSpeciality(params:{})
  {
    return this.http.post(environment.baseURI + 'speciality/saveSpeciality', params, { headers: this.httpOptions });
  }

  getSpeciality(id:string)
  {
    return this.http.get(environment.baseURI + 'speciality/getSpeciality/' + id, { headers: this.httpOptions });
  }

  updateSpeciality(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'speciality/updateSpeciality/' + id, params, { headers: this.httpOptions });
  }

  deleteSpeciality(id:string)
  {
    return this.http.delete(environment.baseURI + 'speciality/deleteSpeciality/' + id, { headers: this.httpOptions });
  }

  getSpecialityName(params:{})
  {
    return this.http.post(environment.baseURI + 'speciality/getSpecialityByName', params, {headers: this.httpOptions});
  }

  getSpecialitiesByUp()
  {
    return this.http.get(environment.baseURI + 'speciality/getSpecialityAtoZ', { headers: this.httpOptions });
  }

  getSpecialitiesByDown()
  {
    return this.http.get(environment.baseURI + 'speciality/getSpecialityZtoA', { headers: this.httpOptions });
  }
}
