import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDoctorBar'
})
export class SearchDoctorBarPipe implements PipeTransform {

  transform(doctors:any, search:any){
    if(search == undefined){
      return doctors;
    }else{
      return doctors.filter( (doctor:any) =>
      {
        return doctor.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
