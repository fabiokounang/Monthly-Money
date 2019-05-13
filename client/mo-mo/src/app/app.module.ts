import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatCardModule, MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { ListManagementComponent } from './dashboard/list-management/list-management.component';
import { MoneyManagementComponent } from './dashboard/money-management/money-management.component';
import { AccumulationComponent } from './dashboard/accumulation/accumulation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedService } from './shared/service/shared.service';
import { AuthInterceptor } from './shared/service/auth-interceptor';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { AuthGuard } from './shared/service/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    ListManagementComponent,
    MoneyManagementComponent,
    CategoryComponent,
    AccumulationComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
