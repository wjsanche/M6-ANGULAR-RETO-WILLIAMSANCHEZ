import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { LoginComponent } from './components/login/login.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard.prototype.canActivate] },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirección inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
