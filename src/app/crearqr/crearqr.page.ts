import { Component } from '@angular/core';

@Component({
  selector: 'app-crearqr',
  templateUrl: './crearqr.page.html',
  styleUrls: ['./crearqr.page.scss'],
})
export class CrearqrPage {
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';

  generateQRData(): string {
    return `Asignatura: ${this.asignatura}\nSección: ${this.seccion}\nFecha: ${this.fecha}`;
  }

  guardarClase() {
    const clase = {
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
    };
    // Guardar la información en el LocalStorage
    localStorage.setItem('clase', JSON.stringify(clase));
    alert('Clase guardada con éxito');
  }

  // Agregar el método logout()
  logout() {
    // Aquí puedes manejar la lógica de cierre de sesión
    // Ejemplo de eliminación de datos de sesión (si los estás usando)
    localStorage.removeItem('usuario'); // Si estás guardando algo de usuario en localStorage
    alert('Has cerrado sesión con éxito');
    // Redirigir a una página de login, si es necesario:
    // this.router.navigate(['/login']);
  }
}
