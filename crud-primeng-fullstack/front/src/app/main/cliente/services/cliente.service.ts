// Servico do Cliente: fala com nosso backend (com token) e com ViaCEP/IBGE (publicos) via fetch.
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ClienteService {

    urlApi = environment.baseUrl + "/clientes";
    // API publica do IBGE (estados e cidades).
    ibgeUrl = "https://servicodados.ibge.gov.br/api/v1/localidades";

    // Token do login, enviado nas rotas protegidas do nosso backend.
    private getHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        };
    }

    // ---- CRUD no nosso backend ----
    getClientes() {
        return fetch(this.urlApi, { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.clientes as Cliente[]);
    }

    getClienteById(id: number) {
        return fetch(this.urlApi + "/" + id, { headers: this.getHeaders() })
            .then(res => res.json())
            .then(res => res.cliente as Cliente);
    }

    saveCliente(cliente: Cliente) {
        return fetch(this.urlApi, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(cliente)
        }).then(res => res.ok);
    }

    updateCliente(cliente: Cliente) {
        return fetch(this.urlApi + "/" + cliente.id, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(cliente)
        }).then(res => res.ok);
    }

    deleteCliente(id: number) {
        return fetch(this.urlApi + "/" + id, {
            method: "DELETE",
            headers: this.getHeaders()
        }).then(res => res.ok);
    }

    // ---- APIs externas (publicas, sem token) ----
    // ViaCEP: busca o endereco pelo CEP.
    buscarCep(cep: string) {
        return fetch(environment.viaCepUrl + "/" + cep + "/json/")
            .then(res => res.json());
    }

    // IBGE: lista os estados em ordem alfabetica.
    getEstados() {
        return fetch(this.ibgeUrl + "/estados?orderBy=nome")
            .then(res => res.json());
    }

    // IBGE: lista as cidades de um estado (pela sigla, ex: PE).
    getCidades(uf: string) {
        return fetch(this.ibgeUrl + "/estados/" + uf + "/municipios")
            .then(res => res.json());
    }
}