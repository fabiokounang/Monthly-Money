import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  openSideNav: boolean = true;
  modeSide: string = 'side';
  
  constructor() { }

  ngOnInit() {
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

}