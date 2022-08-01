import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor(
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  //FUNCIONES DE DOCTORES//

  getPrescriptionsDoctor(id: string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getPreviewPrescriptionsDoctor/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getPrescriptionsUser()
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getPreviewPrescriptionsUSER' , { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  savePrescription(params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/savePreviewPrescription', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getPrescription(id:string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getPreviewPrescription/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updatePrescription(id:string, params:{})
  {
    console.log(params)
    return this.http.put(environment.baseURI + 'previewPrescription/updatePreviewPrescription/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deletePrescription(id:string, idUser:string)
  {
    return this.http.delete(environment.baseURI + 'previewPrescription/deletePreviewPrescription/' + id + '/' + idUser, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  addMedicament(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/addMedicament/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  addLaboratory(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/addLaboratory/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteMedicament(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/deleteMedicament/' + id , params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteLaboratory(id:string, params: {})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/deleteLaboratory/' + id , params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getMedicamentsOutPrescription(id: string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getMedicamentsOutPrescription/' + id , { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getLaboratorysOutPrescription(id: string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getLaboratorysOutPrescription/' + id , { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  createPrescriptionPDF(id: string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/createPrescriptionPDF/' + id , { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }
}
