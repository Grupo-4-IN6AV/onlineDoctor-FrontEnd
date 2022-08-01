import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentRestService } from 'src/app/services/appointmentRest/appointment-rest.service';
import { LaboratoryRestService } from 'src/app/services/laboratoryRest/laboratory-rest.service';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';

@Component({
  selector: 'app-diary-doctor',
  templateUrl: './diary-doctor.component.html',
  styleUrls: ['./diary-doctor.component.css']
})
export class DiaryDoctorComponent implements OnInit {

  actualDate: any;

  //Opciones de Calendarios
  calendarOptions: CalendarOptions = { initialView: 'dayGridMonth', events: [] };
  showCalendarAppointments: any;
  showCalendarLaboratories:any;

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private appointmentRest: AppointmentRestService,
    private laboratoriesRest: LaboratoryRestService,
  ) {
  }

  ngOnInit(): void {
    this.actualDate = new Date();
    this.getAppointments();
  }

  async getAppointments () {
    this.appointmentRest.getAppointmentsUser().subscribe({
      next: (res: any) => {
        var calendarArray = [];

        for (let appointment of res.appointmentsExist) {
          var appointmentID = appointment._id;
          var nameAppointment = 'Cita ' + '  |  ' + appointment.pacient.name;
          var actualDate = appointment.date.split('T');
          calendarArray.push({
            title: nameAppointment,
            description: appointmentID,
            date: actualDate[0],
            className: "fc-event-primary"
          })
        }

        this.laboratoriesRest.getLaboratoriesUser().subscribe({
          next: (res: any) => {
            for (let laboratory of res.laboratories) {
              var laboratoryID = laboratory._id;
              var nameLaboratory = 'Lab.' + laboratory.typeLaboratory.name + ' |  ' + laboratory.pacient.name;
              var actualDate2 = laboratory.date.split('T');
              calendarArray.push({
                title: nameLaboratory,
                description: laboratoryID,
                date: actualDate2[0],
                className: "fc-event-warning"
              })
            }
            this.calendarOptions.events = calendarArray;
          }
        })
      },
      error: (err) => console.log(err)
    })
  }
}
