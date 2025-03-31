import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  canActivate: CanActivateFn = (route, state) => {
    const usuarioAutenticado = localStorage.getItem('usuario');
    return usuarioAutenticado ? true : this.router.navigate(['/login']);
  };

  constructor(private router: Router) {}
}