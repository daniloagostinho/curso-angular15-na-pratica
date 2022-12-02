import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AddDebtsComponent } from '../add-debts/add-debts.component';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss']
})
export class DebtsComponent {
  constructor(private dialog: MatDialog) {

  }
  openDialog() {
    this.dialog.open(AddDebtsComponent, {
      width: '600px'
    })
  }
}
