import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AppointmentRestService } from 'src/app/services/appointmentRest/appointment-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-admin',
  templateUrl: './appointment-admin.component.html',
  styleUrls: ['./appointment-admin.component.css']
})
export class AppointmentAdminComponent implements OnInit {

  appointments: any;
  appointment: AppointmentModel;
  searchAppointment: any;
  appointmentView: any;
  appointmentUpdate: any;
  appointmentDelete: any;
  showTableAppointment: boolean = false;
  reset: any;
  users:any;
  doctors:any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0

  
  
  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private appointmentRest: AppointmentRestService,
    private userRest: UserRestService,
    private doctorRest: DoctorRestService,
  ) { 
    this.appointment = new AppointmentModel('','','', '', '', true)
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentRest.getAppointments().subscribe({
      next: (res: any) => {
        this.appointments = res.appointmentsExist;
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

  getDoctors() {
    this.doctorRest.getDoctors().subscribe({
      next: (res: any) => this.doctors = res.doctors,
      error: (err) => console.log(err)
    })
  }

  saveAppointment(addAppointmentForm: any) {
    this.appointmentRest.saveAppointment(this.appointment).subscribe
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
    for (let appointment of this.appointments) {
      appointment.checked = true
    }
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
