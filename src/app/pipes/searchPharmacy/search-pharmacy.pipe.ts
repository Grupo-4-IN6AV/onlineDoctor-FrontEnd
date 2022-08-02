import { Pipe, PipeTransform } from '@angular/core';
import {MedicamentRestService} from '../../services/medicamentRest/medicament-rest.service'
import { PharmacyPacientComponent } from '../../components/pacient/pharmacy-pacient/pharmacy-pacient.component';

@Pipe({
  name: 'searchPharmacy'
})
export class SearchPharmacyPipe implements PipeTransform {

  medicaments: any;

  constructor
  (
    private medicamentRest: MedicamentRestService,
    private pharmacyComponent: PharmacyPacientComponent,
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
              this.pharmacyComponent.notFound = true;
            }
            else if(this.medicaments.length !== 0)
            {
              this.pharmacyComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return medicament.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
