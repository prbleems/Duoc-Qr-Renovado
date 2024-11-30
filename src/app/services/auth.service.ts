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
  ];

  constructor() {}

  // Método para validar si las credenciales son correctas
  validateUser(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    return !!user;  // Retorna true si el usuario existe, false si no
  }

  // Método para cambiar la contraseña del usuario
  changePassword(username: string, newPassword: string): boolean {
    const user = this.users.find(u => u.username === username);
    if (user) {
      user.password = newPassword;  // Cambia la contraseña
      return true;
    }
    return false;  // Si no encuentra el usuario, no hace cambios
  }
}
