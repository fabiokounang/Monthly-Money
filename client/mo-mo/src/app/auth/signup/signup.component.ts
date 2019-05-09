import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  password: boolean = false;
  confirmation_password: boolean = false;
  
  constructor(private router: Router, private sharedService: SharedService, private snack: MatSnackBar) { }
  
  ngOnInit () {
    this.makeForm();
  }

  makeForm () {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmation_password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSignUp () {
    if (this.signUpForm.valid) {
      this.sharedService.connection('POST', 'master-signup', this.signUpForm.value).subscribe((response: any) => {
        if (response.status == 200) {
          if (response.body.status) {
            this.snack.open('Sign up succeed !', 'Okay');
          } else {
            this.snack.open(response.body.error, 'Dismiss');
          }
        }
      })
    } else {
      this.snack.open('All field is required !', 'Dismiss');
    }
  }

}
