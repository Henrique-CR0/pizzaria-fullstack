import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'pet', loadChildren: () => import('./pet/pet.module').then(m => m.PetModule) },
        { path: 'produto', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule) },
        { path: 'pet', loadChildren: () => import('./pet/pet.module').then(m => m.PetModule) },
        { path: 'produto', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule) },
        { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
        { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
        { path: 'pedido', loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class MainRoutingModule { }