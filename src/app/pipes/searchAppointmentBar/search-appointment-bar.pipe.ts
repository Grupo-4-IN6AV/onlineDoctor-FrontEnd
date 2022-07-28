import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAppointmentBar'
})
export class SearchAppointmentBarPipe implements PipeTransform {

  transform(appointments:any, search:any){
    if(search == undefined){
      return appointments;
    }else{
      return appointments.filter( (appointment:any) =>
      {
        return appointment.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
