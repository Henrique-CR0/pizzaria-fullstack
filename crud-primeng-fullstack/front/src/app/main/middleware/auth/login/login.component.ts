import { Component } from '@angular/core';
import { LayoutService } from '../../../../../../src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    username!: string;
    loading: boolean = false;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService) { }

    async login(): Promise<void> {
        try {
            if (!this.username || !this.password) {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos' });
                return;
            }

            this.loading = true;
            const token = await this.authService.login({ username: this.username, password: this.password });

            if (token) {
                this.authService.setToken(token);
                if (this.authService.isAuthenticated()) {
                    this.router.navigate(['/']);
                } else {
                    throw new Error('Falha na autenticação');
                }
            }
        } catch (error: any) {
            console.error('Login failed', error);
            let detalhe = 'Não foi possível entrar. Tente novamente.';
            if (error && (error.status === 401 || error.status === 403)) {
                detalhe = 'Usuário ou senha incorretos.';
            } else if (error && (error.status === 0 || error.status >= 500)) {
                detalhe = 'Servidor indisponível. Tente novamente em instantes.';
            }
            this.messageService.add({
                severity: 'error',
                summary: 'Erro no login',
                detail: detalhe
            });
        } finally {
            this.loading = false;
        }
    }
}