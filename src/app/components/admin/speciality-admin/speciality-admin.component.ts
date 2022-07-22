import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialityRestService } from 'src/app/services/specialityRest/speciality-rest.service'
import { SpecialityModel } from 'src/app/models/speciality.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speciality-admin',
  templateUrl: './speciality-admin.component.html',
  styleUrls: ['./speciality-admin.component.css']
})
export class SpecialityAdminComponent implements OnInit {

  specialities: any;
  speciality: SpecialityModel;
  searchSpeciality: any
  specialityView: any;
  specialityUpdate: any;
  specialityDelete: any;
  showTableSpeciality: boolean = false;
  reset: any;
  notFound: boolean = false;
  buttonActions: boolean = false;
  checked: boolean = true;
  specialityCheck : any;
  controloClick : number = 0
  
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private specialityRest: SpecialityRestService,
  ) { 
    this.speciality = new SpecialityModel('', '', '', true);
  }
  
  ngOnInit(): void {
    this.getSpecialities();
  }
  
  getSpecialities() {
    this.specialityRest.getSpecialities().subscribe({
      next: (res: any) => this.specialities = res.specialities,
      error: (err) => console.log(err)
    })
  }
  
  saveSpeciality(addSpecialityForm: any) {
    console.log(this.speciality)
    this.specialityRest.saveSpeciality(this.speciality).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getSpecialities();
          addSpecialityForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addSpecialityForm.reset();
        },
      })
      addSpecialityForm.reset();
  }
  
  getSpeciality(id: string) {
    this.specialityRest.getSpeciality(id).subscribe({
      next: (res: any) => {
        this.specialityView = res.speciality;
        this.specialityUpdate = res.speciality;
        this.specialityDelete = res.speciality
      },
      error: (err) => { alert(err.error.message) }
    })
  }
  
    updateSpeciality() {
      this.specialityRest.updateSpeciality(this.specialityUpdate._id, this.specialityUpdate).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          this.getSpecialities();
          this.showButtonActions(this.specialityUpdate._id,false)
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
  
    deleteSpeciality(id: string) {
      Swal.fire({
        title: 'Do you want to delete this Speciality?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.specialityRest.deleteSpeciality(id).subscribe({
            next: (res: any) => {
              Swal.fire({
                title: res.message,
                icon: 'success',
                position: 'center',
                showConfirmButton: false,
                timer: 2000
              });
              this.getSpecialities();
              this.showButtonActions(id,false)
            },
            error: (err) => Swal.fire({
              title: err.error.message,
              icon: 'error',
              position: 'center',
              timer: 3000
            })
          })
          this.getSpecialities();
        } else if (result.isDenied) {
          Swal.fire('Speciality Not Deleted', '', 'info')
        }
      })
    }
  
    showTable()
    {
      this.showTableSpeciality =! this.showTableSpeciality;
      for(let speciality of this.specialities)
      {
        speciality.checked = true
      }
    }
  
    cleanTable() {
      this.getSpecialities();
      this.searchSpeciality = this.reset;
    }
  
    showButtonActions(specialityID:any, check:any)
    {
      this.controloClick += 1
      let controlCheck =! check.checked
      if(this.controloClick == 1)
      {
        for(let speciality of this.specialities)
        {
          if(specialityID != speciality._id)
          {
            speciality.checked =! controlCheck
          }
          else if(specialityID == speciality._id)
          {
            speciality.checked = controlCheck
          }
        }
      }
      else if(this.controloClick == 2)
      {
        for(let speciality of this.specialities)
        {
          speciality.checked = true;
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
