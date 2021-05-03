import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cliente } from '../../cliente/interface-cliente';
import { DataServiceOrdemdeServico } from './os.data.service';
import { Router } from '@angular/router';
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
  dados = [];
  options: Cliente[] = [];
  myControl = new FormControl();
  topping: any;
  funcionarios = new FormControl();
  funcionario: any;
  funcionarioList: any[] = [];
  selected: any;
  filteredOptions: Observable<Cliente[]>;
  assunto: string = '';
  observacao: string = '';
  cliente: any;
  dataAgendamento: Date;
  subscription: Subscription;
  constructor(
    private dataServiceOrdem: DataServiceOrdemdeServico,
    private router: Router,
    private dataServiceAgendamento: DataServiceAgendamento
  ) {
    this.subscription = this.dataServiceAgendamento.os$.subscribe((tarefa) => {
      this.dados.push(tarefa);
    });
  }
  date = new FormControl(new Date());

  ngOnInit() {
    this.dataServiceOrdem.getClientes().subscribe(
      (res: any) => {
        res.map((num) => {
          this.options.push(num);
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.dataServiceOrdem.getFuncionarios().subscribe(
      (res: any) => {
        res.map((num) => {
          this.funcionarioList.push(num);
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) =>
        typeof value === 'string' ? value : value.nome_razaosocial
      ),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
    this.dataAgendamento = new Date();
  }

  displayFn(user: Cliente): string {
    return user && user.nome_razaosocial ? user.nome_razaosocial : '';
  }
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) =>
        option.nome_razaosocial.toLowerCase().indexOf(filterValue) === 0
    );
  }
  incluirOS() {
    this.dataServiceOrdem
      .postAgedamentoInclusao(
        this.cliente,
        this.funcionario,
        this.dataAgendamento,
        this.selected,
        this.assunto,
        this.observacao
      )
      .subscribe(
        (res: any) => {
          if (res === 'rollback') {
            alert('erro');
          } else {
            this.router.navigate(['/agendamento']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getInnerText(innerText: any) {
    this.funcionario = innerText;
  }
  getCliente(option: any) {
    this.cliente = option.id_clientes;
  }
  getPrioridade(prioridate: any[]) {
    this.selected = prioridate;
  }
  onNoClick(): void {}
  onDate(event): void {
    this.dataAgendamento = event.value;
  }
  voltar(): void {
    this.router.navigate(['/agendamento']);
  }
}
