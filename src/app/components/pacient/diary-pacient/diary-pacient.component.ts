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
  selector: 'app-diary-pacient',
  templateUrl: './diary-pacient.component.html',
  styleUrls: ['./diary-pacient.component.css']
})
export class DiaryPacientComponent implements OnInit {

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
    this.appointmentRest.getAppointmentsPaciente().subscribe({
      next: (res: any) => {
        var calendarArray = [];
        
        for (let appointment of res.appointmentsExist) {
          var appointmentID = appointment._id;
          var nameAppointment = 'Apointment ' + '  |  ' + appointment.pacient.name;
          var actualDate = appointment.date.split('T');
          calendarArray.push({
            title: nameAppointment,
            description: appointmentID,
            date: actualDate[0],
            className: "fc-event-primary"
          })
        }

        this.laboratoriesRest.getLaboratoriesPacient().subscribe({
          next: (res: any) => {
            for (let laboratory of res.laboratoryExist) {
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
