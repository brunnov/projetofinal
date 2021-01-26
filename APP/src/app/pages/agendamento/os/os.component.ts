import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../funcionario/funcionario.component';
import { DataServiceAgendamento } from '../agendamento.data.service';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss'],
})
export class OsComponent implements OnInit {
  mode = new FormControl('side');
  opened = true;
  shouldRun = true;
  hide = true;
  dados: any[] = [];
  toppingList: any[] = [];
  toppings = new FormControl();
  topping;
  selected: any;
  selected2: any;
  public data;

  constructor(private dataService: DataServiceAgendamento) {}
  date = new FormControl(new Date());
  ngOnInit() {
    console.log(new Date().toISOString());
  }

  incluirOS(innerText: any[]) {}
  selectionDia(text: any) {}
  onNoClick(): void {}
}
