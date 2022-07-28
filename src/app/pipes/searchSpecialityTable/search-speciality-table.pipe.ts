import { Pipe, PipeTransform } from '@angular/core';
import { SpecialityAdminComponent } from 'src/app/components/admin/speciality-admin/speciality-admin.component';
import { SpecialityRestService } from 'src/app/services/specialityRest/speciality-rest.service';

@Pipe({
  name: 'searchSpecialityTable'
})
export class SearchSpecialityTablePipe implements PipeTransform {

  specialities: any;

  constructor
  (
    private specialityRest: SpecialityRestService,
    private specialityComponent: SpecialityAdminComponent,
  ){ }

  transform(specialities:any, search:any){
    if(search == undefined){
      return specialities;
    }else{
      return specialities.filter( (speciality:any) =>
      {
        let params = {name:search}
        this.specialityRest.getSpecialityName(params).subscribe({
          next: (res: any) =>
          {
            this.specialities = res.specialities;
            if(this.specialities.length === 0)
            {
              this.specialityComponent.notFound = true;
            }
            else if(this.specialities.length !== 0)
            {
              this.specialityComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return speciality.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}

