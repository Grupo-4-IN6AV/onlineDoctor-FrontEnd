import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTypeMedicamentBar'
})
export class SearchTypeMedicamentBarPipe implements PipeTransform {

  transform(typeMedicaments:any, search:any){
    if(search == undefined){
      return typeMedicaments;
    }else{
      return typeMedicaments.filter( (typeMedicament:any) =>
      {
        return typeMedicament.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
