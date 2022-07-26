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
import { PharmacyComponent } from './components/landingPage/pharmacy/pharmacy.component';
import { PharmacyViewComponent } from './components/landingPage/pharmacy-view/pharmacy-view.component';
import { LayoutDoctorComponent } from './components/doctor/layout-doctor/layout-doctor.component';
import { HomeDoctorComponent } from './components/doctor/home-doctor/home-doctor.component';
import { DoctorAdminComponent } from './components/admin/doctor-admin/doctor-admin.component';
import { AppointmentAdminComponent } from './components/admin/appointment-admin/appointment-admin.component';
import { MeetingComponent } from './components/admin/meeting/meeting.component';
import { CallComponent } from './components/admin/call/call.component';


const routes: Routes =
[
  {
    path: '', component:NavbarComponent,children:
    [
      {path: '', component: LandingPageComponent},
      {path: 'aboutUs', component: AboutUsComponent},
      {path: 'contactUs', component: ContactUsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'pharmacy', component: PharmacyComponent},
      {path: 'viewMedicament', component: PharmacyViewComponent},
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
      {path: 'doctor', component: DoctorAdminComponent},
      {path: 'appointment', component: AppointmentAdminComponent},
      {path: 'call', component: CallComponent},
      {path: 'meeting', component: MeetingComponent},
    ]
  },
  {
    path: 'doctor', component:LayoutDoctorComponent,children:
    [
      {path: 'home', component: HomeDoctorComponent},
    ]
  },
  { path: '**', component: NotFoundPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
