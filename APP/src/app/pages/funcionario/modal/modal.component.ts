import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../funcionario.component';
import { DataServiceFuncionario } from '../funcionario.data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  hide = true;
  dados: any[] = [];
  toppingList: any[] = [];
  toppings = new FormControl();
  topping;
  selected: any;
  selected2: any;
  constructor(   public dialogRef: MatDialogRef<ModalComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: DialogData,
                 private dataService: DataServiceFuncionario) {
                if (data.diapagamento !== undefined) {this.selected = data.diapagamento.toString();
                                                      
                                                      this.selected2 = data.formapagamento; }
              }

ngOnInit() {

}


getInnerText(innerText: any[]) {
  
}
selectionDia(text: any) {
  
}
onNoClick(): void {
this.dialogRef.close();
}

}
