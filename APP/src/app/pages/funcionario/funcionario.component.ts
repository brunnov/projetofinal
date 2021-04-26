import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceFuncionario } from './funcionario.data.service';
import { ModalComponent } from './modal/modal.component';
import { selecionado } from './table/table.component';
export let fpagamento;
export interface DialogData {
  diapagamento: string;
  login: string;
  header: string;
  nome: string;
  cpf_cnpj: string;
  telefone: string;
  endereco: string;
  senha: string;
  email: string;
  especialidade: string;
}
@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
})
export class FuncionarioComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private dataService: DataServiceFuncionario
  ) {}

  mode = new FormControl('side');
  opened = true;
  shouldRun = true;
  events: string[] = [];
  email: string;
  nome: string;
  rollback: string;
  data: [];
  ngOnInit() {}
  inclusao(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      height: '600px',
      data: {
        nome: '',
        email: '',
        diaPagamento: '',
        header: 'Incluir Funcionario',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.dataService
        .postFuncionariosInclusao(
          result.nome,
          result.email,
          result.endereco,
          result.login,
          result.cpf_cnpj,
          result.telefone,
          result.senha,
          result.especialidade
        )
        .subscribe(
          (res: any) => {
            this.data = res;
            if (this.data === ['rollback']) {
              alert('erro');
            } else {
              location.reload();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
  exclusao() {
    this.dataService.postFuncionariosExclusao(selecionado).subscribe(
      (res: any) => {
        this.rollback = res;
        console.log(this.rollback);
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
}
