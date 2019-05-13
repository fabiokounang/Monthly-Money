import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/service/shared.service';
import { Router } from '@angular/router';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  openSideNav: boolean = true;
  modeSide: string = 'side';
  
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    const now = new Date();
    const expires = localStorage.getItem('expiresIn');
    const expirationDate = new Date(now.getTime() + (+expires * 1000));

    this.sharedService.checkRunTimeToken(expirationDate);
    if (window.innerWidth <= 992) {
      this.modeSide = 'over';
      this.openSideNav = false;
    }
  }

  onToggleMenu (sidenav) {
    if (window.innerWidth <= 992) {
      sidenav.toggle();
    }
  }

  onToggle (sidenav) {
    sidenav.toggle();
  }

  onLogout () {
    this.sharedService.clearAuthData();
    this.router.navigate(['/']);
  }
}