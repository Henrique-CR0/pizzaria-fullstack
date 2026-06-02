import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { ProdutoService } from './services/produto.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        ProdutoRoutingModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        InputNumberModule,
        DialogModule
    ],
    declarations: [ProdutoComponent],
    providers: [ProdutoService]
})
export class ProdutoModule { }
