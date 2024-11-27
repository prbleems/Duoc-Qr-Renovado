import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  clases: any[] = [];

  constructor(
    private alertController: AlertController, 
    private router: Router
  ) {}
  ngOnInit() {
    this.obtenerAsistencias();
  }

  // Obtener las clases y asistencias desde localStorage
  obtenerAsistencias() {
    const storedAsistencias = localStorage.getItem('asistencias');
    this.clases = storedAsistencias ? JSON.parse(storedAsistencias) : [];
  }

  
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
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}