import { Component, OnInit } from '@angular/core';
import {ScriptsBundleService} from '../../../services/cargarScripts/scripts-bundle.service';
import {ScriptsPharmacyService} from '../../../services/cargarScripts/scripts-pharmacy.service';
import {ScriptsPharmasyGlobalService} from '../../../services/cargarScripts/scripts-pharmasy-global.service'
import { ScriptSwiperService } from 'src/app/services/cargarScripts/script-swiper.service';

@Component({
  selector: 'app-pharmacy-view',
  templateUrl: './pharmacy-view.component.html',
  styleUrls: ['./pharmacy-view.component.css']
})
export class PharmacyViewComponent implements OnInit {

  constructor(
    private _ScriptsSwiper: ScriptSwiperService,
    private _ScriptsBundle: ScriptsBundleService,
    private _ScriptsPharmacyGlobal: ScriptsPharmasyGlobalService,
    private _ScriptsPharmacy: ScriptsPharmacyService,
  ) {
    
    _ScriptsPharmacyGlobal.Carga(["gulpfile"]);
    
    _ScriptsPharmacy.Carga(["jquery-2.2.4.min"]);
    _ScriptsPharmacy.Carga(["plugins.bundle"]);
    _ScriptsPharmacy.Carga(["theme"]);
   }

  ngOnInit(): void {
  }

}
