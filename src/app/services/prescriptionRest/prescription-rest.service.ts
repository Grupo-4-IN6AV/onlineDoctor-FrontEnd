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
    return this.http.get(environment.baseURI + 'previewPrescription/getPreviewPrescriptionsDoctor/' + id, { headers: this.httpOptions });
  }

  savePrescription(params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/savePreviewPrescription', params, { headers: this.httpOptions });
  }

  getPrescription(id:string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getPreviewPrescription/' + id, { headers: this.httpOptions });
  }

  updatePrescription(id:string, params:{})
  {
    console.log(params)
    return this.http.put(environment.baseURI + 'previewPrescription/updatePreviewPrescription/' + id, params, { headers: this.httpOptions });
  }

  deletePrescription(id:string, idUser:string)
  {
    return this.http.delete(environment.baseURI + 'previewPrescription/deletePreviewPrescription/' + id + '/' + idUser, { headers: this.httpOptions });
  }

  addMedicament(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/addMedicament/' + id, params, { headers: this.httpOptions });
  }

  addLaboratory(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/addLaboratory/' + id, params, { headers: this.httpOptions });
  }

  deleteMedicament(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/deleteMedicament/' + id , params, { headers: this.httpOptions });
  }

  deleteLaboratory(id:string, params: {})
  {
    return this.http.post(environment.baseURI + 'previewPrescription/deleteLaboratory/' + id , params, { headers: this.httpOptions });
  }

  getMedicamentsOutPrescription(id: string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getMedicamentsOutPrescription/' + id , { headers: this.httpOptions });
  }

  getLaboratorysOutPrescription(id: string)
  {
    return this.http.get(environment.baseURI + 'previewPrescription/getLaboratorysOutPrescription/' + id , { headers: this.httpOptions });
  }
}
