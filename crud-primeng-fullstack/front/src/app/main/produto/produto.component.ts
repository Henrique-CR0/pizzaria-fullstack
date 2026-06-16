import { Component, OnInit } from '@angular/core';
import { Produto } from './models/produto';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProdutoService } from './services/produto.service';

@Component({
    templateUrl: './produto.component.html',
    providers: [MessageService]
})
export class ProdutoComponent implements OnInit {

    produtoDialog: boolean = false;
    deleteProdutoDialog: boolean = false;
    deleteProdutosDialog: boolean = false;

    produtos: Produto[] = [];
    produto: Produto = {};
    selectedProdutos: Produto[] = [];

    submitted: boolean = false;

    categorias: string[] = ['Pizza', 'Bebida', 'Sobremesa'];

    constructor(private produtoService: ProdutoService, private messageService: MessageService) { }

    ngOnInit() {
        this.getProdutos();
    }

    getProdutos() {
        this.produtoService.getProdutos().then(data => {
            this.produtos = data;
        });
    }

    openNew() {
        this.produto = {};
        this.submitted = false;
        this.produtoDialog = true;
    }

    editProduto(produto: Produto) {
        this.produto = { ...produto };
        this.produtoDialog = true;
    }

    deleteProduto(produto: Produto) {
        this.produto = { ...produto };
        this.deleteProdutoDialog = true;
    }

    deleteSelectedProdutos() {
        this.deleteProdutosDialog = true;
    }

    confirmDelete() {
        this.deleteProdutoDialog = false;
        this.produtoService.deleteProduto(this.produto.id!).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto excluido', life: 3000 });
            this.getProdutos();
            this.produto = {};
        });
    }

    confirmDeleteSelected() {
        this.deleteProdutosDialog = false;
        const exclusoes = this.selectedProdutos.map(p => this.produtoService.deleteProduto(p.id!));
        Promise.all(exclusoes).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produtos excluidos', life: 3000 });
            this.getProdutos();
            this.selectedProdutos = [];
        });
    }

    hideDialog() {
        this.produtoDialog = false;
        this.submitted = false;
    }

    saveProduto() {
        this.submitted = true;

    if (this.produto.nome && this.produto.categoria && this.produto.preco && this.produto.descricao) {            if (this.produto.id) {
                this.produtoService.updateProduto(this.produto).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado', life: 3000 });
                    this.getProdutos();
                });
            } else {
                this.produtoService.saveProduto(this.produto).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto criado', life: 3000 });
                    this.getProdutos();
                });
            }
            this.produtoDialog = false;
            this.produto = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}