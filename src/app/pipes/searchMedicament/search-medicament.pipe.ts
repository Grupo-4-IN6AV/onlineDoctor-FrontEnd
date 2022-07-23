import { Pipe, PipeTransform } from '@angular/core';
import { PharmacyComponent } from 'src/app/components/landingPage/pharmacy/pharmacy.component';
import { MedicamentRestService } from 'src/app/services/medicamentRest/medicament-rest.service';

@Pipe({
  name: 'searchMedicament'
})
export class SearchMedicamentPipe implements PipeTransform {

  medicaments: any;

  constructor
  (
    private medicamentRest: MedicamentRestService,
    private landingComponent: PharmacyComponent,
  ){ }

  transform(medicaments:any, search:any){
    if(search == undefined){
      return medicaments;
    }else{
      return medicaments.filter( (medicament:any) =>
      {
        let params = {name: search}
        this.medicamentRest.getMedicamentName(params).subscribe({
          next: (res: any) =>
          {
            this.medicaments = res.medicaments;
            if(this.medicaments.length === 0)
            {
              this.landingComponent.notFound = true;
            }
            else if(this.medicaments.length !== 0)
            {
              this.landingComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return medicament.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
