import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cliente } from '../../cliente/interface-cliente';
import { DataServiceOrdemdeServico } from './os.data.service';

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
  options: Cliente[] = [];
  myControl = new FormControl();
  topping: any;
  selected: any;
  selected2: any;
 

  filteredOptions: Observable<Cliente[]>;

  constructor(private dataServiceOrdem: DataServiceOrdemdeServico) {}
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
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),      
      map(value => typeof value === 'string' ? value : value.nome_razaosocial),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }
  displayFn(user: Cliente): string {
    return user && user.nome_razaosocial ? user.nome_razaosocial : '';
  }
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.nome_razaosocial.toLowerCase().indexOf(filterValue) === 0);
  }
  incluirOS(innerText: any[]) {}
  selectionDia(text: any) {}
  onNoClick(): void {}
}
