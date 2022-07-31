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

  hotel:any;

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
        this.updateUser = res.doctor
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
              title: 'Imagen Agregada Exitosamente',
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

}
