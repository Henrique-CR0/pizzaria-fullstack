import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router) { }

    // Encerra a sessao: apaga o token e volta pra tela de login.
    sair() {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }

    logout(){
        console.log("saindo")
        localStorage.removeItem("token")
        window.location.href = "/"
    }
}
