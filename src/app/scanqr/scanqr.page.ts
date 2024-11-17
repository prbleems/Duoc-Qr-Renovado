import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanqr',
  templateUrl: 'scanqr.page.html',
  styleUrls: ['scanqr.page.scss'],
})
export class ScanqrPage {
  result: string = '';

  constructor(private router: Router) {}

  // Función para cerrar sesión
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // Función para iniciar el escaneo
  async scan(): Promise<void> {
    try {
      // Iniciar el escaneo
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.result = result.content; // Guardamos el contenido del código QR

        // Si el QR es válido, podemos registrar la asistencia
        this.registrarAsistencia(this.result);
      } else {
        this.result = 'No se detectó ningún código QR.';
      }
    } catch (error) {
      this.result = 'Error al escanear el código QR';
      console.error(error);
    }
  }

  // Función para registrar la asistencia
  registrarAsistencia(qrData: string) {
    const asistencia = {
      qrData,
      timestamp: new Date(),
    };

    // Obtener el array de asistencias previas desde LocalStorage
    const storedAsistencias = localStorage.getItem('asistencias');
    let asistencias = storedAsistencias ? JSON.parse(storedAsistencias) : [];

    // Agregar nueva asistencia al array
    asistencias.push(asistencia);

    // Guardar el array actualizado en LocalStorage
    localStorage.setItem('asistencias', JSON.stringify(asistencias));

    alert('Asistencia registrada con éxito');
  }
}
