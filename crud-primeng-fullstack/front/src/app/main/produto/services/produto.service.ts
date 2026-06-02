import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProdutoService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
    });

    urlApi = environment.baseUrl + "/produtos";

    getProdutos() {
        return this.http.get<any>(this.urlApi, { headers: this.headers })
            .toPromise()
            .then(res => res.produtos as Produto[]);
    }

    getProdutoById(id: number) {
        return this.http.get<any>(this.urlApi + "/" + id, { headers: this.headers })
            .toPromise()
            .then(res => res.produto as Produto);
    }

    saveProduto(produto: Produto) {
        return this.http.post<any>(this.urlApi, produto, { headers: this.headers })
            .toPromise()
            .then(res => res.produto as Produto);
    }

    deleteProduto(id: number) {
        return this.http.delete<any>(this.urlApi + "/" + id, { headers: this.headers })
            .toPromise()
            .then(res => res);
    }

    updateProduto(produto: Produto) {
        return this.http.put<any>(this.urlApi + "/" + produto.id, produto, { headers: this.headers })
            .toPromise()
            .then(res => res);
    }
}