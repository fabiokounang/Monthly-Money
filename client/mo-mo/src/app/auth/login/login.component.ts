import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  password: boolean = false;

  constructor(private router: Router, private sharedService: SharedService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm () {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onLogin () {
    if (this.loginForm.valid) {
      this.sharedService.connection('POST', 'master-login', this.loginForm.value).subscribe((response: any) => {
        if (response.status == 200) {
          if (response.body.status) {
            this.router.navigate(['dashboard', 'accumulation']);
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
