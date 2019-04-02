import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ListManagementComponent } from './dashboard/list-management/list-management.component';
import { MoneyManagementComponent } from './dashboard/money-management/money-management.component';
import { AccumulationComponent } from './dashboard/accumulation/accumulation.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { 
    path: '', component: AuthComponent, children: [
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'list-management', component: ListManagementComponent },
      { path: 'money-management', component: MoneyManagementComponent },
      { path: 'accumulation', component: AccumulationComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
