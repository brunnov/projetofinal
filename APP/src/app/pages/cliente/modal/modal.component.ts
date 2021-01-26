import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData, fpagamento } from '../cliente.component';
import { DataServiceCliente } from '../cliente.data.service';
import { FormControl } from '@angular/forms';
export let diaPagamento: string;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  hide = true;
  dados: any[] = [];
  toppingList: any[] = [];
  toppings = new FormControl();
  topping;
  selected: any;
  selected2: any;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService: DataServiceCliente
  ) {
    if (data.diapagamento !== undefined) {
      this.selected = data.diapagamento.toString();
      fpagamento.map((num) => {
        this.toppingList.push(num);
      });
      this.selected2 = data.formapagamento;
    }
  }

  ngOnInit() {}

  getInnerText(innerText: any[]) {}
  selectionDia(text: any) {
    diaPagamento = text;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
