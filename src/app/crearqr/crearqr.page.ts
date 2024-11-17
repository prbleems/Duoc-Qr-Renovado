import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearqr',
  templateUrl: './crearqr.page.html',
  styleUrls: ['./crearqr.page.scss'],
})
export class CrearqrPage implements OnInit {
  text: string = '';
  texto: string = '';
  fecha: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }


  generateQRData(): string {
    return `Asignatura: ${this.text}\nSección: ${this.texto}\nFecha: ${this.fecha}`;
  }
}