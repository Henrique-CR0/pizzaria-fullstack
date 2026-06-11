import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = environment.baseUrl + '/auth';

  constructor(private router: Router) {
    this.checkToken();
  }

  // Metodo de login (via fetch).
  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const res = await fetch(this.apiUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!res.ok) {
        throw { status: res.status };
      }

      const response = await res.json();
      if (response && response.token) {
        await this.setToken(response.token);
        return response.token;
      }
      throw { status: res.status };
    } catch (error: any) {
      console.error('Login error:', error);
      // Falha de rede (sem status) vira "servidor indisponivel".
      if (error && error.status !== undefined) {
        throw error;
      }
      throw { status: 0 };
    }
  }

  // Salvar o token no localStorage
  async setToken(token: string): Promise<void> {
    if (!token) {
      console.error('Attempting to set empty token');
      return;
    }
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Metodo de logout
  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth/login']);
    window.location.reload();
  }

  // Verifica se o usuario esta autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken && decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      this.removeToken();
      return false;
    }
  }

  // Checar se o token e valido ao iniciar o servico
  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        if (expirationDate < new Date()) {
          this.logout();
        }
      } catch (error) {
        console.error('Token validation error:', error);
        this.logout();
      }
    }
  }
}