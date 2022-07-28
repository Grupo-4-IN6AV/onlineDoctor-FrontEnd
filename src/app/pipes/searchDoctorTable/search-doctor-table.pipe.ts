import { Pipe, PipeTransform } from '@angular/core';
import { DoctorAdminComponent } from 'src/app/components/admin/doctor-admin/doctor-admin.component';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';

@Pipe({
  name: 'searchDoctorTable'
})
export class SearchDoctorTablePipe implements PipeTransform {

  doctors: any;

  constructor
  (
    private doctorRest: DoctorRestService,
    private doctorComponent: DoctorAdminComponent,
  ){ }

  transform(doctors:any, search:any){
    if(search == undefined){
      return doctors;
    }else{
      return doctors.filter( (doctor:any) =>
      {
        let params = {name:search}
        this.doctorRest.getDoctorName(params).subscribe({
          next: (res: any) =>
          {
            this.doctors = res.doctors;
            if(this.doctors.length === 0)
            {
              this.doctorComponent.notFound = true;
            }
            else if(this.doctors.length !== 0)
            {
              this.doctorComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return doctor.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
