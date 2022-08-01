import { Component, OnInit, DoCheck, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { MedicamentRestService } from "src/app/services/medicamentRest/medicament-rest.service";
import {ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-pharmacy-view',
  templateUrl: './pharmacy-view.component.html',
  styleUrls: ['./pharmacy-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PharmacyViewComponent implements OnInit, DoCheck{
  thumbsSwiper: any
  idMedicament: any;
  medicament: any;
  avality:any;

  constructor
  (
    public activatedRoute : ActivatedRoute,
    private medicamentRest: MedicamentRestService
  ) {

   }

  ngOnInit(): void 
  {
    this.activatedRoute.paramMap.subscribe(ruta => 
      {
        this.idMedicament = ruta.get('id');
      });
      this.getMedicament(this.idMedicament)
  }

  ngDoCheck(): void {
    
  }

  getMedicament(id: string)
  {
    this.medicamentRest.getMedicament(id).subscribe({
      next: (res: any) => 
      {
        this.medicament = res.medicament
        if(this.medicament.availibility === true){
          this.avality = 'En Stock'
        }else{
          this.avality = 'No disponible'
        }
      },
      error: (err) => console.log(err)
    })
  }

  pedirLogin()
  {
    Swal.fire({
      icon: 'info',
      title: 'Atención',
      text: 'Debe iniciar sesión para comprar este medicamento.',
      footer: '<a>¿No tienes una cuenta? <a href="/login"><b>&nbsp;Registrate aquí</b></a></a>'
    })
  }
}
