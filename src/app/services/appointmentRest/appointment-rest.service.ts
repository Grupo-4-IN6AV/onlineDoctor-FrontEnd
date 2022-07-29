import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getAppointments()
  {
    return this.http.get(environment.baseURI + 'appointment/getAppointments', { headers: this.httpOptions });
  }

  getAppointmentsUser()
  {
    return this.http.get(environment.baseURI + 'appointment/getAppointmentsUser', { headers: this.httpOptions });
  }

  saveAppointment(params:{})
  {
    return this.http.post(environment.baseURI + 'appointment/saveAppointment', params, { headers: this.httpOptions });
  }

  getAppointment(id:string)
  {
    return this.http.get(environment.baseURI + 'appointment/getAppointment/' + id, { headers: this.httpOptions });
  }

  updateAppointment(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'appointment/updateAppointment/' + id, params, { headers: this.httpOptions });
  }

  deleteAppointment(id:string)
  {
    return this.http.delete(environment.baseURI + 'appointment/deleteAppointment/' + id, { headers: this.httpOptions });
  }

  getAppointmentName(params:{})
  {
    return this.http.post(environment.baseURI + 'appointment/getAppointmentByName', params, {headers: this.httpOptions});
  }
}
