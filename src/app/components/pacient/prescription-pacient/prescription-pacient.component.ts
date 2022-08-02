import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionRestService } from 'src/app/services/prescriptionRest/prescription-rest.service';
import { PrescriptionModel } from 'src/app/models/prescription.model';
import { CredentialsRestService } from '../../../services/credentialsRest/credentials-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-prescription-pacient',
  templateUrl: './prescription-pacient.component.html',
  styleUrls: ['./prescription-pacient.component.css']
})
export class PrescriptionPacientComponent implements OnInit {

  prescriptions: any;
  prescriptionView: any;
  laboratories: any;
  medicaments: any;
  prescriptionId: any;


  AddPrescriptionView: any;

  fullNamePacient: any;
  actualPacientData: any;

  fullNameDoctor: any;
  collegiateNumberDoctor: any;
  phoneDoctor: any;
  emailDoctor: any;

  nameMedicament:any;

  dataPrescripcionComent:any;
  dataPrescripcionDiagnostic:any;

  medicamentsInPrescription: any;
  medicamentsOutPrescription: any;

  laboratorysInPrescription: any;
  laboratorysOutPrescription: any;


  constructor(
    public dialog: MatDialog,
    private prescriptionRest: PrescriptionRestService,
    private credentialRest: CredentialsRestService,
  )
  {
  }

  ngOnInit(): void
  {
    this.getPrescriptionUser();
    this.actualPacient();
  }

  actualPacient(){
    this.actualPacientData = this.credentialRest.getIdentity();
    this.fullNamePacient = this.actualPacientData.name + " " + this.actualPacientData.surname
  }

  getPrescriptionUser()
  {
    this.prescriptionRest.getPrescriptionsUser().subscribe({
      next: (res: any) => {
        this.prescriptions = res.prescriptions;
      },
      error: (err) =>
      {
        console.log(err);
      }
    })
  }

  getPrescription(id:string)
  {
    this.prescriptionRest.getPrescription(id).subscribe({
      next: (res: any) => {
        console.log(res.laboratories)
        this.prescriptionId = id;
        this.AddPrescriptionView = res.prescription;
        this.fullNameDoctor = res.prescription.doctor.name + ' ' + res.prescription.doctor.surname;
        this.collegiateNumberDoctor = res.prescription.doctor.collegiateNumber;
        this.phoneDoctor = res.prescription.doctor.phone;
        this.emailDoctor = res.prescription.doctor.email;

        this.prescriptionView = res.prescription;
        this.laboratories = res.laboratories;
        this.medicaments = res.medicaments;

        this.getMedicamentsOutList();
        this.getLaboratorysOutPrescription();

      },
      error: (err) =>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

  getMedicamentsOutList() {
    this.prescriptionRest.getMedicamentsOutPrescription(this.prescriptionId).subscribe({
      next: (res: any) => {
        this.medicamentsOutPrescription = res.medicamentsOutPrescription,
          this.medicamentsInPrescription = res.medicamentsInPrescription
      },
      error: (err) => console.log(err)
    })
  }

  getLaboratorysOutPrescription() {
    this.prescriptionRest.getLaboratorysOutPrescription(this.prescriptionId).subscribe({
      next: (res: any) => {
        this.laboratorysOutPrescription = res.laboratorysOutPrescription,
          this.laboratorysInPrescription = res.laboratorysInPrescription,
          console.log(res.laboratorysInPrescription)
      },
      error: (err) => console.log(err)}
    )}


  getPrescriptionPDF(id:string)
  {
    this.prescriptionRest.createPrescriptionPDF(id).subscribe({
      next: (res: any) =>
      {
        window.open("http://localhost:3000/Receta/" + id);
      },
      error: (err) =>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }
}


