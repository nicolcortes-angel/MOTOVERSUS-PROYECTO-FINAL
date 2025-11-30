import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  if (!_loginService.isLoggedIn()) {
    alert('No has Iniciado Sesión');
    _router.navigate(['/login']);
    return false;
  }

  if (!_loginService.isAdmin) {
    alert('Acceso denegado, serás redireccionado al Inicio');
    _router.navigate(['/']);
    return false;
  }

  return true;
  
};
