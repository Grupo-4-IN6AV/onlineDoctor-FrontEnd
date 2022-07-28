import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';
import { MedicamentRestService } from 'src/app/services/medicamentRest/medicament-rest.service';
import { PharmacyViewComponent } from '../pharmacy-view/pharmacy-view.component';
import { ScriptsPharmacyService } from 'src/app/services/cargarScripts/scripts-pharmacy.service';


SwiperCore.use([Pagination, Navigation, Virtual]);
@Component({
  selector: 'app-pharmacy-view-all',
  templateUrl: './pharmacy-view-all.component.html',
  styleUrls: ['./pharmacy-view-all.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PharmacyViewAllComponent implements OnInit {
  medicaments: any;
  @ViewChild('swiperRef', { static: false }) swiper?: SwiperComponent;

  constructor(
    private pharmacyRest: MedicamentRestService,
  ){}


  ngOnInit(): void {
    this.getMedicaments();
  }
  
  getMedicaments() {
    this.pharmacyRest.getMedicaments().subscribe({
      next: (res: any) => {this.medicaments = res.medicaments,
      console.log(this.medicaments)
      },
      error: (err) => console.log(err)
    })
  }

}
