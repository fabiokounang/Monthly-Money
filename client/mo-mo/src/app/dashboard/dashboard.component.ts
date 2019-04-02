import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  openSideNav: boolean = true;
  constructor() { }

  ngOnInit() {}

  onToggle (sidenav) {
    sidenav.toggle();
  }

}
