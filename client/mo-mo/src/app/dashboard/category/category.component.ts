import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-category-component',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }

  onSubmitCategory () {
    let objData = {
      userId: localStorage.getItem('userId'),
      name: this.categoryForm.value.name 
    }

    if (this.categoryForm.valid) {
      this.sharedService.connection('POST', 'master-category', objData).subscribe((response: any) => {
        if (response.status == 200) {
          if (response.body.status) {
            this.sharedService.callSnack('Success Add Category', 'Okay');
            this.categoryForm.reset();
          } else {
            console.log(response)
            this.sharedService.callSnack(response.body.error, 'Dismiss');
          }
        }
      })
    } else {

    }
  }

}
