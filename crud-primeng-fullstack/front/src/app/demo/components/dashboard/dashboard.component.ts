// Pac Pizzaria - Dashboard (indicadores e graficos) - Henrique Carneiro e Lucas Vieitez
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    totalProdutos: number = 0;
    totalClientes: number = 0;
    totalPedidos: number = 0;
    faturamento: number = 0;

    ultimosPedidos: any[] = [];

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

        this.chartOptions = {
            plugins: { legend: { labels: { color: '#495057' } } },
            scales: {
                x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
                y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
            }
        };

        this.http.get<any>(environment.baseUrl + "/produtos", { headers })
            .subscribe(res => {
                const produtos = res.produtos || [];
                this.totalProdutos = produtos.length;
                this.montarGraficoCategoria(produtos);
            });

        this.http.get<any>(environment.baseUrl + "/clientes", { headers })
            .subscribe(res => this.totalClientes = (res.clientes || []).length);

        this.http.get<any>(environment.baseUrl + "/pedidos", { headers })
            .subscribe(res => {
                const pedidos = res.pedidos || [];
                this.totalPedidos = pedidos.length;
                this.faturamento = pedidos.reduce((s: number, p: any) => s + (p.total || 0), 0);
                this.ultimosPedidos = pedidos.slice().sort((a: any, b: any) => b.id - a.id).slice(0, 5);
                this.montarGraficoStatus(pedidos);
                this.montarGraficoMaisPedidos(pedidos);
                this.montarGraficoFaturamento(pedidos);
            });
    }

    // Cor de cada status (usada no selo da tabela e no grafico de status).
    statusColor(status: string) {
        if (status === 'Entregue') {
            return '#43A047';
        }
        if (status === 'Pendente') {
            return '#F0A800';
        }
        if (status === 'Em preparo') {
            return '#1E88E5';
        }
        if (status === 'Saiu para entrega') {
            return '#7E57C2';
        }
        return '#9E9E9E';
    }

    // Cor de cada categoria (Pizza puxa pro vermelho de tomate).
    corCategoria(categoria: string) {
        if (categoria === 'Pizza') {
            return '#E0492F';
        }
        if (categoria === 'Bebida') {
            return '#1E88E5';
        }
        if (categoria === 'Sobremesa') {
            return '#F0A800';
        }
        return '#9E9E9E';
    }

    montarGraficoStatus(pedidos: any[]) {
        const contagem: any = {};
        pedidos.forEach(p => {
            const s = p.status || 'Sem status';
            contagem[s] = (contagem[s] || 0) + 1;
        });
        const labels = Object.keys(contagem);
        this.statusData = {
            labels: labels,
            datasets: [{
                data: Object.values(contagem),
                backgroundColor: labels.map(s => this.statusColor(s))
            }]
        };
    }

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
                backgroundColor: '#D9A441'
            }]
        };
    }

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
                borderColor: '#D9A441',
                backgroundColor: 'rgba(217,164,65,0.2)',
                fill: true,
                tension: 0.3
            }]
        };
    }

    montarGraficoCategoria(produtos: any[]) {
        const contagem: any = {};
        produtos.forEach(p => {
            const c = p.categoria || 'Sem categoria';
            contagem[c] = (contagem[c] || 0) + 1;
        });
        const labels = Object.keys(contagem);
        this.categoriaData = {
            labels: labels,
            datasets: [{
                data: Object.values(contagem),
                backgroundColor: labels.map(c => this.corCategoria(c))
            }]
        };
    }
}