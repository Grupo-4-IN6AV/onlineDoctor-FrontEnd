import { Component, OnInit } from '@angular/core';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css']
})
export class ProfileDoctorComponent implements OnInit {


  constructor
  (
    private doctorRest: DoctorRestService,
    private credentialRest: CredentialsRestService,
    public router: Router
  )
  {
  }

  //Usuario Logueado//
  doctor:any;
  updateUser:any;
  filesToUpload: any;
  //Mostrar Fotografía//
  doctorImage: any
  uri: any
  reloadImage: any
  //Password
  password:any;
  newPassword:any;
  reset:any;

  userDelete: any;
  userDeleteModal: any;
  userDeletePassword: any;

  ngOnInit(): void
  {
    this.userLogin();
  }

  cleanForm()
  {
    this.password = this.reset;
    this.newPassword = this.reset;
  }

  userLogin()
  {
    this.doctorRest.getDoctor(this.credentialRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.doctor = res.doctor;
        this.updateUser = res.doctor;
        this.userDelete = res.doctor;
        this.userDeleteModal = res.doctor;
        this.doctorImage = this.doctor.image;
        this.uri = environment.baseURI + 'doctor/getImageDoctor/' + this.doctorImage;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  //UPLOAD IMAGE//
  filesChange(inputFile: any)
  {
    this.filesToUpload = <Array<File>>inputFile.target.files;
  }

  uploadImage()
  {
    this.doctorRest.requestFiles(this.credentialRest.getIdentity()._id, this.filesToUpload, 'image')
      .then((res: any) => {
        let resClear = JSON.parse(res);
        if (!res.error)
        {
          localStorage.setItem('identity',JSON.stringify(resClear))
          this.userLogin();
          Swal.fire
            ({
              icon: 'success',
              title: 'Imagen agregada Exitosamente',
              confirmButtonColor: '#28B463'
            });
        }
        else
        {
          console.log(res)
        }
      })
      .catch(error =>
        {
          Swal.fire({
            icon: 'error',
            title: error,
            confirmButtonColor: '#E74C3C'
          });
        })
    }

    updateAccount()
    {
      this.doctor.password = undefined;
      this.doctor.role = undefined;
      this.doctorRest.updateDoctorProfile(this.updateUser._id, this.updateUser).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          this.userLogin();
          localStorage.setItem('identity',JSON.stringify(res.doctorUpdate))
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


  deleteAccount(id: string, password:string)
  {
    Swal.fire({
      title: 'Do you want to delete your Account?',
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
        this.doctorRest.deleteDoctorProfile(id,params).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            localStorage.clear()
            this.router.navigate(['/']);
            this.userDeletePassword = '';
          },
          error: (err) => Swal.fire({
            title: err.error.message || err.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.userDeletePassword = "";
      } else if (result.isDenied)
      {
        Swal.fire('Account Not Deleted','', 'info')
        this.userDeletePassword = "";
      }
    })
    this.userDeletePassword = "";
  }

  showPassword(){
    this.userDeletePassword = "";
  }


}
