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
  username: string = '';
  role: string = ''; 
  clases: any[] = [];
  scannedQRCodes: string[] = [];

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.obtenerRol();
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

  async scan(): Promise<void> {
    try {
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        if (this.scannedQRCodes.includes(result.content)) {
          this.result = 'Este código QR ya ha sido escaneado.';
        } else {
          this.registrarAsistencia(result.content);
          this.scannedQRCodes.push(result.content); 
        }
      } else {
        this.result = 'No se detectó ningún código QR.';
      }
    } catch (error) {
      this.result = 'Error al escanear el código QR.';
      console.error(error);
    }
  }

  registrarAsistencia(qrData: string) {
    try {
      const data = JSON.parse(qrData);

      if (data.asignatura && data.seccion && data.sala && data.fecha) {
        const storedAsistencias = localStorage.getItem('asistencias');
        const asistencias = storedAsistencias ? JSON.parse(storedAsistencias) : [];

        const claseExistente = asistencias.find(
          (asistencia: any) =>
            asistencia.asignatura === data.asignatura &&
            asistencia.seccion === data.seccion &&
            asistencia.sala === data.sala
        );

        if (claseExistente) {
          claseExistente.fecha = data.fecha;
        } else {
          asistencias.push({ ...data }); 
        }

        localStorage.setItem('asistencias', JSON.stringify(asistencias));

        this.result = `${data.asignatura}|${data.seccion}|${data.sala}|${data.fecha}`;

        alert('Asistencia registrada con éxito');
      } else {
        this.result = 'El código QR no contiene datos válidos.';
        alert('El código QR no contiene datos válidos.');
      }
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      this.result = 'Error al procesar el QR.';
      alert('Error al procesar el QR.');
    }
  }
}
