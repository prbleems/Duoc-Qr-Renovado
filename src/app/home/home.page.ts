import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  username: string = ''; // Variable para almacenar el nombre del usuario
  clases: any[] = [];

  constructor(
    private alertController: AlertController, 
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerAsistencias();
    this.obtenerUsuario();
  }

  // Obtener el nombre del usuario desde sessionStorage
  obtenerUsuario() {
    this.username = sessionStorage.getItem('username') || 'Usuario'; // Recupera el usuario si está en sessionStorage
  }

  // Obtener las clases y asistencias desde localStorage
  obtenerAsistencias() {
    const storedAsistencias = localStorage.getItem('asistencias');
    this.clases = storedAsistencias ? JSON.parse(storedAsistencias) : [];
  }

  // Cerrar sesión
  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            sessionStorage.clear(); // Limpiar sessionStorage
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
