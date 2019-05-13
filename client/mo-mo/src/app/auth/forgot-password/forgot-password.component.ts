import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;

  constructor(private sharedService: SharedService) { }

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
            this.sharedService.callSnack('Email sent ! You can check your email in a few minutes', 'Okay');
          } else {
            this.sharedService.callSnack(response.body.error, 'Dismiss');
          }
        }
      })
    } else {
      this.sharedService.callSnack('Email field is required !', 'Dismiss');
    }
  }

}
