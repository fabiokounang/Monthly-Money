import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-list-management',
  templateUrl: './list-management.component.html',
  styleUrls: ['./list-management.component.css']
})
export class ListManagementComponent implements OnInit {
  displayedColumns = ['select', 'date', 'categoryId', 'type', 'title', 'income', 'spending', 'description'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  totalAmountIncome: number = 0;
  totalAmountSpending: number = 0;
  
  constructor (private sharedService: SharedService) { }

  ngOnInit() {
    this.getAllLogs();
  }

  getAllLogs () {
    this.sharedService.connection('GET', 'master-log', {}, localStorage.getItem('userId')).subscribe((response: any) => {
      if (response.status == 200) {
        if (response.body.status) {
          this.dataSource.data = response.body.data;
          console.log(response.body.data);
          this.getTotalAmount();
        } else {
          this.sharedService.callSnack(response.body.error, 'Dismiss')
        }
      }
    })
  }

  filtering () {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getTotalAmount () {
    this.dataSource.data.forEach((value, index) => {
      console.log(value)
      if (value.type == 0) {
        this.totalAmountIncome += Number(value.price);
      }
      if (value.type == 1) {
        this.totalAmountSpending += Number(value.price);
      }
    })
  }
}
