import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.checkLogin();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }

  private checkLogin(): boolean {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const users = [
      { username: 'admin', password: '1234' },
      { username: 'alan', password: 'hola12' },
      { username: 'mariano', password: 'hola' },
      { username: 'mateo', password: 'matego' },
    ];
    return users.some(user => user.username === username && user.password === password);
  }
}
