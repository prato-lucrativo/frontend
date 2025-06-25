import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    const isAuthenticated = localStorage.getItem('auth') === 'true';
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  async presentToast(message: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  esqueciSenha() {
    this.router.navigate(['/forgot-password']);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return this.presentToast('Preencha corretamente todos os campos.');
    }

    this.isLoading = true;
    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).subscribe({
      next: async (res: any) => {
        this.isLoading = false;

        if (res?.success) {
          localStorage.setItem('auth', 'true');
          await this.presentToast('Login efetuado com sucesso!', 'success');
          this.router.navigate(['/home']);
        } else {
          await this.presentToast(res.message || 'E-mail ou senha incorretos.');
        }
      },
      error: async (err) => {
        this.isLoading = false;
        console.error('Erro na autenticação:', err);

        const msg =
          err.status === 400
            ? err.error?.message || 'E-mail ou senha incorretos.'
            : 'Erro ao conectar com o servidor.';
        await this.presentToast(msg);
      },
    });
  }
}
