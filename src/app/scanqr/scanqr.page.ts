import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanqr',
  templateUrl: 'scanqr.page.html',
  styleUrls: ['scanqr.page.scss'],
})
export class ScanqrPage {
  result: string = '';

  constructor(private router: Router,private alertController: AlertController) {}


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
        this.result = result.content;

        this.registrarAsistencia(this.result);
      } else {
        this.result = 'No se detectó ningún código QR.';
      }
    } catch (error) {
      this.result = 'Error al escanear el código QR';
      console.error(error);
    }
  }

 
  registrarAsistencia(qrData: string) {
    const asistencia = {
      qrData,
      timestamp: new Date(),
    };

    
    const storedAsistencias = localStorage.getItem('asistencias');
    let asistencias = storedAsistencias ? JSON.parse(storedAsistencias) : [];

    asistencias.push(asistencia);


    localStorage.setItem('asistencias', JSON.stringify(asistencias));

    alert('Asistencia registrada con éxito');
  }
}
