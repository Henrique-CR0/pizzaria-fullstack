import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    erro: string = '';

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private router: Router
    ) { }

    // Faz login na API, guarda o token e entra no sistema.
    entrar() {
        this.erro = '';
        const corpo = { username: this.username, password: this.password };
        this.http.post<any>(environment.baseUrl + "/auth/login", corpo).subscribe({
            next: (res) => {
                const token = res.token || res.accessToken;
                if (token) {
                    localStorage.setItem("token", token);
                    this.router.navigate(['/']);
                } else {
                    this.erro = 'Nao foi possivel entrar. Tente novamente.';
                }
            },
            error: () => {
                this.erro = 'Usuario ou senha incorretos.';
            }
        });
    }
}