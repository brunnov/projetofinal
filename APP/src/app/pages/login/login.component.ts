import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './login.dataservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private nome = '';
  private senha = '';
  hide = true;
  display: boolean;
  data: any[] = [];
  toppingList: any[] = [];
  constructor(
    public fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  onEnterName (value: string) {
    this.nome = value;
  }
  onEnterPassword (value: string) {
    this.senha = value;
  }

  exportData (tableId: string) {
    if (this.nome === '' || this.senha === '') {
      alert('Campos em branco');
    } else {
      this.display = true;
      this.dataService.postLogin(this.nome, this.senha).subscribe(
        (res: any) => {
          this.data = res;
          if (this.data.length > 0) {
            this.display = false;
            this.router.navigate(['/home']);
          } else {
            alert('Usuário ou senha errados');
          }

        },
        err => {
          console.log(err);
        }
      );
      
    }
  }
}
