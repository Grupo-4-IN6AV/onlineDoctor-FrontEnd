import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import Swal from 'sweetalert2';
import { DoctorModel } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css']
})
export class DoctorAdminComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private doctorRest: DoctorRestService,
  ) {
    this.doctor = new DoctorModel('', '', '', '', '', '', '', '', '', '', '', 'DOCTOR', true, '');
  }

  public ngOnInit(): void {
    this.getDoctors();
  }

  //Variables de TypeScript//

  doctors: any;
  doctor: DoctorModel;
  searchDoctor: any;
  doctorView: any;
  doctorUpdate: any;
  doctorDelete: any;
  doctorDeleteModal: any;
  doctorDeletePassword: any;
  showTableDoctors: boolean = false;

  doctorNameUp: any;
  doctorNameDown: any;
  reset: any;

  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0

  //METÓDOS DEL CRUD DE DOCTORS//
  getDoctors() {
    this.doctorRest.getDoctors().subscribe({
      next: (res: any) => this.doctors = res.doctors,
      error: (err) => console.log(err)
    })
  }

  saveDoctor(addDoctorForm: any) {
    this.doctorRest.saveDoctor(this.doctor).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getDoctors();
          addDoctorForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addDoctorForm.reset();
        },
      })
    addDoctorForm.reset();
  }

  getDoctor(id: string) {
    this.doctorRest.getDoctor(id).subscribe({
      next: (res: any) => {
        this.doctorView = res.doctor;
        this.doctorUpdate = res.doctor;
        this.doctorDelete = res.doctor;
        this.doctorDeleteModal = res.doctor;
      },
      error: (err) => { console.log(err.error.message) }
    })
  }

  updateDoctor() {
    this.doctorUpdate.password = undefined;
    this.doctorRest.updateDoctor(this.doctorUpdate._id, this.doctorUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getDoctors();
        if (this.showTableDoctors === true) {
          this.showButtonActions(this.doctorUpdate._id, false)
        }
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

  deleteDoctor(id: string, password: string) {
    Swal.fire({
      title: 'Do you want to delete this Doctor?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const params = {
          password: password
        }
        this.doctorRest.deleteDoctor(id, params).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getDoctors();
            if (this.showTableDoctors === true) {
              this.showButtonActions(this.doctorUpdate._id, false)
            }
            this.doctorDeletePassword = "";
          },
          error: (err) => {
            Swal.fire({
              title: err.error.message || err.error,
              icon: 'error',
              position: 'center',
              timer: 3000
            }),
            this.doctorDeletePassword = "";
            if (this.showTableDoctors === true) {
              this.showButtonActions(this.doctorUpdate._id, false)
            };
          }

        })
        this.getDoctors();
      } else if (result.isDenied) {
        Swal.fire('User Not Deleted', '', 'info')
        this.doctorDeletePassword = "";
      }
    })
    this.doctorDeletePassword = "";
  }

  showPassword() {
    this.doctorDeletePassword = "";
  }

  showTable() {
    this.showTableDoctors = !this.showTableDoctors;
    for (let doctor of this.doctors) {
      doctor.checked = true
    }
  }

  getByUp() {
    this.doctorRest.getDoctorsByUp().subscribe({
      next: (res: any) => {
        this.doctorNameDown = this.reset;
        this.doctorNameUp = res.doctorAtoZ
        this.doctors = res.doctorAtoZ
      },
      error: (err) => console.log(err)
    })
  }

  getByDown() {
    this.doctorRest.getDoctorsByDown().subscribe({
      next: (res: any) => {
        this.doctorNameUp = this.reset;
        this.doctorNameDown = res.doctorZtoA;
        this.doctors = res.doctorZtoA
      },
      error: (err) => console.log(err)
    })
  }

  cleanTable() {
    this.doctorNameUp = this.reset
    this.doctorNameDown = this.reset
    this.getDoctors();
    this.searchDoctor = this.reset;
  }

  showButtonActions(doctorID: any, check: any) {
    this.controloClick += 1
    let controlCheck = !check.checked
    if (this.controloClick == 1) {
      for (let doctor of this.doctors) {
        if (doctorID != doctor._id) {
          doctor.checked = !controlCheck
        }
        else if (doctorID == doctor._id) {
          doctor.checked = controlCheck
        }
      }
    }
    else if (this.controloClick == 2) {
      for (let doctor of this.doctors) {
        doctor.checked = true;
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
