import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import { LaboratoryRestService } from 'src/app/services/laboratoryRest/laboratory-rest.service';
import { MedicamentRestService } from 'src/app/services/medicamentRest/medicament-rest.service';
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
  prescription: PrescriptionModel;
  searchPrescription: any;
  prescriptionView: any;
  showTablePrescription: boolean = false;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0;
  showButtons: boolean = false;
  prescriptionId:any;

  //Variables de usuarios
  users:any;
  user:any
  userId:any;
  showUsers: boolean = true;
  searchUser:any;
  namePacient: any;

  doctors:any;
  medicaments:any;
  laboratories:any;
  doctorId: any;
  nameDoctor:any;
  actualUserId: any;
  doctor:any;
  medicamentsUser:any;
  medicamentsAllUser:any;
  laboratoriesUser:any;
  laboratorysUser:any;

  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private doctorRest: DoctorRestService,
    private userRest: UserRestService,
    private medicamentRest: MedicamentRestService,
    private laboratoryRest: LaboratoryRestService,
    private prescriptionRest: PrescriptionRestService,
    private credentialReset: CredentialsRestService,
  ) { 
    this.prescription = new PrescriptionModel('','','', '', '', '', '', '', true)
  }

  ngOnInit(): void {
    this.actualUserId = this.credentialReset.getIdentity()._id;
    this.getUserDoctor();
    this.getPrescriptionsDoctor();
  }

  getPrescriptionsDoctor() {
    this.prescriptionRest.getPrescriptionsDoctor(this.actualUserId).subscribe({
      next: (res: any) => {
        this.prescriptions = res.prescriptions;
      },
      error: (err) => console.log(err)
    })
  }

  getUsersDoctor() {
    this.userRest.getUsersDoctor().subscribe({
      next: (res: any) => {this.users = res.users},
      error: (err) => console.log(err)
    })
  }

  getUserDoctor()
  { 
    this.userRest.getUser(this.actualUserId).subscribe({
      next: (res: any) => this.user = res.user,
      error: (err) => console.log(err)
    })
  }

  getMedicaments() {
    this.medicamentRest.getMedicaments().subscribe({
      next: (res: any) => this.medicaments = res.medicaments,
      error: (err) => console.log(err)
    })
  }

  getLaboratories() {
    this.laboratoryRest.getLaboratoriesDoctor(this.actualUserId).subscribe({
      next: (res: any) => this.laboratories = res.laboratories,
      error: (err) => console.log(err)
    })
  }

  getDoctors() {
    this.doctorRest.getDoctors().subscribe({
      next: (res: any) => this.doctors = res.doctors,
      error: (err) => console.log(err)
    })
  }

  getPrescriptionDoctor(id: string) {
    this.prescriptionRest.getPrescription(id).subscribe({
      next: (res: any) => {
        this.prescriptionId = id;
        this.prescriptionView = res.prescription;
        this.medicamentsUser = res.prescription.medicaments;
        this.laboratoriesUser = res.laboratories;
        console.log(this.laboratoriesUser)
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

  showTable() {
    this.showTablePrescription = !this.showTablePrescription;
    for (let prescription of this.prescriptions) {
      prescription.checked = true
    }
  }

  cleanTable() {
    this.getPrescriptionsDoctor();
    this.searchPrescription = this.reset;
  }

  showButtonActions(prescriptionID: any, check: any) {
    this.controloClick += 1
    let controlCheck = !check.checked
    if (this.controloClick == 1) {
      for (let prescription of this.prescriptions) {
        if (prescriptionID != prescription._id) {
          prescription.checked = !controlCheck
        }
        else if (prescriptionID == prescription._id) {
          prescription.checked = controlCheck
        }
      }
    }
    else if (this.controloClick == 2) {
      for (let prescription of this.prescriptions) {
        prescription.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions = !this.buttonActions;
    console.log(this.controloClick)
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
