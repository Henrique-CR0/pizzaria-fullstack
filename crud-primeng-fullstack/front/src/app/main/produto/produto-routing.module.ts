import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProdutoComponent }
    ])],
    exports: [RouterModule]
})
export class ProdutoRoutingModule { }