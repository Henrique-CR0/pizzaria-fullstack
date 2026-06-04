// Servico do Cliente: fala com nosso backend (com token) e com ViaCEP/IBGE (publicos). - [Henrique]
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient) { }

    // Token do login, enviado nas rotas protegidas do nosso backend.
    headers = new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
    });

    urlApi = environment.baseUrl + "/clientes";

    // API publica do IBGE (estados e cidades).
    ibgeUrl = "https://servicodados.ibge.gov.br/api/v1/localidades";

    // ---- CRUD no nosso backend ----
    getClientes() {
        return this.http.get<any>(this.urlApi, { headers: this.headers })
            .toPromise()
            .then(res => res.clientes as Cliente[]);
    }

    getClienteById(id: number) {
        return this.http.get<any>(this.urlApi + "/" + id, { headers: this.headers })
            .toPromise()
            .then(res => res.cliente as Cliente);
    }

    saveCliente(cliente: Cliente) {
        return this.http.post<any>(this.urlApi, cliente, { headers: this.headers })
            .toPromise()
            .then(res => res.cliente as Cliente);
    }

    deleteCliente(id: number) {
        return this.http.delete<any>(this.urlApi + "/" + id, { headers: this.headers })
            .toPromise()
            .then(res => res);
    }

    updateCliente(cliente: Cliente) {
        return this.http.put<any>(this.urlApi + "/" + cliente.id, cliente, { headers: this.headers })
            .toPromise()
            .then(res => res);
    }

    // ---- APIs externas ----
    // ViaCEP: busca o endereco pelo CEP.
    buscarCep(cep: string) {
        return this.http.get<any>(environment.viaCepUrl + "/" + cep + "/json/")
            .toPromise();
    }

    // IBGE: lista os estados em ordem alfabetica.
    getEstados() {
        return this.http.get<any[]>(this.ibgeUrl + "/estados?orderBy=nome")
            .toPromise();
    }

    // IBGE: lista as cidades de um estado (pela sigla, ex: PE).
    getCidades(uf: string) {
        return this.http.get<any[]>(this.ibgeUrl + "/estados/" + uf + "/municipios")
            .toPromise();
    }
}