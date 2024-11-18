import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearqr',
  templateUrl: './crearqr.page.html',
  styleUrls: ['./crearqr.page.scss'],
})
export class CrearqrPage {
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';
  
  constructor(private alertController: AlertController,private router: Router) {}
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

  generateQRData(): string {
    return `Asignatura: ${this.asignatura}\nSección: ${this.seccion}\nFecha: ${this.fecha}`;
  }

  guardarClase() {
    const clase = {
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
    };
    localStorage.setItem('clase', JSON.stringify(clase));
    alert('Clase guardada con éxito');
  }
}
