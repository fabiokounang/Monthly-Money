import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;

  constructor(private sharedService: SharedService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm () {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onForgot () {
    if (this.forgotForm.value) {
      this.sharedService.connection('POST', 'master-forgot-password', this.forgotForm.value).subscribe((response: any) => {
        if (response.status == 200) {
          if (response.body.status) {
            this.snack.open('Email sent ! You can check your email in a few minutes', 'Okay');
          } else {
            this.snack.open(response.body.error, 'Dismiss');
          }
        }
      })
    } else {
      this.snack.open('Email field is required !', 'Dismiss');
    }
  }

}
