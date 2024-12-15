import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crearqr',
  templateUrl: './crearqr.page.html',
  styleUrls: ['./crearqr.page.scss'],
})
export class CrearqrPage {
  asignaturaSeleccionada: string = '';
  seccion: string = '';
  sala: string = '';
  fecha: string = '';
  role: string = '';

  asignaturas = [
    { nombre: 'Matemáticas', seccion: 'A101', sala: '502' },
    { nombre: 'Historia Clásica', seccion: 'A102', sala: '708' },
    { nombre: 'Literatura Clásica', seccion: 'A103', sala: '606' },
  ];

  constructor(private alertController: AlertController, private router: Router,private authService: AuthService) {}
  username: string = ''
  clases: any[] = [];

  ngOnInit() {
    this.username = this.authService.getUsername(); 
  }

  obtenerRol() {
    this.role = sessionStorage.getItem('role') || '';
    console.log('Rol recuperado:', this.role);
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
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            sessionStorage.clear();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  actualizarDatosAsignatura() {
    const asignatura = this.asignaturas.find((a) => a.nombre === this.asignaturaSeleccionada);
    if (asignatura) {
      this.seccion = asignatura.seccion;
      this.sala = asignatura.sala;
    }
  }

  generateQRData(): string {
    const qrData = {
      asignatura: this.asignaturaSeleccionada,
      seccion: this.seccion,
      sala: this.sala,
      fecha: this.fecha,
    };
    return JSON.stringify(qrData);
  }
  

  guardarClase() {
    const clase = {
      asignatura: this.asignaturaSeleccionada,
      seccion: this.seccion,
      sala: this.sala,
      fecha: this.fecha,
    };

    localStorage.setItem('clase', JSON.stringify(clase));
    alert('Clase guardada con éxito');
  }

  validarFecha(event: any): void {
    const input = event.target.value;
  
    const soloNumeros = input.replace(/[^0-9]/g, '');
  
    if (soloNumeros.length > 8) {
      this.fecha = soloNumeros.slice(0, 8);
    } else {
      this.fecha = soloNumeros;
    }
  
    if (this.fecha.length === 8) {
      const anio = parseInt(this.fecha.slice(0, 4), 10);
      const mes = parseInt(this.fecha.slice(4, 6), 10);
      const dia = parseInt(this.fecha.slice(6), 10);
  
      if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        alert('Fecha no válida. Use el formato YYYYMMDD.');
        this.fecha = '';
      }
    }
  }
}
  

