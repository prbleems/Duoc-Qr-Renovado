import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: '1234' },
    { username: 'alan', password: 'hola12' },
    { username: 'mariano', password: 'hola' },
    { username: 'mateo', password: 'matego' },
    { username: 'profesorcarlos', password: 'carlos123' },
  ];
  private loggedInUser: string = '';

  validateUser(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedInUser = username; 
      return true;
    }
    return false;
  }
  getUsername(): string {
    return this.loggedInUser;
  }

  logout() {
    this.loggedInUser = '';
  }

  changePassword(username: string, newPassword: string): boolean {
    const user = this.users.find(u => u.username === username);
    if (user) {
      user.password = newPassword; 
      return true;
    }
    return false; 
  }
  
}
