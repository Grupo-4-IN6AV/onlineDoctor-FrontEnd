import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTypeLaboratoryBar'
})
export class SearchTypeLaboratoryBarPipe implements PipeTransform {

  transform(typeLaboratories:any, search:any){
    if(search == undefined){
      return typeLaboratories;
    }else{
      return typeLaboratories.filter( (typeLaboratory:any) =>
      {
        return typeLaboratory.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
