import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { ConfigService } from '../../../../src/app/config/config.service';
import { RightSidebarService } from '../../../../src/app/core/service/rightsidebar.service';
const document: any = window.document;
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { ShoppingCartRestService } from 'src/app/services/shoppingCartRest/shopping-cart-rest.service';
@Component({
  selector: 'app-header-pacient',
  templateUrl: './header-pacient.component.html',
  styleUrls: ['./header-pacient.component.sass']
})
export class HeaderPacientComponent implements OnInit, DoCheck
{

  user: any;

  //Mostrar Fotografía//
  userImage: any
  uri: any
  token:string;

  //ShoppingCart//
  shoppingCart:any;
  itemsShoppingCart: number = 0;
  medicaments:any;

  public config: any = {};
  isNavbarCollapsed = true;
  isOpenSidebar: boolean;

  constructor(
    private userRest: UserRestService,
    private shoppingCartRest: ShoppingCartRestService,
    private credentialRest: CredentialsRestService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService
  ) { }

  ngOnInit()
  {
    this.getShoppingCart();
    this.config = this.configService.configData;
  }
  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  public toggleRightSidebar(): void {
    this.rightSidebarService.sidebarState.subscribe((isRunning) => {
      this.isOpenSidebar = isRunning;
    });

    this.rightSidebarService.setRightSidebar(
      (this.isOpenSidebar = !this.isOpenSidebar)
    );
  }



  userLogin()
  {
    this.userRest.getUser(this.credentialRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.userImage = this.user.image;
        this.uri = environment.baseURI + 'user/getImageUser/' + this.userImage;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  ngDoCheck(): void
  {
      this.userImage = this.credentialRest.getIdentity().image;
      this.uri = environment.baseURI + 'user/getImageUser/' + this.userImage;
  }

  getShoppingCart()
  {
    this.shoppingCartRest.getShoppingCart().subscribe({
      next: (res: any) =>
      {
        this.shoppingCart = res.shoppingCart;
        this.itemsShoppingCart = this.shoppingCart.medicaments.length
        this.medicaments = res.shoppingCart.medicaments
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  logOut()
  {
    localStorage.removeItem('token');
    window.location.replace('/')
  }

}
