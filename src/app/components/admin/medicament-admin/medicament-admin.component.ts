import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicamentRestService } from '../../../services/medicamentRest/medicament-rest.service'
import { MedicamentModel } from '../../../models/medicament.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicament-admin',
  templateUrl: './medicament-admin.component.html',
  styleUrls: ['./medicament-admin.component.css']
})
export class MedicamentAdminComponent implements OnInit {

  medicaments: any;
  medicament: MedicamentModel;
  searchMedicament: any;
  medicamentView: any;
  medicamentUpdate: any;
  medicamentDelete: any;
  showTableMedicament: boolean = false;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  controloClick : number = 0

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private medicamentRest: MedicamentRestService,
  ) { 
    this.medicament = new MedicamentModel('', '', '', '', '', true);
  }

  ngOnInit(): void {
    this.getMedicaments();
  }

  getMedicaments() {
    this.medicamentRest.getMedicaments().subscribe({
      next: (res: any) => {this.medicaments = res.medicaments},
      error: (err) => console.log(err)
    })
  }

  saveMedicament(addMedicamentForm: any) {
    this.medicamentRest.saveMedicament(this.medicament).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getMedicaments();
          addMedicamentForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addMedicamentForm.reset();
        },
      })
      addMedicamentForm.reset();
  }

  getMedicament(id: string) {
    this.medicamentRest.getMedicament(id).subscribe({
      next: (res: any) => {
        this.medicamentView = res.medicament;
        this.medicamentUpdate = res.medicament;
        this.medicamentDelete = res.medicament
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  updateMedicament() {
    this.medicamentRest.updateMedicament(this.medicamentUpdate._id, this.medicamentUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getMedicaments();
        this.showButtonActions(this.medicamentUpdate._id,false)
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

  deleteMedicament(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Medicament?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.medicamentRest.deleteMedicament(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getMedicaments();
            this.showButtonActions(id,false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getMedicaments();
      } else if (result.isDenied) {
        Swal.fire('Medicament Not Deleted', '', 'info')
      }
    })
  }

  showTable()
  {
    this.showTableMedicament =! this.showTableMedicament;
    for(let medicament of this.medicaments)
    {
      medicament.checked = true
    }
  }

  cleanTable() {
    this.getMedicaments();
    this.searchMedicament = this.reset;
  }

  showButtonActions(typeLaboratoryID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let medicament of this.medicaments)
      {
        if(typeLaboratoryID != medicament._id)
        {
          medicament.checked =! controlCheck
        }
        else if(typeLaboratoryID == medicament._id)
        {
          medicament.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let medicament of this.medicaments)
      {
        medicament.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
    console.log(this.controloClick)
  }

  closeDialog(): void
  {
    this.dialog.closeAll();
  }

}
