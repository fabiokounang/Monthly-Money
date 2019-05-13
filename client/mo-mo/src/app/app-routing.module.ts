import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ListManagementComponent } from './dashboard/list-management/list-management.component';
import { MoneyManagementComponent } from './dashboard/money-management/money-management.component';
import { AccumulationComponent } from './dashboard/accumulation/accumulation.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { AuthGuard } from './shared/service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { 
    path: '', component: AuthComponent, children: [
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: 'auth/forgot-password', component: ForgotPasswordComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'list-management', component: ListManagementComponent, canActivate: [AuthGuard] },
      { path: 'money-management', component: MoneyManagementComponent, canActivate: [AuthGuard] },
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'accumulation', component: AccumulationComponent, canActivate: [AuthGuard] }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
