import { Pipe, PipeTransform } from '@angular/core';
import { TypeLaboratoryRestService } from '../../../../src/app/services/typeLaboratoryRest/type-laboratory-rest.service';
import { LaboratoryPacientComponent } from '../../components/pacient/laboratory-pacient/laboratory-pacient.component';

@Pipe({
  name: 'searchLaboratoryTabla'
})
export class SearchLaboratoryTablaPipe implements PipeTransform {
  typeLaboratories: any;

  constructor
  (
    private typeLaboratoryRest: TypeLaboratoryRestService,
    private laboratoryComponent: LaboratoryPacientComponent,
  ){ }

  transform(laboratories:any, search:any){
    if(search == undefined){
      return laboratories;
    }else{
      return laboratories.filter( (laboratory:any) =>
      {
        let params = {name:search}
        this.typeLaboratoryRest.getTypeLaboratoryName(params).subscribe({
          next: (res: any) =>
          {
            this.typeLaboratories = res.typeLaboratories;
            if(this.typeLaboratories.length === 0)
            {
              this.laboratoryComponent.notFound = true;
            }
            else if(this.typeLaboratories.length !== 0)
            {
              this.laboratoryComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return laboratory.typeLaboratory.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
