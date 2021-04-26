import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceCliente } from './cliente.data.service';
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
  responsavel: string;
  formapagamento: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  constructor(public dialog: MatDialog, private dataService: DataServiceCliente) { }

  mode = new FormControl('side');
  opened = true;
  shouldRun = true;
  events: string[] = [];
  email: string;
  nome: string;
  rollback: string;
  data: [];
  ngOnInit() {
  }
  inclusao(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      height: '600px',
      data: {nome: '', email: '', diapagamento: '', header: 'Incluir Cliente'},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataService.postClientesInclusao(result.nome, result.email, result.endereco, result.login,
        result.cpf_cnpj, result.telefone, result.senha, result.responsavel,result.diapagamento).subscribe(
        (res: any) => {
          if ( res === 'rollback') {
            alert('erro');
          } else {
            
            if(res === 'Login já existe'){
              alert('Login já existe')
            }else{
              location.reload();
            }
           
          }
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  exclusao() {

    this.dataService.postClientesExclusao(selecionado).subscribe(
      (res: any) => {
        this.rollback = res;
        console.log(this.rollback);
        if ( this.rollback === 'rollback') {
          alert('erro');
        } else {
          location.reload();
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }
}
