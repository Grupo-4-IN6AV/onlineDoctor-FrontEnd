import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionRestService } from 'src/app/services/prescriptionRest/prescription-rest.service';
import { PrescriptionModel } from 'src/app/models/prescription.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-prescription-pacient',
  templateUrl: './prescription-pacient.component.html',
  styleUrls: ['./prescription-pacient.component.css']
})
export class PrescriptionPacientComponent implements OnInit {

  prescriptions: any;
  prescriptionView: any;
  laboratories: any;
  medicaments: any;


  constructor(
    public dialog: MatDialog,
    private prescriptionRest: PrescriptionRestService,
  )
  {
  }

  ngOnInit(): void
  {
    this.getPrescriptionUser();
  }

  getPrescriptionUser()
  {
    this.prescriptionRest.getPrescriptionsUser().subscribe({
      next: (res: any) => {
        this.prescriptions = res.prescriptions;
      },
      error: (err) =>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

  getPrescription(id:string)
  {
    this.prescriptionRest.getPrescription(id).subscribe({
      next: (res: any) => {
        this.prescriptionView = res.prescription;
        this.laboratories = res.laboratories
        this.medicaments = res.medicaments
      },
      error: (err) =>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

  getPrescriptionPDF(id:string)
  {
    this.prescriptionRest.createPrescriptionPDF(id).subscribe({
      next: (res: any) =>
      {
        window.open("http://localhost:3000/Receta/" + id);
      },
      error: (err) =>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

}
