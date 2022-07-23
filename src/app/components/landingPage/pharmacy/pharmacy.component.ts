import { Component, OnInit } from '@angular/core';
import { MedicamentRestService } from 'src/app/services/medicamentRest/medicament-rest.service';
import {ScriptsPharmacyService} from '../../../services/cargarScripts/scripts-pharmacy.service';
import {ScriptsPharmasyGlobalService} from '../../../services/cargarScripts/scripts-pharmasy-global.service'

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  medicaments: any;

  medicamentsNameUp: boolean = false;
  medicamentsNameDown: boolean = false;
  searchMedicament: any;

  notFound: boolean = false;

  //tipos de vistas//
  viewGrid: boolean = false;
  viewList: boolean = true;
  viewBlock: boolean = false;
  constructor(
    private _ScriptsPharmacyGlobal: ScriptsPharmasyGlobalService,
    private _ScriptsPharmacy: ScriptsPharmacyService,
    private pharmacyRest: MedicamentRestService,
  ) {
    _ScriptsPharmacyGlobal.Carga(["gulpfile"]);
    _ScriptsPharmacy.Carga(["jquery-2.2.4.min"]);
    _ScriptsPharmacy.Carga(["plugins.bundle"]);
    _ScriptsPharmacy.Carga(["theme"]);
  }

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
