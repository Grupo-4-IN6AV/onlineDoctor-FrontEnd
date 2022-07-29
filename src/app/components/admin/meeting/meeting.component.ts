import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppointmentModel } from 'src/app/models/appointment.model'
import { AppointmentRestService } from 'src/app/services/appointmentRest/appointment-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CredentialsRestService } from '../../../services/credentialsRest/credentials-rest.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit, AfterViewInit {
  domain: string = "meet.jit.si";
  room: any;
  options: any;
  api: any;
  user: any;
  appointment: any;
  users: any;
  doctors: any;
  idAppointment: any;
  //appointmentGet:any;
  actualUser: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private appointmentRest: AppointmentRestService,
    private credentialRest: CredentialsRestService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(ruta => {
      this.idAppointment = ruta.get('id');
    });

    this.actualUser = this.credentialRest.getIdentity().role;

  }

  getAppoinment() {
    this.appointmentRest.getAppointment(this.idAppointment).subscribe({
      next: (res: any) => { this.appointment = res.appointment },
      error: (err) => console.log(err)
    })
  }

  ngAfterViewInit(): void {
    this.appointmentRest.getAppointment(this.idAppointment).subscribe({
      next: (res: any) => {
        this.appointment = res.appointment 
        let splitDate = this.appointment.date.split('T')
        this.room = 'Dr.' + this.appointment.doctor.name + 'Pacient.' + this.appointment.pacient.name + splitDate[0]
        this.options = {

          roomName: this.room,
          width: 900,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
            // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
            displayName: this.credentialRest.getIdentity().name
          }
        }
    
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    
        this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
        });
   
      },
      error: (err) => console.log(err)
    })
    
  }


  handleClose = () => {
    console.log("handleClose");
  }

  handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    if(this.actualUser === 'DOCTOR'){
      this.router.navigate(['/doctor/appointment']);
    }
    if( this.actualUser === 'PACIENTE'){
      this.router.navigate(['/paciente/appointment']);
    }
    if(this.actualUser === 'ADMIN'){
      this.router.navigate(['/admin/appointment']);
    }
  }

  handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }

  // custom events
  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if (command == 'hangup') {
      this.router.navigate(['/admin/appointment']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }
}
