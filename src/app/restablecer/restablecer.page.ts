import { Component } from '@angular/core';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  showPassword: boolean = false;

  constructor() {}


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}