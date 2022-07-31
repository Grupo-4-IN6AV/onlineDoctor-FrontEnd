import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-pacient',
  templateUrl: './profile-pacient.component.html',
  styleUrls: ['./profile-pacient.component.css']
})
export class ProfilePacientComponent implements OnInit {

  constructor
  (
    private userRest: UserRestService,
    private credentialRest: CredentialsRestService,
    public router: Router
  )
  {
  }

  //Usuario Logueado//
  user:any;
  updateUser:any;
  filesToUpload: any;
  //Mostrar Fotografía//
  userImage: any
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
    this.userRest.getUser(this.credentialRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.updateUser = res.user
        this.userImage = this.user.image;
        this.uri = environment.baseURI + 'user/getImageUser/' + this.userImage;
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
    this.userRest.requestFiles(this.credentialRest.getIdentity()._id, this.filesToUpload, 'image')
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
