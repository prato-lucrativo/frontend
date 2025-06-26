import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}
// Interface padronizada para as respostas da API
export interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
  usuario?: Usuario;
  // Adicione outros campos esperados, ex: userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Login do usuário
   */
  login(email: string, senha: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, { email, senha });
  }

  /**
   * Cadastro de novo usuário
   */
  signup(nome: string, email: string, senha: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/signup`, { nome, email, senha });
  }

  /**
   * Envio de email para redefinir senha
   */
  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/forgot-password`, { email });
  }

  /**
   * Redefinir a senha com token
   */
  resetPassword(token: string, senha: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/reset-password/${token}`, { senha });
  }
}
