import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeMedicamentRestService } from 'src/app/services/typeMedicamentRest/type-medicament-rest.service';
import { TypeMedicamentModel } from 'src/app/models/typeMedicament';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-medicament-admin',
  templateUrl: './type-medicament-admin.component.html',
  styleUrls: ['./type-medicament-admin.component.css']
})
export class TypeMedicamentAdminComponent implements OnInit {

  typeMedicaments: any;
  typeMedicament: TypeMedicamentModel;
  searchTypeMedicament: any
  typeMedicamentView: any;
  typeMedicamentUpdate: any;
  typeMedicamentDelete: any;
  showTableTypeMedicament: boolean = false;

  typeMedicamentNameUp: any;
  typeMedicamentNameDown: any;
  reset: any;

  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  typeMedicamentCheck : any;
  controloClick : number = 0
  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private typeMedicamentRest: TypeMedicamentRestService,
  ) { 
    this.typeMedicament = new TypeMedicamentModel('', '', '', true);
  }

  ngOnInit(): void {
    this.getTypeMedicaments();
  }

  getTypeMedicaments() {
    this.typeMedicamentRest.getTypeMedicaments().subscribe({
      next: (res: any) => this.typeMedicaments = res.typeMedicaments,
      error: (err) => console.log(err)
    })
  }

  saveTypeMedicament(addTypeMedicamentForm: any) {
    this.typeMedicamentRest.saveTypeMedicament(this.typeMedicament).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getTypeMedicaments();
          addTypeMedicamentForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addTypeMedicamentForm.reset();
        },
      })
      addTypeMedicamentForm.reset();
  }

  getTypeMedicament(id: string) {
    this.typeMedicamentRest.getTypeMedicament(id).subscribe({
      next: (res: any) => {
        this.typeMedicamentView = res.typeMedicament;
        this.typeMedicamentUpdate = res.typeMedicament;
        this.typeMedicamentDelete = res.typeMedicament
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  updateTypeMedicament() {
    this.typeMedicamentRest.updateTypeMedicament(this.typeMedicamentUpdate._id, this.typeMedicamentUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getTypeMedicaments();
        this.showButtonActions(this.typeMedicamentUpdate._id,false)
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

  deleteTypeMedicament(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Type Medicament?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeMedicamentRest.deleteTypeMedicament(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTypeMedicaments();
            this.showButtonActions(id,false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getTypeMedicaments();
      } else if (result.isDenied) {
        Swal.fire('Type Medicament Not Deleted', '', 'info')
      }
    })
  }

  showTable()
  {
    this.showTableTypeMedicament =! this.showTableTypeMedicament;
    for(let typeMedicament of this.typeMedicaments)
    {
      typeMedicament.checked = true
    }
  }

  getByUp() {
    this.typeMedicamentRest.getTypeMedicamentsByUp().subscribe({
      next: (res: any) => {
        this.typeMedicamentNameDown = this.reset;
        this.typeMedicamentNameUp = res.TypeMedicamentAtoZ
        this.typeMedicaments = res.TypeMedicamentAtoZ
      },
      error: (err) => console.log(err)
    })
  }

  getByDown() {
    this.typeMedicamentRest.getTypeMedicamentsByDown().subscribe({
      next: (res: any) => {
        this.typeMedicamentNameUp = this.reset;
        this.typeMedicamentNameDown = res.TypeMedicamentZtoA;
        this.typeMedicaments = res.TypeMedicamentZtoA
      },
      error: (err) => console.log(err)
    })
  }

  cleanTable() {
    this.typeMedicamentNameUp = this.reset
    this.typeMedicamentNameDown = this.reset
    this.getTypeMedicaments();
    this.searchTypeMedicament = this.reset;
  }

  showButtonActions(typeMedicamentID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let typeMedicament of this.typeMedicaments)
      {
        if(typeMedicamentID != typeMedicament._id)
        {
          typeMedicament.checked =! controlCheck
        }
        else if(typeMedicamentID == typeMedicament._id)
        {
          typeMedicament.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let typeMedicament of this.typeMedicaments)
      {
        typeMedicament.checked = true;
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
