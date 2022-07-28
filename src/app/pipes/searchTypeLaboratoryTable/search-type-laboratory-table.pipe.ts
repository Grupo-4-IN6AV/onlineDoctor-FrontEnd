import { Pipe, PipeTransform } from '@angular/core';
import { TypeLaboratoryAdminComponent } from 'src/app/components/admin/type-laboratory-admin/type-laboratory-admin.component';
import { TypeLaboratoryRestService } from 'src/app/services/typeLaboratoryRest/type-laboratory-rest.service';

@Pipe({
  name: 'searchTypeLaboratoryTable'
})
export class SearchTypeLaboratoryTablePipe implements PipeTransform {

  typeLaboratories: any;

  constructor
  (
    private typeLaboratoryRest: TypeLaboratoryRestService,
    private typeLaboratoryComponent: TypeLaboratoryAdminComponent,
  ){ }

  transform(typeLaboratories:any, search:any){
    if(search == undefined){
      return typeLaboratories;
    }else{
      return typeLaboratories.filter( (typeLaboratory:any) =>
      {
        let params = {name:search}
        this.typeLaboratoryRest.getTypeLaboratoryName(params).subscribe({
          next: (res: any) =>
          {
            this.typeLaboratories = res.typeLaboratories;
            if(this.typeLaboratories.length === 0)
            {
              this.typeLaboratoryComponent.notFound = true;
            }
            else if(this.typeLaboratories.length !== 0)
            {
              this.typeLaboratoryComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return typeLaboratory.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}