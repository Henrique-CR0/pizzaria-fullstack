// Pac Pizzaria - Tela de Pedidos (CRUD, calcula o total) - Lucas Vieitez
// Tela de CRUD de Pedidos: escolhe cliente, adiciona produtos e calcula o total.
import { Component, OnInit } from '@angular/core';
import { Pedido } from './models/pedido';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PedidoService } from './services/pedido.service';

@Component({
    templateUrl: './pedido.component.html',
    providers: [MessageService]
})
export class PedidoComponent implements OnInit {

    pedidoDialog: boolean = false;
    deletePedidoDialog: boolean = false;
    deletePedidosDialog: boolean = false;

    pedidos: Pedido[] = [];
    pedido: Pedido = { itens: [], total: 0, status: 'Pendente' };
    selectedPedidos: Pedido[] = [];

    submitted: boolean = false;

    // Listas para os dropdowns de cliente e produto.
    clientes: any[] = [];
    produtos: any[] = [];

    // Cliente escolhido (objeto inteiro) e o item que esta sendo montado.
    clienteSelecionado: any = null;
    produtoSelecionado: any = null;
    quantidade: number = 1;

    // Limite realista de unidades por item (evita totais absurdos por erro de digitacao).
    // Baseado na pratica de pedidos: mesmo um evento grande de um so tipo de pizza nao passa disso.
    quantidadeMaxima: number = 100;

    // Opcoes de status do pedido.
    statusOptions: string[] = ['Pendente', 'Em preparo', 'Saiu para entrega', 'Entregue'];

    // Colunas usadas na exportacao do CSV.
    cols: any[] = [
        { field: 'id', header: 'Id' },
        { field: 'clienteNome', header: 'Cliente' },
        { field: 'total', header: 'Total' },
        { field: 'status', header: 'Status' },
        { field: 'data', header: 'Data' }
    ];

    constructor(private pedidoService: PedidoService, private messageService: MessageService) { }

    ngOnInit() {
        this.getPedidos();
        // Carrega clientes e produtos para os campos de selecao.
        this.pedidoService.getClientes().then(data => this.clientes = data || []);
        this.pedidoService.getProdutos().then(data => this.produtos = data || []);
    }

    getPedidos() {
        this.pedidoService.getPedidos().then(data => {
            this.pedidos = data;
        });
    }

    openNew() {
        this.pedido = { itens: [], total: 0, status: 'Pendente' };
        this.clienteSelecionado = null;
        this.produtoSelecionado = null;
        this.quantidade = 1;
        this.submitted = false;
        this.pedidoDialog = true;
    }

    // Adiciona o produto selecionado (com a quantidade) na lista de itens.
    adicionarItem() {
        if (!this.produtoSelecionado || !this.quantidade || this.quantidade < 1) {
            return;
        }
        // Bloqueia quantidade acima do limite por item e avisa o usuario.
        if (this.quantidade > this.quantidadeMaxima) {
            this.messageService.add({
                severity: 'error',
                summary: 'Quantidade acima do limite',
                detail: 'Maximo de ' + this.quantidadeMaxima + ' unidades por item.',
                life: 4000
            });
            return;
        }
        if (!this.pedido.itens) {
            this.pedido.itens = [];
        }
        this.pedido.itens.push({
            produtoId: this.produtoSelecionado.id,
            nome: this.produtoSelecionado.nome,
            preco: this.produtoSelecionado.preco,
            quantidade: this.quantidade
        });
        this.calcularTotal();
        this.produtoSelecionado = null;
        this.quantidade = 1;
    }

    // Remove um item da lista pelo indice.
    removerItem(index: number) {
        if (this.pedido.itens) {
            this.pedido.itens.splice(index, 1);
            this.calcularTotal();
        }
    }

    // Calcula o total do pedido (preco x quantidade de cada item) - Lucas Vieitez
    calcularTotal() {
        let soma = 0;
        for (const item of (this.pedido.itens || [])) {
            soma += (item.preco || 0) * (item.quantidade || 0);
        }
        this.pedido.total = soma;
    }

    editPedido(pedido: Pedido) {
        this.pedido = { ...pedido, itens: [...(pedido.itens || [])] };
        this.clienteSelecionado = this.clientes.find(c => c.id === pedido.clienteId) || null;
        this.pedidoDialog = true;
    }

    deletePedido(pedido: Pedido) {
        this.pedido = { ...pedido };
        this.deletePedidoDialog = true;
    }

    deleteSelectedPedidos() {
        this.deletePedidosDialog = true;
    }

    confirmDelete() {
        this.deletePedidoDialog = false;
        this.pedidoService.deletePedido(this.pedido.id!).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido excluido', life: 3000 });
            this.getPedidos();
            this.pedido = { itens: [], total: 0, status: 'Pendente' };
        });
    }

    confirmDeleteSelected() {
        this.deletePedidosDialog = false;
        const exclusoes = this.selectedPedidos.map(p => this.pedidoService.deletePedido(p.id!));
        Promise.all(exclusoes).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedidos excluidos', life: 3000 });
            this.getPedidos();
            this.selectedPedidos = [];
        });
    }

    hideDialog() {
        this.pedidoDialog = false;
        this.submitted = false;
    }

    // Salva o pedido: exige cliente e ao menos 1 item.
    savePedido() {
        this.submitted = true;
        if (this.clienteSelecionado && this.pedido.itens && this.pedido.itens.length > 0) {
            // Guarda final: nenhum item pode passar do limite por item (protege ate pedidos editados).
            const itemAcimaDoLimite = this.pedido.itens.find(it => (it.quantidade || 0) > this.quantidadeMaxima);
            if (itemAcimaDoLimite) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Quantidade acima do limite',
                    detail: 'Ha um item com mais de ' + this.quantidadeMaxima + ' unidades. Ajuste antes de salvar.',
                    life: 4000
                });
                return;
            }
            this.pedido.clienteId = this.clienteSelecionado.id;
            this.pedido.clienteNome = this.clienteSelecionado.nomeCompleto;
            if (!this.pedido.data) {
                this.pedido.data = new Date().toLocaleString('pt-BR');
            }
            if (this.pedido.id) {
                this.pedidoService.updatePedido(this.pedido).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido atualizado', life: 3000 });
                    this.getPedidos();
                });
            } else {
                this.pedidoService.savePedido(this.pedido).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido criado', life: 3000 });
                    this.getPedidos();
                });
            }
            this.pedidoDialog = false;
            this.pedido = { itens: [], total: 0, status: 'Pendente' };
            this.clienteSelecionado = null;
        }
    }

    // Define a cor da badge conforme o status do pedido (igual ao dashboard).
    statusColor(status: any): string {
        if (status === 'Entregue') return '#43A047';
        if (status === 'Pendente') return '#F0A800';
        if (status === 'Em preparo') return '#1E88E5';
        if (status === 'Saiu para entrega') return '#7E57C2';
        return '#9E9E9E';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}