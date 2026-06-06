// Servico do Pedido: CRUD de pedidos + busca clientes e produtos para os selects
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PedidoService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
    });

    urlApi = environment.baseUrl + "/pedidos";

    getPedidos() {
        return this.http.get<any>(this.urlApi, { headers: this.headers })
            .toPromise()
            .then(res => res.pedidos as Pedido[]);
    }

    getPedidoById(id: number) {
        return this.http.get<any>(this.urlApi + "/" + id, { headers: this.headers })
            .toPromise()
            .then(res => res.pedido as Pedido);
    }

    savePedido(pedido: Pedido) {
        return this.http.post<any>(this.urlApi, pedido, { headers: this.headers })
            .toPromise()
            .then(res => res.pedido as Pedido);
    }

    deletePedido(id: number) {
        return this.http.delete<any>(this.urlApi + "/" + id, { headers: this.headers })
            .toPromise()
            .then(res => res);
    }

    updatePedido(pedido: Pedido) {
        return this.http.put<any>(this.urlApi + "/" + pedido.id, pedido, { headers: this.headers })
            .toPromise()
            .then(res => res);
    }

    // Busca os clientes (para o select de cliente do pedido).
    getClientes() {
        return this.http.get<any>(environment.baseUrl + "/clientes", { headers: this.headers })
            .toPromise()
            .then(res => res.clientes as any[]);
    }

    // Busca os produtos (para o select de produtos do pedido).
    getProdutos() {
        return this.http.get<any>(environment.baseUrl + "/produtos", { headers: this.headers })
            .toPromise()
            .then(res => res.produtos as any[]);
    }
}