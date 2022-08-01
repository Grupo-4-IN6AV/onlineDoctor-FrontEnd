import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartRestService } from 'src/app/services/shoppingCartRest/shopping-cart-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shopping-cart-pacient',
  templateUrl: './shopping-cart-pacient.component.html',
  styleUrls: ['./shopping-cart-pacient.component.css']
})
export class ShoppingCartPacientComponent implements OnInit {

  constructor
  (
    private shoppingRest: ShoppingCartRestService,
    private router: Router,
  )
  {
  }

  shoppingCart : any;
  quantityMedicaments : any;
  medicaments: any;
  dataClient: any;

  fileName : any;
  pdf : any;

  ngOnInit(): void 
  {
    this.getShoppingCart();
  }

  getShoppingCart()
  {
    this.shoppingRest.getShoppingCart().subscribe({
      next: (res: any) => {
        this.shoppingCart = res.shoppingCarts;
        for(let shop of this.shoppingCart)
        {
          this.dataClient = shop;
          this.medicaments = shop.medicaments
          this.quantityMedicaments = shop.medicaments.length
        }
      },
      error: (err) => { alert(err.error.message) }
    })
  }


  /*
  generatePDF()
  {
    Swal.fire({
      icon: 'success',
      title: 'Bill create Successfully.',
      confirmButtonColor: '#28B463',
      timer: 5000,
    }).then((result) => {
      if (result.isConfirmed)
      {
        let dpi = this.dataClient.dpi
        let params = {dpi}
        this.shoppingRest.generatePdf(params).subscribe({
          next: (res: any) =>
          {
            window.open("http://localhost:3000/Bill" + res.updateBill.numberBill);
            this.router.navigate(['/companies/salesProducts'])
          },
          error: (err) => { alert(err.error.message) }
        })
      }
    });
  }
*/

}
