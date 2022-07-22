import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeLaboratoryRestService } from 'src/app/services/typeLaboratoryRest/type-laboratory-rest.service'
import { TypeLaboratoryModel } from 'src/app/models/typeLaboratory.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-laboratory-admin',
  templateUrl: './type-laboratory-admin.component.html',
  styleUrls: ['./type-laboratory-admin.component.css']
})
export class TypeLaboratoryAdminComponent implements OnInit {

  typesLaboratory: any;
  typeLaboratory: TypeLaboratoryModel;
  searchTypeLaboratory: any
  typeLaboratoryView: any;
  typeLaboratoryUpdate: any;
  typeLaboratoryDelete: any;
  showTableTypeLaboratory: boolean = false;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  typeLaboratoryCheck : any;
  controloClick : number = 0

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private typeLaboratoryRest: TypeLaboratoryRestService,
  ) { 
    this.typeLaboratory = new TypeLaboratoryModel('', '', '', true);
  }

  ngOnInit(): void {
    this.getTypesLaboratory();
  }

  getTypesLaboratory() {
    this.typeLaboratoryRest.getTypesLaboratory().subscribe({
      next: (res: any) => this.typesLaboratory = res.typesLaboratory,
      error: (err) => console.log(err)
    })
  }

  saveTypeLaboratory(addTypeLaboratoryForm: any) {
    console.log(this.typeLaboratory)
    this.typeLaboratoryRest.saveTypeLaboratory(this.typeLaboratory).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getTypesLaboratory();
          addTypeLaboratoryForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addTypeLaboratoryForm.reset();
        },
      })
      addTypeLaboratoryForm.reset();
  }

  getTypeLaboratory(id: string) {
    this.typeLaboratoryRest.getTypeLaboratory(id).subscribe({
      next: (res: any) => {
        this.typeLaboratoryView = res.typeLaboratoryExist;
        this.typeLaboratoryUpdate = res.typeLaboratoryExist;
        this.typeLaboratoryDelete = res.typeLaboratoryExist
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  updateTypeLaboratory() {
    this.typeLaboratoryRest.updateTypeLaboratory(this.typeLaboratoryUpdate._id, this.typeLaboratoryUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getTypesLaboratory();
        this.showButtonActions(this.typeLaboratoryUpdate._id,false)
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

  deleteTypeLaboratory(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Type Laboratory?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeLaboratoryRest.deleteTypeLaboratory(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTypesLaboratory();
            this.showButtonActions(id,false)
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getTypesLaboratory();
      } else if (result.isDenied) {
        Swal.fire('Type Laboratory Not Deleted', '', 'info')
      }
    })
  }

  showTable()
  {
    this.showTableTypeLaboratory =! this.showTableTypeLaboratory;
    for(let typeLaboratory of this.typesLaboratory)
    {
      typeLaboratory.checked = true
    }
  }

  cleanTable() {
    this.getTypesLaboratory();
    this.searchTypeLaboratory = this.reset;
  }

  showButtonActions(typeLaboratoryID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let typeLaboratory of this.typesLaboratory)
      {
        if(typeLaboratoryID != typeLaboratory._id)
        {
          typeLaboratory.checked =! controlCheck
        }
        else if(typeLaboratoryID == typeLaboratory._id)
        {
          typeLaboratory.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let typeLaboratory of this.typesLaboratory)
      {
        typeLaboratory.checked = true;
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
