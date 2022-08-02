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

  invoiceShow: boolean = false

  invoice :  any;

  uriMedicament : any;

  date : any;
  setDate : any;

  uriUser: any;
  userImage:any

  imprimir()
  {
    window.print()
  }

  ngOnInit(): void
  {
    this.date = new Date().toLocaleString();
    let splitDate = this.date.split(',')
    this.setDate = splitDate[0]
    this.getShoppingCart();
    this.uriMedicament = environment.baseURI+'medicament/getImageMedicament/'
  }

  getShoppingCart()
  {
    this.shoppingCartRest.getShoppingCart().subscribe({
      next: (res: any) =>
      {
        this.userImage = res.shoppingCart.user.image
        this.uriUser = environment.baseURI + 'user/getImageUser/' + this.userImage;
        this.items = res.shoppingCart.medicaments.length
        this.medicamentsCart = res.shoppingCart.medicaments
        this.userCart = res.shoppingCart.user
        this.dataBuy = res.shoppingCart;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  showButton()
  {
    this.invoiceShow = false
  }

  payShoppingCart()
  {
    this.shoppingCartRest.payShoppingCart().subscribe({
      next: (res: any) =>
      {
        this.invoice = res.invoice;
        localStorage.removeItem('shoppingCart');
        this.invoiceShow = true
        Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
      },
      error: (err) => {alert(err.error.message)}
    })
  }



}
