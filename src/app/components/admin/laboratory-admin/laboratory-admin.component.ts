import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { TypeLaboratoryRestService } from 'src/app/services/typeLaboratoryRest/type-laboratory-rest.service';
import { LaboratoryRestService } from 'src/app/services/laboratoryRest/laboratory-rest.service';
import { LaboratoryModel } from 'src/app/models/laboratory.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratory-admin',
  templateUrl: './laboratory-admin.component.html',
  styleUrls: ['./laboratory-admin.component.css']
})
export class LaboratoryAdminComponent implements OnInit {

  laboratories: any;
  laboratory: LaboratoryModel;
  searchLaboratory: any;
  laboratoryView: any;
  laboratoryUpdate: any;
  laboratoryDelete: any;
  showTableLaboratory: boolean = false;
  reset: any;
  users:any;
  typesLaboratory:any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick: number = 0;
  newDate: any;
  OnlyOneDate: any;
  actualDate: any;
  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private laboratoryRest: LaboratoryRestService,
    private userRest: UserRestService,
    private typeLaboratoryRest: TypeLaboratoryRestService,
  ) { 
    this.laboratory = new LaboratoryModel('','','', '', '', true)
  }

  ngOnInit(): void {
    this.actualDate = new Date()
    this.getLaboratories();
  }

  getLaboratories() {
    this.laboratoryRest.getLaboratories().subscribe({
      next: (res: any) => {
        this.laboratories = res.laboratories;
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

  getUsers() {
    this.userRest.getUsers().subscribe({
      next: (res: any) => this.users = res.users,
      error: (err) => console.log(err)
    })
  }

  getTypesLaboratory() {
    this.typeLaboratoryRest.getTypesLaboratory().subscribe({
      next: (res: any) => this.typesLaboratory = res.typesLaboratory,
      error: (err) => console.log(err)
    })
  }

  saveLaboratory(addLaboratoryForm: any) {
    this.laboratoryRest.saveLaboratory(this.laboratory).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getLaboratories();
          addLaboratoryForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addLaboratoryForm.reset();
        },
      })
      addLaboratoryForm.reset();
  }

  getLaboratory(id: string) {
    this.laboratoryRest.getLaboratory(id).subscribe({
      next: (res: any) => {
        this.laboratoryView = res.laboratory;
        this.laboratoryUpdate = res.laboratory;
        this.laboratoryDelete = res.laboratory;
        let split = res.laboratory.date.split('T');
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

  updateLaboratory() {
    this.laboratoryRest.updateLaboratory(this.laboratoryUpdate._id, this.laboratoryUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getLaboratories();
        this.showButtonActions(this.laboratoryUpdate._id, false)
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

  deleteLaboratory(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Laboratory?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.laboratoryRest.deleteLaboratory(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getLaboratories();
            this.showButtonActions(id, false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getLaboratories();
      } else if (result.isDenied) {
        Swal.fire('Laboratory Not Deleted', '', 'info')
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
    this.getLaboratories();
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
