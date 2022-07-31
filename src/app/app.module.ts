import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

/*IMPORTACIONES MANUALES*/
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderDoctorComponent } from './layout/header-doctor/header-doctor.component';
import { HeaderPacientComponent } from './layout/header-pacient/header-pacient.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { SearchUserPipePipe } from './pipes/searchUserPiper/search-user-pipe.pipe';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { SidebarrightAdminComponent } from './components/admin/sidebarright-admin/sidebarright-admin.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LoginComponent } from './components/landingPage/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/landingPage/navbar/navbar.component';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { AboutUsComponent } from './components/landingPage/about-us/about-us.component';
import { ContactUsComponent } from './components/landingPage/contact-us/contact-us.component';
import { TypeLaboratoryAdminComponent } from './components/admin/type-laboratory-admin/type-laboratory-admin.component';
import { TypeMedicamentAdminComponent } from './components/admin/type-medicament-admin/type-medicament-admin.component';
import { SpecialityAdminComponent } from './components/admin/speciality-admin/speciality-admin.component';
import { MedicamentAdminComponent } from './components/admin/medicament-admin/medicament-admin.component';
import { PharmacyComponent } from './components/landingPage/pharmacy/pharmacy.component';
import { PharmacyViewComponent } from './components/landingPage/pharmacy-view/pharmacy-view.component';
import { SearchMedicamentPipe } from './pipes/searchMedicament/search-medicament.pipe';
import { SwiperModule } from 'swiper/angular';
import { LayoutDoctorComponent } from './components/doctor/layout-doctor/layout-doctor.component';
import { SidebarDoctorComponent } from './components/doctor/sidebar-doctor/sidebar-doctor.component';
import { SidebarrightDoctorComponent } from './components/doctor/sidebarright-doctor/sidebarright-doctor.component';
import { HomeDoctorComponent } from './components/doctor/home-doctor/home-doctor.component';
import { DoctorAdminComponent } from './components/admin/doctor-admin/doctor-admin.component';
import { AppointmentAdminComponent } from './components/admin/appointment-admin/appointment-admin.component';
import { LaboratoryAdminComponent } from './components/admin/laboratory-admin/laboratory-admin.component';
import { MeetingComponent } from './components/admin/meeting/meeting.component';
import { CallComponent } from './components/admin/call/call.component';
import { PharmacyViewAllComponent } from './components/landingPage/pharmacy-view-all/pharmacy-view-all.component';
import { SearchMedicamentTablePipe } from './pipes/searchMedicamentTable/search-medicament-table.pipe';
import { SearchMedicamentBarPipe } from './pipes/searchMedicamentBar/search-medicament-bar.pipe';
import { SearchUserBarPipe } from './pipes/searchUserBar/search-user-bar.pipe';
import { SearchAppointmentTablePipe } from './pipes/searchAppointmentTable/search-appointment-table.pipe';
import { SearchAppointmentBarPipe } from './pipes/searchAppointmentBar/search-appointment-bar.pipe';
import { SearchDoctorBarPipe } from './pipes/searchDoctorBar/search-doctor-bar.pipe';
import { SearchDoctorTablePipe } from './pipes/searchDoctorTable/search-doctor-table.pipe';
import { SearchSpecialityBarPipe } from './pipes/searchSpecialityBar/search-speciality-bar.pipe';
import { SearchSpecialityTablePipe } from './pipes/searchSpecialityTable/search-speciality-table.pipe';
import { SearchTypeLaboratoryBarPipe } from './pipes/searchTypeLaboratoryBar/search-type-laboratory-bar.pipe';
import { SearchTypeLaboratoryTablePipe } from './pipes/searchTypeLaboratoryTable/search-type-laboratory-table.pipe';
import { SearchTypeMedicamentBarPipe } from './pipes/searchTypeMedicamentBar/search-type-medicament-bar.pipe';
import { SearchTypeMedicamentTablePipe } from './pipes/searchTypeMedicamentTable/search-type-medicament-table.pipe';

import { LayoutPacientComponent } from './components/pacient/layout-pacient/layout-pacient.component';
import { SidebarPacientComponent } from './components/pacient/sidebar-pacient/sidebar-pacient.component';
import { SidebarrightPacientComponent } from './components/pacient/sidebarright-pacient/sidebarright-pacient.component';
import { HomePacientComponent } from './components/pacient/home-pacient/home-pacient.component';
import { LaboratoryDoctorComponent } from './components/doctor/laboratory-doctor/laboratory-doctor.component';
import { LaboratoryPacientComponent } from './components/pacient/laboratory-pacient/laboratory-pacient.component';
import { AppointmentPacientComponent } from './components/pacient/appointment-pacient/appointment-pacient.component';
import { DiaryPacientComponent } from './components/pacient/diary-pacient/diary-pacient.component';
import { PrescriptionPacientComponent } from './components/pacient/prescription-pacient/prescription-pacient.component';
import { PharmacyPacientComponent } from './components/pacient/pharmacy-pacient/pharmacy-pacient.component';
import { ShoppingCartPacientComponent } from './components/pacient/shopping-cart-pacient/shopping-cart-pacient.component';
import { AppointmentDoctorComponent } from './components/doctor/appointment-doctor/appointment-doctor.component';
import { PrescriptionDoctorComponent } from './components/doctor/prescription-doctor/prescription-doctor.component';
import { DiaryDoctorComponent } from './components/doctor/diary-doctor/diary-doctor.component';
import { ProfilePacientComponent } from './components/pacient/profile-pacient/profile-pacient.component';
import { ProfileDoctorComponent } from './components/doctor/profile-doctor/profile-doctor.component';
import { SearchMedicamentNamePipe } from './pipes/searchMedicamentName/search-medicament-name.pipe';
import { SearchLaboratoryNamePipe } from './pipes/searchLaboratoryName/search-laboratory-name.pipe';
import { SearchLaboratoryPrescriptionPipe } from './pipes/searchLaboratoyPrescription/search-laboratory-prescription.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    HomeAdminComponent,
    AdminUserComponent,
    SearchUserPipePipe,
    SidebarAdminComponent,
    SidebarrightAdminComponent,
    LayoutAdminComponent,
    LoginComponent,
    NotFoundPageComponent,
    NavbarComponent,
    LandingPageComponent,
    AboutUsComponent,
    ContactUsComponent,
    TypeLaboratoryAdminComponent,
    TypeMedicamentAdminComponent,
    SpecialityAdminComponent,
    MedicamentAdminComponent,
    PharmacyComponent,
    SearchMedicamentPipe,
    PharmacyViewComponent,
    LayoutDoctorComponent,
    SidebarDoctorComponent,
    SidebarrightDoctorComponent,
    HeaderDoctorComponent,
    HomeDoctorComponent,
    DoctorAdminComponent,
    AppointmentAdminComponent,
    LaboratoryAdminComponent,
    MeetingComponent,
    CallComponent,
    PharmacyViewAllComponent,
    SearchMedicamentBarPipe,
    SearchMedicamentTablePipe,
    SearchUserBarPipe,
    SearchAppointmentTablePipe,
    SearchAppointmentBarPipe,
    SearchDoctorBarPipe,
    SearchDoctorTablePipe,
    SearchSpecialityBarPipe,
    SearchSpecialityTablePipe,
    SearchTypeLaboratoryBarPipe,
    SearchTypeLaboratoryTablePipe,
    SearchTypeMedicamentBarPipe,
    SearchTypeMedicamentTablePipe,
    SearchUserBarPipe,
    HeaderPacientComponent,
    LayoutPacientComponent,
    SidebarPacientComponent,
    SidebarrightPacientComponent,
    HomePacientComponent,
    LaboratoryDoctorComponent,
    LaboratoryPacientComponent,
    AppointmentPacientComponent,
    DiaryPacientComponent,
    PrescriptionPacientComponent,
    PharmacyPacientComponent,
    ShoppingCartPacientComponent,
    AppointmentDoctorComponent,
    PrescriptionDoctorComponent,
    DiaryDoctorComponent,
    ProfilePacientComponent,
    ProfileDoctorComponent,
    SearchMedicamentNamePipe,
    SearchLaboratoryNamePipe,
    SearchLaboratoryPrescriptionPipe,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    CoreModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgApexchartsModule,
    FullCalendarModule,// register FullCalendar with you app
    MatTabsModule,
    SwiperModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
