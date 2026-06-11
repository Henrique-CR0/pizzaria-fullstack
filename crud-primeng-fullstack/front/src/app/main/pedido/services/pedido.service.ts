// Servico do Pedido: CRUD de pedidos + busca clientes e produtos para os selects (comunicacao via fetch).
import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PedidoService {

    urlApi = environment.baseUrl + "/pedidos";

    // Monta os cabecalhos com o token atual em cada requisicao.
    private getHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        };
    }

    getPedidos() {
        return fetch(this.urlApi, { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.pedidos as Pedido[]);
    }

    getPedidoById(id: number) {
        return fetch(this.urlApi + "/" + id, { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.pedido as Pedido);
    }

    savePedido(pedido: Pedido) {
        return fetch(this.urlApi, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(pedido)
        }).then(res => res.ok);
    }

    updatePedido(pedido: Pedido) {
        return fetch(this.urlApi + "/" + pedido.id, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(pedido)
        }).then(res => res.ok);
    }

    deletePedido(id: number) {
        return fetch(this.urlApi + "/" + id, {
            method: "DELETE",
            headers: this.getHeaders()
        }).then(res => res.ok);
    }

    // Busca os clientes (para o select de cliente do pedido).
    getClientes() {
        return fetch(environment.baseUrl + "/clientes", { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.clientes as any[]);
    }

    // Busca os produtos (para o select de produtos do pedido).
    getProdutos() {
        return fetch(environment.baseUrl + "/produtos", { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.produtos as any[]);
    }
}