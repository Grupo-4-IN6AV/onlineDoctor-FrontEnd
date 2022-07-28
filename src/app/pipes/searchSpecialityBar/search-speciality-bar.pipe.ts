import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSpecialityBar'
})
export class SearchSpecialityBarPipe implements PipeTransform {

  transform(specialities:any, search:any){
    if(search == undefined){
      return specialities;
    }else{
      return specialities.filter( (speciality:any) =>
      {
        return speciality.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
