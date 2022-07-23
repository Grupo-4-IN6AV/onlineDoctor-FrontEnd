import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from '../admin-user/admin-user.component';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
const routes: Routes =
[];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
