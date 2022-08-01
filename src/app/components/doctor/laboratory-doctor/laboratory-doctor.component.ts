import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { TypeLaboratoryRestService } from 'src/app/services/typeLaboratoryRest/type-laboratory-rest.service';
import { LaboratoryRestService } from 'src/app/services/laboratoryRest/laboratory-rest.service';
import { LaboratoryModel } from 'src/app/models/laboratory.model';
import { CredentialsRestService } from '../../../services/credentialsRest/credentials-rest.service';
import Swal from 'sweetalert2';

import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { DOCUMENT } from '@angular/common';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';

@Component({
  selector: 'app-laboratory-doctor',
  templateUrl: './laboratory-doctor.component.html',
  styleUrls: ['./laboratory-doctor.component.css']
})
export class LaboratoryDoctorComponent implements OnInit {

  laboratories: any;
  laboratory: LaboratoryModel;
  searchLaboratory: any;
  laboratoryView: any;
  AddlaboratoryView: any;
  laboratoryUpdate: any;
  laboratoryDelete: any;
  showTableLaboratory: boolean = false;
  reset: any;
  typesLaboratory:any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0;
  showButtons: boolean = false;
  laboratoryId:any;
  actualDate: any;
  newDate:any;
  onlyOneDate:any;
  calendarOptions:CalendarOptions = {initialView: 'dayGridMonth', events: []};
  namePacient: any;
  showCalendarLaboratories:any;
  example:any = 'Text example';

  //Variables de usuarios
  users:any;
  userId:any;
  showUsers: boolean = true;
  searchUser:any;
  updateLaboratory: any;
  fullNamePacient: any;

  actualDoctorData: any;
  fullNameDoctor: any;

  dataLaboratoryComent:any;
  dataLaboratoryDiagnostic:any;
  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private laboratoryRest: LaboratoryRestService,
    private userRest: UserRestService,
    private typeLaboratoryRest: TypeLaboratoryRestService,
    private credentialReset: CredentialsRestService
  ) { 
    this.laboratory = new LaboratoryModel('','','', '', '', true)
  }

  ngOnInit(): void {
    this.actualDate = new Date();
    this.actualDoctor();
    this.getUsersDoctor();
  }

  
  actualDoctor(){
    this.actualDoctorData = this.credentialReset.getIdentity();
    this.fullNameDoctor = this.actualDoctorData.name + " " + this.actualDoctorData.surname
  }

  getLaboratoriesDoctor() {
    this.laboratoryRest.getLaboratoriesDoctor(this.userId).subscribe({
      next: (res: any) => {
        this.laboratories = res.laboratories;
        var arrayDate = [];
        for (let date of res.laboratories){
          let newDate = date.date.split('T')
          arrayDate.push(newDate[0]);
        }
        this.newDate = arrayDate;
        var calendarArray = [];
        var availableEventsArray = [];

        for(let laboratory of this.laboratories){
          var laboratoryId = laboratory._id;
          var nameLaboratory = 'Laboratory |'+'Tipo de laboratorio: ' + laboratory.typeLaboratory.name + ' ' + '| Pacient.' + laboratory.pacient.name;
          var actualDate = laboratory.date.split('T');
          calendarArray.push({
            title: nameLaboratory,
            description: laboratoryId,
            date: actualDate[0],
            className: "fc-event-primary"
          })
        }
        this.calendarOptions.events = calendarArray;
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

  getUserDoctor(id : string)
  { 
    this.userId = id;
    this.showButtons = !this.showButtons;
    this.showUsers = !this.showUsers;
    this.userRest.getUser(id).subscribe({
      next: (res:any) => { this.namePacient = res.user.name },
      error: (err) => console.log(err)
    })
    this.getLaboratoriesDoctor();
  }

  getTypesLaboratoryDoctor() {
    this.typeLaboratoryRest.getTypesLaboratoryDoctor().subscribe({
      next: (res: any) => this.typesLaboratory = res.typesLaboratory,
      error: (err) => console.log(err)
    })
  }

  saveResultLaboratory(addResultLaboratory: any) {
    var params = {
      result: this.dataLaboratoryComent,
      diagnosis: this.dataLaboratoryDiagnostic
    };
    this.laboratoryRest.saveResult(this.laboratoryId, params).subscribe({
      next: (res: any) => {
        Swal.fire
        ({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.actualDoctor();
        this.getUserDoctor(this.userId);
        addResultLaboratory.reset();
      },
      error: (err) =>{
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        this.getUserDoctor(this.userId);
        addResultLaboratory.reset();
      }
    })
    addResultLaboratory.reset();
  }

  saveLaboratoryDoctor(addLaboratoryForm: any) {
    var data = {
      pacient: this.userId,
      typeLaboratory: this.laboratory.typeLaboratory,
      date: this.laboratory.date,
      specifications: this.laboratory.specifications
    }

    this.laboratoryRest.saveLaboratoryDoctor(data).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getLaboratoriesDoctor();
          this.getUserDoctor(this.userId);
          addLaboratoryForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          this.getUserDoctor(this.userId);
          addLaboratoryForm.reset();
        },
      })
      addLaboratoryForm.reset();
  }

  getLaboratoryDoctor(id: string) {
    this.laboratoryRest.getLaboratoryDoctor(id).subscribe({
      next: (res: any) => {
        this.laboratoryId = id;
        this.laboratoryView = res.laboratory;
        console.log(this.laboratoryView)
        this.AddlaboratoryView = res.laboratory;
        this.fullNamePacient = res.laboratory.pacient.name + ' ' + res.laboratory.pacient.surname
        this.laboratoryUpdate = res.laboratory;
        this.laboratoryDelete = res.laboratory;

        var split = res.laboratory.date.split('T');
        this.onlyOneDate = split[0];
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

  updateLaboratoryDoctor() {
    var data = {
      pacient: this.userId,
      typeLaboratory: this.laboratoryUpdate.typeLaboratory,
      date: this.laboratoryUpdate.date,
      specifications: this.laboratoryUpdate.specifications
    }
    this.laboratoryRest.updateLaboratoryDoctor(this.laboratoryUpdate._id, data).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getLaboratoriesDoctor();
        this.getUserDoctor(this.userId);
        this.showButtonActions(this.laboratoryUpdate._id, false)
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        this.getUserDoctor(this.userId);
      },
    })
  }

  deleteLaboratoryDoctor(id: string) {
    Swal.fire({
      title: 'Deseas eliminar este Laboratorio?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.laboratoryRest.deleteLaboratoryDoctor(id, this.userId).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getLaboratoriesDoctor();
            this.showButtonActions(id, false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getLaboratoriesDoctor();
      } else if (result.isDenied) {
        Swal.fire('Laboratorio no eliminado', '', 'info')
      }
    })
  }

  showTable() {
    this.showTableLaboratory = !this.showTableLaboratory;
    this.showCalendarLaboratories = false;
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

  showCalendar(){
    this.showCalendarLaboratories = true;
    this.showTableLaboratory = false;
  }


}
