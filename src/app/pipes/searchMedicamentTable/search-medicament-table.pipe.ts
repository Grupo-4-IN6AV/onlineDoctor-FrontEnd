import { Pipe, PipeTransform } from '@angular/core';
import {MedicamentRestService} from '../../services/medicamentRest/medicament-rest.service'
import {MedicamentAdminComponent} from '../../components/admin/medicament-admin/medicament-admin.component'

@Pipe({
  name: 'searchMedicamentTable'
})
export class SearchMedicamentTablePipe implements PipeTransform {

  medicaments: any;

  constructor
  (
    private medicamentRest: MedicamentRestService,
    private medicamentComponent: MedicamentAdminComponent,
  ){ }

  transform(medicaments:any, search:any){
    if(search == undefined){
      return medicaments;
    }else{
      return medicaments.filter( (medicament:any) =>
      {
        let params = {name:search}
        this.medicamentRest.getMedicamentName(params).subscribe({
          next: (res: any) =>
          {
            this.medicaments = res.medicaments;
            if(this.medicaments.length === 0)
            {
              this.medicamentComponent.notFound = true;
            }
            else if(this.medicaments.length !== 0)
            {
              this.medicamentComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return medicament.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
