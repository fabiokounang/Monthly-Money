import { Injectable } from "@angular/core";
import { SharedService } from './shared.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor (private sharedService: SharedService, private router: Router, private snack: MatSnackBar) {}
  
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sharedService.isAuthenticate()) {
      return true;
    } else {
      this.sharedService.clearAuthData();
      const snackBar = this.snack.open('Your session has expired !', 'Okay');
      snackBar.afterDismissed().subscribe(() => {
        this.router.navigate(['/']);
      })
      return false;
    };
  } 
}