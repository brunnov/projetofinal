import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataServiceAgendamento } from './agendamento.data.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  constructor(private dataService: DataServiceAgendamento) {}
  model: any[];
  mode = new FormControl('side');
  opened = true;
  shouldRun = true;
  rollback: string;
  ngOnInit() {}
  exclusao() {
    this.dataService.postAgendamentoExclusao(this.model).subscribe(
      (res: any) => {
        this.rollback = res;
        if (this.rollback === 'rollback') {
          alert('erro');
        } else {
          location.reload();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  receberPedido(valor) {
    this.model = valor;

  }
}
