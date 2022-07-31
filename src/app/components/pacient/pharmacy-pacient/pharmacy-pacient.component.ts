import { Component, OnInit } from '@angular/core';
import { MedicamentRestService } from 'src/app/services/medicamentRest/medicament-rest.service';
import {ScriptsPharmacyService} from '../../../services/cargarScripts/scripts-pharmacy.service';
import {ScriptsPharmasyGlobalService} from '../../../services/cargarScripts/scripts-pharmasy-global.service'
import Swal from 'sweetalert2';
import { ShoppingCartRestService } from 'src/app/services/shoppingCartRest/shopping-cart-rest.service';
import { ShoppingCartModel } from 'src/app/models/shoppingCart.model';

@Component({
  selector: 'app-pharmacy-pacient',
  templateUrl: './pharmacy-pacient.component.html',
  styleUrls: ['./pharmacy-pacient.component.css']
})
export class PharmacyPacientComponent implements OnInit {

  product: any;

  medicaments: any;

  medicamentView: any;
  searchMedicament: any;

  notFound: boolean = false;

  constructor(
    private _ScriptsPharmacyGlobal: ScriptsPharmasyGlobalService,
    private _ScriptsPharmacy: ScriptsPharmacyService,
    private pharmacyRest: MedicamentRestService,
    private shoppingCartRest: ShoppingCartRestService,
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

  getMedicament(id: string) {
    this.pharmacyRest.getMedicament(id).subscribe({
      next: (res: any) => {
        this.medicamentView = res.medicament;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

  addToCart() {
    let params =
    {
      products: this.medicamentView._id,
      quantity: 1
    }
    this.shoppingCartRest.createShoppingCart(params).subscribe({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });

        // this.product = res.medicaments
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      }
    })
  }

}
