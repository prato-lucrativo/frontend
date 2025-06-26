import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  nomeUsuario: string = '';

  constructor(private router: Router) {}

  ionViewWillEnter() {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    const nome = (localStorage.getItem('nomeUsuario') || '').trim();

    if (!isAuthenticated || !nome) {
      this.router.navigate(['/login']);
      return;
    }

    this.nomeUsuario = nome;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  irParaCadastroPrato() {
    this.router.navigate(['/cadastro-prato']);
  }
}
