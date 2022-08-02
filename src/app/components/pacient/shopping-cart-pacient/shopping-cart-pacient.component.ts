import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { ShoppingCartRestService } from 'src/app/services/shoppingCartRest/shopping-cart-rest.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shopping-cart-pacient',
  templateUrl: './shopping-cart-pacient.component.html',
  styleUrls: ['./shopping-cart-pacient.component.css']
})
export class ShoppingCartPacientComponent implements OnInit {

  constructor
  (
    private shoppingCartRest: ShoppingCartRestService,
    private credentialRest: CredentialsRestService,
  )
  {
  }

  shoppingCart : any;
  quantityMedicaments : any;
  medicaments: any;
  dataClient: any;
  items:any;
  medicamentsCart:any
  userCart:any;
  dataBuy: any;

  uriMedicament : any;

  ngOnInit(): void
  {
    this.getShoppingCart();
    this.uriMedicament = environment.baseURI+'medicament/getImageMedicament/'
  }

  getShoppingCart()
  {
    this.shoppingCartRest.getShoppingCart().subscribe({
      next: (res: any) =>
      {
        this.items = res.shoppingCart.medicaments.length
        this.medicamentsCart = res.shoppingCart.medicaments
        this.userCart = res.shoppingCart.user
        this.dataBuy = res.shoppingCart;
      },
      error: (err) => {alert(err.error.message)}
    })
  }



}
