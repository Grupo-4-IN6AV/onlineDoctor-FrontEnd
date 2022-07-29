import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AppointmentRestService } from 'src/app/services/appointmentRest/appointment-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import Swal from 'sweetalert2';
import { CredentialsRestService } from '../../../services/credentialsRest/credentials-rest.service';
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
  selector: 'app-appointment-doctor',
  templateUrl: './appointment-doctor.component.html',
  styleUrls: ['./appointment-doctor.component.css']
})
export class AppointmentDoctorComponent implements OnInit {

  appointments: any;
  appointment: AppointmentModel;
  searchAppointment: any;
  appointmentView: any;
  appointmentUpdate: any;
  appointmentDelete: any;
  showTableAppointment: boolean = false;
  reset: any;
  users: any;
  doctor: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0;
  actualDate: any;
  setDate: any;

  OnlyOneDate: any;
  actualUserId: any;
  newDate: any;

  //Opciones de Calendarios
  calendarOptions: CalendarOptions = { initialView: 'dayGridMonth', events: [] };
  showCalendarAppointments: any;

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private appointmentRest: AppointmentRestService,
    private userRest: UserRestService,
    private doctorRest: DoctorRestService,
    private credentialReset: CredentialsRestService,
  ) {
    this.appointment = new AppointmentModel('', '', '', '', '', true)
  }

  ngOnInit(): void {
    this.actualDate = new Date();
    this.getAppointments();
    this.actualUserId = this.credentialReset.getIdentity()._id;
    this.getDoctor();
  }

  getAppointments() {
    this.appointmentRest.getAppointmentsUser().subscribe({
      next: (res: any) => {
        this.appointments = res.appointmentsExist;

        var arrayDate = [];
        for(let date of res.appointmentsExist){
          const newDate = date.date.split('T');
          arrayDate.push(newDate[0])
        }
        this.newDate = arrayDate;

        var color;
        var calendarArray = [];
        var availableEventsArray = [];
        for (let appointment of this.appointments) {
          var appointmentID = appointment._id;
          var nameAppointment = 'Apointment' + 'Dr. ' + appointment.doctor.name + ' ' + 'Pacient.' + appointment.pacient.name;
          var actualDate = appointment.date.split('T');
          calendarArray.push({
            title: nameAppointment,
            description: appointmentID,
            date: actualDate[0],
            className: "fc-event-primary"
          })
        }
        this.calendarOptions.events = calendarArray;
      },
      error: (err) => console.log(err)
    })
  }

  getUsers() {
    this.userRest.getUsers().subscribe({
      next: (res: any) => this.users = res.users,
      error: (err) => console.log(err)
    })
  }

  getDoctor() {
    this.doctorRest.getDoctor(this.actualUserId).subscribe({
      next: (res: any) => this.doctor = res.doctor,
      error: (err) => console.log(err)
    })
  }

  saveAppointment(addAppointmentForm: any) {
    let params = {
      pacient: this.appointment.pacient,
      doctor: this.actualUserId,
      date: this.appointment.date,
      modality: this.appointment.modality
    }
    this.appointmentRest.saveAppointment(params).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getAppointments();
          addAppointmentForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addAppointmentForm.reset();
        },
      })
    addAppointmentForm.reset();
  }

  getAppointment(id: string) {
    this.appointmentRest.getAppointment(id).subscribe({
      next: (res: any) => {
        this.appointmentView = res.appointment;
        this.appointmentUpdate = res.appointment;
        this.appointmentDelete = res.appointment;
        let split = res.appointment.date.split('T');
        this.OnlyOneDate = split[0];
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

  updateAppointment() {
    let params = {
      pacient: this.appointmentUpdate.pacient,
      doctor: this.actualUserId,
      date: this.appointmentUpdate.date,
      modality: this.appointmentUpdate.modality
    }
    this.appointmentRest.updateAppointment(this.appointmentUpdate._id, this.appointmentUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getAppointments();
        this.showButtonActions(this.appointmentUpdate._id, false)
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }

  deleteAppointment(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Appointment?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.appointmentRest.deleteAppointment(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getAppointments();
            this.showButtonActions(id, false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getAppointments();
      } else if (result.isDenied) {
        Swal.fire('Appointment Not Deleted', '', 'info')
      }
    })
  }

  showTable() {
    this.showTableAppointment = !this.showTableAppointment;
    this.showCalendarAppointments = false;
    for (let appointment of this.appointments) {
      appointment.checked = true
    }
  }

  showCalendar() {
    this.showCalendarAppointments = true;
    this.showTableAppointment = false;
  }

  cleanTable() {
    this.getAppointments();
    this.searchAppointment = this.reset;
  }

  showButtonActions(appointmentID: any, check: any) {
    this.controloClick += 1
    let controlCheck = !check.checked
    if (this.controloClick == 1) {
      for (let appointment of this.appointments) {
        if (appointmentID != appointment._id) {
          appointment.checked = !controlCheck
        }
        else if (appointmentID == appointment._id) {
          appointment.checked = controlCheck
        }
      }
    }
    else if (this.controloClick == 2) {
      for (let appointment of this.appointments) {
        appointment.checked = true;
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
