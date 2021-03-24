import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from '../shared/models/budget-item.model';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { BudgetItemCardComponent } from './budget-item-card/budget-item-card.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})


export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems!: BudgetItem[];
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(item: BudgetItem){
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem){
    const dialogRef = this.dialog.open(EditItemModalComponent,{
      width:"1580px",
      data: item
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.update.emit({
          old: item,
          new: result
        })
      }
    })
  }

}


export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
