import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { OsComponent } from './pages/agendamento/os/os.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'agendamento', component: AgendamentoComponent },
{ path: 'os', component: OsComponent },
{ path: 'funcionario', loadChildren: () => import('./pages/funcionario/funcionario.module').then((m) => m.FuncionarioModule), },
{ path: 'cliente', loadChildren: () => import('./pages/cliente/cliente.module').then((m) => m.ClienteModule), },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'home', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule), },
{ path: 'administracao',component:AdministradorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
