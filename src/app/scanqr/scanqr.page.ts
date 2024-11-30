import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanqr',
  templateUrl: 'scanqr.page.html',
  styleUrls: ['scanqr.page.scss']
})
export class ScanqrPage {
  result: string = '';
  username: string = ''; // Variable para almacenar el nombre del usuario
  role: string = ''; // Variable para almacenar el rol (alumno o profesor)
  clases: any[] = [];

  constructor(private router: Router,private alertController: AlertController) {}

  ngOnInit() {
    this.obtenerRol(); // Obtener el rol al iniciar la página
  }
  obtenerRol() {
    this.role = sessionStorage.getItem('role') || ''; // Recupera el rol si está en sessionStorage
    console.log('Rol recuperado:', this.role); // Log para depuración
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

   // Escanear el código QR
   async scan(): Promise<void> {
    try {
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.result = result.content;
        this.registrarAsistencia(this.result); // Registrar la asistencia al escanear el QR
      } else {
        this.result = 'No se detectó ningún código QR.';
      }
    } catch (error) {
      this.result = 'Error al escanear el código QR';
      console.error(error);
    }
  }

  // Registrar la asistencia
  registrarAsistencia(qrData: string) {
    try {
      const data = JSON.parse(qrData); // Convertir el string del QR a un objeto

      if (data.asignatura && data.seccion && data.fecha) {
        // Obtener las asistencias guardadas
        const storedAsistencias = localStorage.getItem('asistencias');
        let asistencias = storedAsistencias ? JSON.parse(storedAsistencias) : [];

        // Verificar si ya existe la clase (no acumularemos asistencia, solo fecha)
        let claseExistente = asistencias.find((asistencia: any) =>
          asistencia.asignatura === data.asignatura && 
          asistencia.seccion === data.seccion
        );

        if (claseExistente) {
          claseExistente.fecha = data.fecha; // Actualizar la fecha de asistencia
        } else {
          asistencias.push({ ...data }); // Agregar nueva clase
        }

        // Guardar las asistencias actualizadas
        localStorage.setItem('asistencias', JSON.stringify(asistencias));

        alert('Asistencia registrada con éxito');
        } else {
        alert('El código QR no contiene datos válidos');
        }
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      alert('Error al procesar el QR');
    }
  }
}