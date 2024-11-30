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
  role: string = '';
  ngOnInit() {
    this.obtenerRol(); // Obtener el rol al iniciar la página
  }
  // Obtener el rol desde sessionStorage
  obtenerRol() {
    this.role = sessionStorage.getItem('role') || ''; // Recupera el rol si está en sessionStorage
    console.log('Rol recuperado:', this.role); // Log para depuración
  }
  
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

  // Generar datos del QR como JSON
  generateQRData(): string {
    const qrData = {
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha
    };

    return JSON.stringify(qrData); // Convertir a cadena JSON
  }

  // Guardar clase y generar QR
  guardarClase() {
    const clase = {
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
    };

    localStorage.setItem('clase', JSON.stringify(clase)); // Guardar en localStorage
    alert('Clase guardada con éxito');
  }
  formatearFecha(event: any): void {
    if (this.fecha) {
      const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0];
      console.log('Fecha formateada:', fechaFormateada); // Esto mostrará "yyyy-MM-dd"
      this.fecha = fechaFormateada;
    }
  }
  validateSeccion(): void {
    // Permitir sólo un formato válido: una letra y tres números
    const pattern = /^[A-Za-z][0-9]{0,3}$/;
    if (!pattern.test(this.seccion)) {
      this.seccion = this.seccion.slice(0, -1); // Eliminar último carácter inválido
    }
  }
  validateFecha(): void {
    this.fecha = this.fecha.replace(/[^0-9]/g, ''); // Permitir sólo números
  }
}