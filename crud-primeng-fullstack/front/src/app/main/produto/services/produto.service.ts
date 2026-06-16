// Pac Pizzaria - Servico de Produtos (API) - Lucas Vieitez
// Servico do Produto: CRUD de produtos (comunicacao via fetch).
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProdutoService {

    urlApi = environment.baseUrl + "/produtos";

    private getHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        };
    }

    getProdutos() {
        return fetch(this.urlApi, { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.produtos as Produto[]);
    }

    getProdutoById(id: number) {
        return fetch(this.urlApi + "/" + id, { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.produto as Produto);
    }

    saveProduto(produto: Produto) {
        return fetch(this.urlApi, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(produto)
        }).then(res => res.ok);
    }

    updateProduto(produto: Produto) {
        return fetch(this.urlApi + "/" + produto.id, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(produto)
        }).then(res => res.ok);
    }

    deleteProduto(id: number) {
        return fetch(this.urlApi + "/" + id, {
            method: "DELETE",
            headers: this.getHeaders()
        }).then(res => res.ok);
    }
}