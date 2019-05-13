import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Chart
} from 'chart.js';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-accumulation',
  templateUrl: './accumulation.component.html',
  styleUrls: ['./accumulation.component.css']
})
export class AccumulationComponent implements OnInit {
  @ViewChild('myChart') myChart: ElementRef;
  chart: any;
  categories: any = [];
  resultLog: any = [];
  incomeTotal: any = 0;
  spendingTotal: any = 0;
  constructor (private sharedService: SharedService) {}

  ngOnInit() {
    this.getCategoryData();
    this.getTotalAllType('all');
  }

  getTotalAllType (type) {
    let params = localStorage.getItem('userId') + '/' + type;
    this.sharedService.connection('GET', 'master-log', {}, params).subscribe((response: any) => {
      if (response.status == 200) {
        if (response.body.status) {
          console.log(response.body.data);
          this.incomeTotal = response.body.data[0]['SUM (price)'];
          this.spendingTotal = response.body.data[1]['SUM (price)'];          
        } else {
          this.sharedService.callSnack(response.body.error, 'Dismiss');
        }
      }
    })
  }

  getCategoryData () {
    this.sharedService.connection('GET', 'master-category', {}, localStorage.getItem('userId')).subscribe((response: any) => {
      if (response.status == 200) {
        if (response.body.status) {
          this.categories = response.body.data;
          this.getAllLogByCategories();
        } else {
          this.sharedService.callSnack(response.body.error, 'Dismiss');
        }
      }
    })
  }

  getAllLogByCategories () {
    this.sharedService.connection('GET', 'master-log-category', {}, localStorage.getItem('userId')).subscribe((response: any) => {
      if (response.status == 200) {
        if (response.body.status) {
          this.categories.forEach((data) => {
            response.body.data.forEach((value) => {
              if (data.id == value.categoryId) {
                value.name = data.name;
              }
            })
          })
          this.resultLog = response.body.data;
          this.createChart();
        } else {
          this.sharedService.callSnack(response.body.error, 'Dismiss');
        }
      }
    })  
  }

  createChart () {
    let ctx = this.myChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Graphic Chart',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
