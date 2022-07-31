import { Pipe, PipeTransform } from '@angular/core';
import { LaboratoryAdminComponent } from 'src/app/components/admin/laboratory-admin/laboratory-admin.component';
import { TypeLaboratoryRestService } from 'src/app/services/typeLaboratoryRest/type-laboratory-rest.service';

@Pipe({
  name: 'searchLaboratoryName'
})
export class SearchLaboratoryNamePipe implements PipeTransform {
  typeLaboratories: any;

  constructor
  (
    private typeLaboratoryRest: TypeLaboratoryRestService,
    private laboratoryComponent: LaboratoryAdminComponent,
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
