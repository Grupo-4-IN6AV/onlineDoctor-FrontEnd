import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentAdminComponent } from 'src/app/components/admin/appointment-admin/appointment-admin.component';
import { AppointmentRestService } from 'src/app/services/appointmentRest/appointment-rest.service';

@Pipe({
  name: 'searchAppointmentTable'
})
export class SearchAppointmentTablePipe implements PipeTransform {

  appointments: any;

  constructor
  (
    private appointmentRest: AppointmentRestService,
    private appointmentComponent: AppointmentAdminComponent,
  ){ }

  transform(appointments:any, search:any){
    if(search == undefined){
      return appointments;
    }else{
      return appointments.filter( (appointment:any) =>
      {
        let params = {name:search}
        this.appointmentRest.getAppointmentName(params).subscribe({
          next: (res: any) =>
          {
            this.appointments = res.appointments;
            if(this.appointments.length === 0)
            {
              this.appointmentComponent.notFound = true;
            }
            else if(this.appointments.length !== 0)
            {
              this.appointmentComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return appointment.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }
}
