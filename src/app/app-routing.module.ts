import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LoginComponent } from './components/landingPage/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/landingPage/navbar/navbar.component';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { AboutUsComponent } from './components/landingPage/about-us/about-us.component';
import { ContactUsComponent } from './components/landingPage/contact-us/contact-us.component';
import { HotelComponent } from './components/landingPage/hotel/hotel.component';
import { HotelAdminComponent } from './components/admin/hotel-admin/hotel-admin.component';
import { EventsAdminComponent } from './components/admin/event-admin/event-admin.component';
import { HotelViewComponent } from './components/landingPage/hotel-view/hotel-view.component';
import { TypeLaboratoryAdminComponent } from './components/admin/type-laboratory-admin/type-laboratory-admin.component';
import { TypeMedicamentAdminComponent } from './components/admin/type-medicament-admin/type-medicament-admin.component';
import { SpecialityAdminComponent } from './components/admin/speciality-admin/speciality-admin.component';
import { MedicamentAdminComponent } from './components/admin/medicament-admin/medicament-admin.component';


const routes: Routes =
[
  {
    path: '', component:NavbarComponent,children:
    [
      {path: '', component: LandingPageComponent},
      {path: 'aboutUs', component: AboutUsComponent},
      {path: 'contactUs', component: ContactUsComponent},
      {path: 'hotels', component: HotelComponent},
      {path: 'login', component: LoginComponent},
      {path: 'viewHotel', component: HotelViewComponent},
    ]
  },
  {
    path: 'admin', component:LayoutAdminComponent,children:
    [
      {path: 'home', component: HomeAdminComponent},
      {path: 'patients', component: AdminUserComponent},
      {path: 'doctors', component: HotelAdminComponent},
      {path: 'products', component: EventsAdminComponent},
      {path: 'typeLaboratory', component: TypeLaboratoryAdminComponent},
      {path: 'typeMedicament', component: TypeMedicamentAdminComponent},
      {path: 'speciality', component: SpecialityAdminComponent},
      {path: 'medicament', component: MedicamentAdminComponent},
    ]
  },
  { path: '**', component: NotFoundPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
