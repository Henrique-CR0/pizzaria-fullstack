// Pac Pizzaria - Tela de Clientes (CRUD + ViaCEP + IBGE) - Henrique Carneiro
// Tela de CRUD de Clientes, com ViaCEP e IBGE
import { Component, OnInit } from '@angular/core';
import { Cliente } from './models/cliente';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from './services/cliente.service';

@Component({
    templateUrl: './cliente.component.html',
    providers: [MessageService]
})
export class ClienteComponent implements OnInit {

    clienteDialog: boolean = false;
    deleteClienteDialog: boolean = false;
    deleteClientesDialog: boolean = false;

    clientes: Cliente[] = [];
    cliente: Cliente = {};
    selectedClientes: Cliente[] = [];

    submitted: boolean = false;
    cols: any[] = [{field:'id',header:'Id'},{field:'nomeCompleto',header:'Nome'},{field:'telefone',header:'Telefone'},{field:'cidade',header:'Cidade'},{field:'estado',header:'UF'},{field:'tipoEndereco',header:'Favorito'}];
    
    // Listas vindas do IBGE para os dropdowns.
    estados: any[] = [];
    cidades: any[] = [];

    constructor(private clienteService: ClienteService, private messageService: MessageService) { }

    ngOnInit() {
        this.getClientes();
        this.carregarEstados();
    }

    // Carrega a lista de clientes do backend.
    getClientes() {
        this.clienteService.getClientes().then(data => {
            this.clientes = data;
        });
    }

    // Carrega os estados do IBGE (uma vez).
    carregarEstados() {
        this.clienteService.getEstados().then(data => {
            this.estados = data || [];
        });
    }

    // Quando troca o estado, busca as cidades daquele estado.
    onEstadoChange() {
        this.cliente.cidade = undefined;
        if (this.cliente.estado) {
            this.clienteService.getCidades(this.cliente.estado).then(data => {
                this.cidades = data || [];
            });
        }
    }

    // Busca o endereco automaticamente pelo CEP usando a API ViaCEP - Henrique Carneiro
    buscarCep() {
        const cep = (this.cliente.cep || '').replace(/\D/g, '');
        if (cep.length !== 8) {
            return;
        }
        this.clienteService.buscarCep(cep).then((dados: any) => {
            if (dados.erro) {
                this.messageService.add({ severity: 'warn', summary: 'CEP', detail: 'CEP nao encontrado', life: 3000 });
                return;
            }
            this.cliente.endereco = dados.logradouro;
            this.cliente.bairro = dados.bairro;
            this.cliente.estado = dados.uf;
            // Carrega as cidades do estado retornado e marca a cidade do CEP.
            if (dados.uf) {
                this.clienteService.getCidades(dados.uf).then(cidades => {
                    this.cidades = cidades || [];
                    this.cliente.cidade = dados.localidade;
                });
            }
        });
    }

    openNew() {
        this.cliente = {};
        this.cidades = [];
        this.submitted = false;
        this.clienteDialog = true;
    }

    editCliente(cliente: Cliente) {
        this.cliente = { ...cliente };
        // Carrega as cidades do estado do cliente para o dropdown mostrar.
        if (this.cliente.estado) {
            this.clienteService.getCidades(this.cliente.estado).then(data => {
                this.cidades = data || [];
            });
        }
        this.clienteDialog = true;
    }

    deleteCliente(cliente: Cliente) {
        this.cliente = { ...cliente };
        this.deleteClienteDialog = true;
    }

    deleteSelectedClientes() {
        this.deleteClientesDialog = true;
    }

    confirmDelete() {
        this.deleteClienteDialog = false;
        this.clienteService.deleteCliente(this.cliente.id!).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente excluido', life: 3000 });
            this.getClientes();
            this.cliente = {};
        });
    }

    confirmDeleteSelected() {
        this.deleteClientesDialog = false;
        const exclusoes = this.selectedClientes.map(c => this.clienteService.deleteCliente(c.id!));
        Promise.all(exclusoes).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Clientes excluidos', life: 3000 });
            this.getClientes();
            this.selectedClientes = [];
        });
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    // Com id -> atualiza (PUT). Sem id -> cria (POST). Depois recarrega.
    saveCliente() {
        this.submitted = true;
        if (this.cliente.nomeCompleto && this.cliente.telefone && this.cliente.cep && this.cliente.endereco && this.cliente.numero && this.cliente.bairro && this.cliente.estado && this.cliente.cidade && this.cliente.tipoEndereco) {
            if (this.cliente.id) {
                this.clienteService.updateCliente(this.cliente).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado', life: 3000 });
                    this.getClientes();
                });
            } else {
                this.clienteService.saveCliente(this.cliente).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente criado', life: 3000 });
                    this.getClientes();
                });
            }
            this.clienteDialog = false;
            this.cliente = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}