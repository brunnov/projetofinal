import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ModalComponent } from '../modal/modal.component';
export let selecionado: any[] = [];
import { DataServiceCliente } from '../cliente.data.service';
import { Cliente } from '../interface-cliente';

@Component({
  selector: 'app-table-cliente',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  constructor(private dataService: DataServiceCliente, public dialog: MatDialog) {
  }
  data: any[] = [];
  toppingList: Cliente[] = [];
  displayedColumns: string[] = ['select', 'id', 'nome', 'cpf_cnpj', 'telefone', 'email'];
  dataSource = new MatTableDataSource<Cliente>([]);
  selection = new SelectionModel<Cliente>(true, []);

  ngOnInit() {

    this.dataService.getClientes().subscribe(
      (res: any) => {
        this.data = res;
        this.data.map(num => {
          this.toppingList.push(num);
        });
        this.dataSource = new MatTableDataSource<Cliente>(this.toppingList);
      },
      err => {
        console.log(err);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  edicao(row): void {
    this.dataService.postClientes(row.id_clientes).subscribe(
          (res: any) => {
            this.data = res;
            const dialogRef = this.dialog.open(ModalComponent, {
              width: '600px',
              height: '600px',
              data: {nome: res[0].nome_razaosocial, email: res[0].email, endereco: res[0].endereco, telefone: res[0].telefone,
              senha: res[0].senha, cpf_cnpj: res[0].CPF_CNPJ, responsavel: res[0].responsavel === null ? '': res[0].responsavel, diapagamento: res[0].dia_pagamento === null ? '': res[0].dia_pagamento.toString(),
              header: 'Editar Cliente', login: res[0].login  },
            });
            dialogRef.afterClosed().subscribe(async result => {
              let d;
              console.log('The dialog was closed');
              
              await this.dataService.postClienteEdicao(this.data[0].id_clientes, result.nome, result.email, result.endereco,
                result.cpf_cnpj, result.telefone, result.senha, result.responsavel, result.diapagamento,result.login).subscribe(
                (res: any) => {
                  
                  if ( res === 'rollback' || res === null) {
                    alert('Erro ao Atualizar o Cliente');
                  }
                  if(res === 'Feito')
                  {location.reload();}
                },
                err => {
                  console.log(err);
                }
              );
            });
          },
          err => {
            console.log(err);
          }
        );
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      selecionado = [];

    } else {
      this.dataSource.data.forEach(row => {
      this.selection.select(row);
      selecionado.push(row.id_clientes);
    });
  }
  }

  selecao(checked, row) {
    if (checked) {
      selecionado.push(row.id_clientes);
    } else {
      selecionado.splice(selecionado.indexOf(row.id_clientes), 1);

    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cliente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_clientes + 1}`;
  }


}
