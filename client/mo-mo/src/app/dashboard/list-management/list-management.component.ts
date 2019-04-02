import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-management',
  templateUrl: './list-management.component.html',
  styleUrls: ['./list-management.component.css']
})
export class ListManagementComponent implements OnInit {
  displayedColumns = ['select', 'category', 'type', 'title', 'amountIncome', 'amountOutcome', 'description'];
  dataSource = new MatTableDataSource<any>([
    {category: 'Primary', type: '0', title: 'Salary', amountIncome: '500000000', description: 'Salary from March'},
    {category: 'Primary', type: '1', title: 'Rent House', amountOutcome: '1800000', description: 'Rent House for March'},
    {category: 'Food', type: '1', title: 'Lunch', amountOutcome: '45000', description: 'Fried Rice on Green Eatery'},
  ]);
  selection = new SelectionModel<any>(true, []);
  totalAmountIncome: number = 0;
  totalAmountOutcome: number = 0;
  constructor() { }

  ngOnInit() {
    this.getTotalAmount();
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
      if (value.amountIncome) {
        this.totalAmountIncome += Number(value.amountIncome);
      }
      if (value.amountOutcome) {
        this.totalAmountOutcome += Number(value.amountOutcome);
      }
    })
  }
}
