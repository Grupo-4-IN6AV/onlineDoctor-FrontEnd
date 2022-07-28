import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMedicamentBar'
})
export class SearchMedicamentBarPipe implements PipeTransform {

  transform(medicaments:any, search:any){
    if(search == undefined){
      return medicaments;
    }else{
      return medicaments.filter( (medicament:any) =>
      {
        return medicament.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
