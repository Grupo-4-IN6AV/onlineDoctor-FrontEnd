import { Pipe, PipeTransform } from '@angular/core';
import { TypeMedicamentAdminComponent } from 'src/app/components/admin/type-medicament-admin/type-medicament-admin.component';
import { TypeMedicamentRestService } from 'src/app/services/typeMedicamentRest/type-medicament-rest.service';

@Pipe({
  name: 'searchTypetypeMedicamentTable'
})
export class SearchTypeMedicamentTablePipe implements PipeTransform {

  typeMedicaments: any;

  constructor
  (
    private typeMedicamentRest: TypeMedicamentRestService,
    private typeMedicamentComponent: TypeMedicamentAdminComponent,
  ){ }

  transform(typeMedicaments:any, search:any){
    if(search == undefined){
      return typeMedicaments;
    }else{
      return typeMedicaments.filter( (typeMedicament:any) =>
      {
        let params = {name:search}
        this.typeMedicamentRest.getTypeMedicamentName(params).subscribe({
          next: (res: any) =>
          {
            this.typeMedicaments = res.typeMedicaments;
            if(this.typeMedicaments.length === 0)
            {
              this.typeMedicamentComponent.notFound = true;
            }
            else if(this.typeMedicaments.length !== 0)
            {
              this.typeMedicamentComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return typeMedicament.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
