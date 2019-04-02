import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-money-management',
  templateUrl: './money-management.component.html',
  styleUrls: ['./money-management.component.css']
})
export class MoneyManagementComponent implements OnInit {
  budgetForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.budgetForm = new FormGroup({
      category: new FormControl(null),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null)
    })
  }

}
