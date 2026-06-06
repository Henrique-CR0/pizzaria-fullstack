import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        // Menu da pizzaria: so o que o sistema realmente usa.
        this.model = [
            {
                label: 'Início',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Cadastros',
                items: [
                    { label: 'Produtos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/main/produto'] },
                    { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/main/cliente'] },
                    { label: 'Pedidos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/main/pedido'] }
                ]
            }
        ];
    }
}