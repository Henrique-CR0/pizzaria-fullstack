// Modulo da tela de pedidos. 

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { PedidoRoutingModule } from './pedido-routing.module';

import { PedidoComponent } from './pedido.component';

import { PedidoService } from './services/pedido.service';

import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';

import { RippleModule } from 'primeng/ripple';

import { ToastModule } from 'primeng/toast';

import { ToolbarModule } from 'primeng/toolbar';

import { InputTextModule } from 'primeng/inputtext';

import { DropdownModule } from 'primeng/dropdown';

import { InputNumberModule } from 'primeng/inputnumber';

import { DialogModule } from 'primeng/dialog';

@NgModule({

    imports: [

        CommonModule,

        PedidoRoutingModule,

        TableModule,

        FormsModule,

        ButtonModule,

        RippleModule,

        ToastModule,

        ToolbarModule,

        InputTextModule,

        DropdownModule,

        InputNumberModule,

        DialogModule

    ],

    declarations: [PedidoComponent],

    providers: [PedidoService]

})

export class PedidoModule { }