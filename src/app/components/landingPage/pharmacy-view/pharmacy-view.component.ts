import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-pharmacy-view',
  templateUrl: './pharmacy-view.component.html',
  styleUrls: ['./pharmacy-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PharmacyViewComponent implements OnInit {
  thumbsSwiper: any
  constructor(

  ) {

   }

  ngOnInit(): void {
  
  }

}
