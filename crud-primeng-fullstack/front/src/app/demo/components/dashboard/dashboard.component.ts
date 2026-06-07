import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    // Totais (cards do topo).
    totalProdutos: number = 0;
    totalClientes: number = 0;
    totalPedidos: number = 0;
    faturamento: number = 0;

    // Dados dos graficos.
    statusData: any;
    maisPedidosData: any;
    faturamentoData: any;
    categoriaData: any;
    chartOptions: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        const headers = new HttpHeaders({
            "Authorization": "Bearer " + localStorage.getItem("token")
        });

        // Opcoes visuais comuns aos graficos.
        this.chartOptions = {
            plugins: { legend: { labels: { color: '#495057' } } },
            scales: {
                x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
                y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
            }
        };

        // Produtos: conta o total e monta o grafico por categoria.
        this.http.get<any>(environment.baseUrl + "/produtos", { headers })
            .subscribe(res => {
                const produtos = res.produtos || [];
                this.totalProdutos = produtos.length;
                this.montarGraficoCategoria(produtos);
            });

        // Clientes: so o total.
        this.http.get<any>(environment.baseUrl + "/clientes", { headers })
            .subscribe(res => this.totalClientes = (res.clientes || []).length);

        // Pedidos: total, faturamento e os graficos de status, mais pedidos e faturamento por dia.
        this.http.get<any>(environment.baseUrl + "/pedidos", { headers })
            .subscribe(res => {
                const pedidos = res.pedidos || [];
                this.totalPedidos = pedidos.length;
                this.faturamento = pedidos.reduce((s: number, p: any) => s + (p.total || 0), 0);
                this.montarGraficoStatus(pedidos);
                this.montarGraficoMaisPedidos(pedidos);
                this.montarGraficoFaturamento(pedidos);
            });
    }

    // Pedidos agrupados por status (rosca).
    montarGraficoStatus(pedidos: any[]) {
        const contagem: any = {};
        pedidos.forEach(p => {
            const s = p.status || 'Sem status';
            contagem[s] = (contagem[s] || 0) + 1;
        });
        this.statusData = {
            labels: Object.keys(contagem),
            datasets: [{
                data: Object.values(contagem),
                backgroundColor: ['#F0A800', '#42A5F5', '#AB47BC', '#66BB6A', '#EC407A']
            }]
        };
    }

    // Produtos mais pedidos: soma as quantidades nos itens de todos os pedidos (top 5).
    montarGraficoMaisPedidos(pedidos: any[]) {
        const contagem: any = {};
        pedidos.forEach(p => {
            (p.itens || []).forEach((item: any) => {
                const nome = item.nome || 'Produto';
                contagem[nome] = (contagem[nome] || 0) + (item.quantidade || 0);
            });
        });
        const ordenado = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]).slice(0, 5);
        this.maisPedidosData = {
            labels: ordenado,
            datasets: [{
                label: 'Quantidade pedida',
                data: ordenado.map(nome => contagem[nome]),
                backgroundColor: '#E8132B'
            }]
        };
    }

    // Faturamento somado por dia (linha).
    montarGraficoFaturamento(pedidos: any[]) {
        const porDia: any = {};
        pedidos.forEach(p => {
            const dia = (p.data || 'Sem data').split(' ')[0];
            porDia[dia] = (porDia[dia] || 0) + (p.total || 0);
        });
        const dias = Object.keys(porDia);
        this.faturamentoData = {
            labels: dias,
            datasets: [{
                label: 'Faturamento (R$)',
                data: dias.map(d => porDia[d]),
                borderColor: '#E8132B',
                backgroundColor: 'rgba(232,19,43,0.2)',
                fill: true,
                tension: 0.3
            }]
        };
    }

    // Produtos agrupados por categoria (rosca).
    montarGraficoCategoria(produtos: any[]) {
        const contagem: any = {};
        produtos.forEach(p => {
            const c = p.categoria || 'Sem categoria';
            contagem[c] = (contagem[c] || 0) + 1;
        });
        this.categoriaData = {
            labels: Object.keys(contagem),
            datasets: [{
                data: Object.values(contagem),
                backgroundColor: ['#E8132B', '#F0A800', '#42A5F5', '#66BB6A', '#AB47BC']
            }]
        };
    }
}