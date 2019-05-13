import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-money-management',
  templateUrl: './money-management.component.html',
  styleUrls: ['./money-management.component.css']
})
export class MoneyManagementComponent implements OnInit {
  budgetForm: FormGroup;
  categories: any = [];
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.getCategoryData();
    this.makeForm();
  }

  getCategoryData () {
    this.sharedService.connection('GET', 'master-category', {}, localStorage.getItem('userId')).subscribe((response: any) => {
      if (response.status == 200) {
        if (response.body.status) {
          this.categories = response.body.data;
        } else {
          this.sharedService.callSnack(response.body.error, 'Dismiss');
        }
      }
    })
  }

  makeForm () {
    this.budgetForm = new FormGroup({
      categoryId: new FormControl(null, Validators.required),
      type: new FormControl('0', Validators.required),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null)
    })
  }

  onSubmitBudget () {
    let objData = {
      userId: localStorage.getItem('userId'),
      ...this.budgetForm.value,
      createdAt: new Date().getTime()
    }
    console.log(objData);
    this.sharedService.connection('POST', 'master-log', objData).subscribe((response: any) => {
      if (response.status == 200) {
        if (response.body.status) {
          this.sharedService.callSnack('Success Add Log !', 'Okay');
          this.budgetForm.reset();
        } else {
          this.sharedService.callSnack(response.body.error, 'Dismiss');
        }
      }
    })
  }

}
