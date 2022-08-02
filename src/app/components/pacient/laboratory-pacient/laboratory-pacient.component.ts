import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import { LaboratoryRestService } from 'src/app/services/laboratoryRest/laboratory-rest.service';
import { LaboratoryModel } from 'src/app/models/laboratory.model';
import { CredentialsRestService } from '../../../services/credentialsRest/credentials-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-laboratory-pacient',
  templateUrl: './laboratory-pacient.component.html',
  styleUrls: ['./laboratory-pacient.component.css']
})
export class LaboratoryPacientComponent implements OnInit {

  laboratories: any;
  laboratory: LaboratoryModel;
  searchLaboratory: any;
  laboratoryView: any;
  AddlaboratoryView:any;
  showTableLaboratory: boolean = false;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0;
  showButtons: boolean = false;
  laboratoryId:any;

  //Variables de usuarios
  users:any;
  user:any
  userId:any;
  showUsers: boolean = true;
  searchUser:any;
  namePacient: any;

  doctors:any;
  doctorId: any;
  nameDoctor:any;
  actualUserId: any;
  doctor:any;
  laboratoriesUser:any;
  laboratorysUser:any;

  fullNamePacient: any;
  actualPacientData: any;

  fullNameDoctor: any;
  collegiateNumberDoctor: any;
  phoneDoctor: any;
  emailDoctor: any;

  newDate: any;

  dataLaboratoryComent:any;
  dataLaboratoryDiagnostic:any;

  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private doctorRest: DoctorRestService,
    private userRest: UserRestService,
    private laboratoryRest: LaboratoryRestService,
    private credentialReset: CredentialsRestService,
  ) { 
    this.laboratory = new LaboratoryModel('','','', '', '', true)
  }

  ngOnInit(): void {
    this.actualUserId = this.credentialReset.getIdentity()._id;
    this.getUserDoctor();
    this.getLaboratoriesDoctor();
    this.actualPacient();
    this.getDoctors();
  }

  getLaboratoriesDoctor() {
    this.laboratoryRest.getLaboratoriesDoctor(this.actualUserId).subscribe({
      next: (res: any) => {
        this.laboratories = res.laboratories, console.log(this.laboratories);
        var arrayDate = [];
        for(let date of res.laboratories){
          const newDate = date.date.split('T');
          arrayDate.push(newDate[0])
        }
        this.newDate = arrayDate;
      },
      error: (err) => console.log(err)
    })
  }

  actualPacient(){
    this.actualPacientData = this.credentialReset.getIdentity();
    this.fullNamePacient = this.actualPacientData.name + " " + this.actualPacientData.surname
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
  

  getLaboratoryPacient(id:string) {
    this.laboratoryRest.getLaboratoryPacient(id).subscribe({
      next: (res: any) => {
        
        this.laboratoryId = id;
        this.laboratoryView = res.laboratory;
        this.AddlaboratoryView = res.laboratory;
        this.dataLaboratoryComent = res.laboratory.resultado;
        this.dataLaboratoryDiagnostic = res.laboratory.diagnosis;
        this.fullNameDoctor = res.laboratory.doctor.name + ' ' + res.laboratory.doctor.surname;
        this.collegiateNumberDoctor = res.laboratory.doctor.collegiateNumber;
        this.phoneDoctor = res.laboratory.doctor.phone;
        this.emailDoctor = res.laboratory.doctor.email;
        this.laboratories = res.laboratories;
        
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
    this.showTableLaboratory = !this.showTableLaboratory;
    for (let laboratory of this.laboratories) {
      laboratory.checked = true
    }
  }

  cleanTable() {
    this.getLaboratoriesDoctor();
    this.searchLaboratory = this.reset;
  }

  showButtonActions(laboratoryID: any, check: any) {
    this.controloClick += 1
    let controlCheck = !check.checked
    if (this.controloClick == 1) {
      for (let laboratory of this.laboratories) {
        if (laboratoryID != laboratory._id) {
          laboratory.checked = !controlCheck
        }
        else if (laboratoryID == laboratory._id) {
          laboratory.checked = controlCheck
        }
      }
    }
    else if (this.controloClick == 2) {
      for (let laboratory of this.laboratories) {
        laboratory.checked = true;
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
