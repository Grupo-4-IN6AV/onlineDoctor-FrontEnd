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
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-prescription-doctor',
  templateUrl: './prescription-doctor.component.html',
  styleUrls: ['./prescription-doctor.component.css']
})
export class PrescriptionDoctorComponent implements OnInit {

  prescriptions: any;
  prescription: PrescriptionModel;
  searchPrescription: any;
  prescriptionView: any;
  prescriptionUpdate: any;
  prescriptionDelete: any;
  showTablePrescription: boolean = false;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0;
  showButtons: boolean = false;
  prescriptionId: any;

  medicamentsInPrescription: any;
  medicamentsOutPrescription: any;

  laboratorysInPrescription: any;
  laboratorysOutPrescription: any;

  //Variables de usuarios
  users: any;
  userId: any;
  showUsers: boolean = true;
  searchUser: any;
  namePacient: any;

  //Variables doctores medicamentos y laboratorios
  doctors: any;
  medicaments: any;
  laboratories: any;
  doctorId: any;
  nameDoctor: any;
  actualUserId: any;
  doctor: any;
  medicamentsUser: any;
  medicamentsAllUser: any;
  laboratoriesUser: any;
  laboratorysUser: any;

  medicamentPrescription: any;
  laboratorysPrescription: any;

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
    this.prescription = new PrescriptionModel('', '', '', '', '', '', '', '', true)
  }

  ngOnInit(): void {
    this.getUsersDoctor();
    this.actualUserId = this.credentialReset.getIdentity()._id;
    this.getDoctor();
  }

  getPrescriptionsDoctor() {
    this.prescriptionRest.getPrescriptionsDoctor(this.userId).subscribe({
      next: (res: any) => {
        this.prescriptions = res.prescriptions;
      },
      error: (err) => console.log(err)
    })
  }

  getUsersDoctor() {
    this.userRest.getUsersDoctor().subscribe({
      next: (res: any) => { this.users = res.users, console.log(this.users) },
      error: (err) => console.log(err)
    })
  }

  getUserDoctor(id: string) {
    this.userId = id;
    this.showButtons = !this.showButtons;
    this.showUsers = !this.showUsers;
    this.userRest.getUser(id).subscribe({
      next: (res: any) => { this.namePacient = res.user.name },
      error: (err) => console.log(err)
    })
    this.getPrescriptionsDoctor();
  }

  getMedicaments() {
    this.medicamentRest.getMedicaments().subscribe({
      next: (res: any) => {
        this.medicaments = res.medicaments;
      },
      error: (err) => console.log(err)
    })
  }

  getLaboratories() {
    this.laboratoryRest.getLaboratoriesDoctor(this.userId).subscribe({
      next: (res: any) => this.laboratories = res.laboratories,
      error: (err) => console.log(err)
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
          this.laboratorysInPrescription = res.laboratorysInPrescription
      },
      error: (err) => console.log(err)
    })
  }

  getDoctors() {
    this.doctorRest.getDoctors().subscribe({
      next: (res: any) => this.doctors = res.doctors,
      error: (err) => console.log(err)
    })
  }

  getDoctor() {
    this.doctorRest.getDoctor(this.actualUserId).subscribe({
      next: (res: any) => this.doctor = res.doctor,
      error: (err) => console.log(err)
    })
  }

  savePrescription(addPrescriptionForm: any) {
    var data = {
      pacient: this.userId,
      doctor: this.actualUserId,
      medicaments: this.prescription.medicaments,
      laboratorys: this.prescription.laboratorys,
      description: this.prescription.description,
      AnotherMedicaments: this.prescription.AnotherMedicaments,
      AnotherLaboratories: this.prescription.AnotherLaboratories
    }
    this.prescriptionRest.savePrescription(data).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getMedicaments();
          this.getPrescriptionsDoctor();
          addPrescriptionForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          this.getMedicaments();
          this.getPrescriptionsDoctor();
          addPrescriptionForm.reset();
        },
      })
    this.getMedicaments();
    this.getPrescriptionsDoctor();
    addPrescriptionForm.reset();
  }

  getPrescriptionDoctor(id: string) {
    this.prescriptionRest.getPrescription(id).subscribe({
      next: (res: any) => {
        this.prescriptionId = id;
        this.prescriptionView = res.prescription;
        this.prescriptionUpdate = res.prescription;
        this.prescriptionDelete = res.prescription;
        this.getMedicamentsOutList();
        this.getLaboratorysOutPrescription();
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

  updatePrescriptionDoctor() {
    var data = {
      pacient: this.userId,
      dcotor: this.actualUserId,
      medicaments: this.prescriptionUpdate.medicaments,
      laboratorys: this.prescriptionUpdate.laboratorys,
      description: this.prescriptionUpdate.description,
      AnotherMedicaments: this.prescriptionUpdate.AnotherMedicaments,
      AnotherLaboratories: this.prescriptionUpdate.AnotherLaboratories
    }
    this.prescriptionRest.updatePrescription(this.prescriptionUpdate._id, data).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getPrescriptionsDoctor();
        this.showButtonActions(this.prescriptionUpdate._id, false)
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

  deletePrescriptionDoctor(id: string) {
    Swal.fire({
      title: 'Deseas eliminar esta receta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.prescriptionRest.deletePrescription(id, this.userId).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getMedicaments();
            this.getPrescriptionsDoctor();
            this.showButtonActions(id, false)
          },
          error: (err) => {
            Swal.fire({
              title: err.error.message,
              icon: 'error',
              position: 'center',
              timer: 3000
            });
            this.getMedicaments();
            this.getPrescriptionsDoctor();
          }
        })
        this.getMedicaments();
        this.getPrescriptionsDoctor();
      } else if (result.isDenied) {
        Swal.fire('No se elimino este medicamento', '', 'info')
      }
    })
  }

  addMedicament(id: string) {
    var data = {
      pacient: this.userId,
      medicaments: id,
    }

    this.prescriptionRest.addMedicament(this.prescriptionId, data).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getMedicaments();
          this.getPrescriptionDoctor(this.prescriptionId);
          this.getMedicamentsOutList();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          this.getMedicaments();
          this.getPrescriptionDoctor(this.prescriptionId);
          this.getMedicamentsOutList();
        },
      })
  }

  addLaboratory(id: string) {
    var data = {
      pacient: this.userId,
      dcotor: this.actualUserId,
      laboratorys: id,
    }

    this.prescriptionRest.addLaboratory(this.prescriptionId, data).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getLaboratories();
          this.getPrescriptionDoctor(this.prescriptionId);
          this.getLaboratorysOutPrescription();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          this.getLaboratories();
          this.getPrescriptionDoctor(this.prescriptionId);
          this.getLaboratorysOutPrescription();
        },
      })
  }

  deleteMedicament(id: string) {
    var data = {
      medicamentID: id,
    }
    Swal.fire({
      title: 'Deseas eliminar este medicamento de la receta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.prescriptionRest.deleteMedicament(this.prescriptionId, data).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getMedicaments();
            this.getPrescriptionDoctor(this.prescriptionId);
            this.getMedicamentsOutList();
            this.showButtonActions(id, false)
          },
          error: (err) => {
            Swal.fire({
              title: err.error.message || err.message,
              icon: 'error',
              position: 'center',
              timer: 3000
            });
            this.getMedicaments();
            this.getPrescriptionDoctor(this.prescriptionId);
            this.getMedicamentsOutList();
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Medicamento No Eliminado', '', 'info')
      }
    })
  }

  deleteLaboratory(id: string) {
    var data = {
      laboratoryID: id,
    }
    Swal.fire({
      title: 'Deseas eliminar este laboratorio de la receta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.prescriptionRest.deleteLaboratory(this.prescriptionId, data).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getLaboratories();
            this.getPrescriptionDoctor(this.prescriptionId);
            this.getLaboratorysOutPrescription();
            this.showButtonActions(id, false)
          },
          error: (err) => {
            Swal.fire({
              title: err.error.message,
              icon: 'error',
              position: 'center',
              timer: 3000
            });
            this.getLaboratories();
            this.getPrescriptionDoctor(this.prescriptionId);
            this.getLaboratorysOutPrescription();
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Laboratorio No Eliminado', '', 'info')
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
