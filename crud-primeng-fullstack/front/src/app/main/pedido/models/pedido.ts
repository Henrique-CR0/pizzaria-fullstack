// Modelo do Pedido e de cada Item do pedido. - [Lucas]
export interface ItemPedido {
    produtoId?: number;
    nome?: string;
    preco?: number;
    quantidade?: number;
}

export interface Pedido {
    id?: number;
    clienteId?: number;
    clienteNome?: string;
    itens?: ItemPedido[];
    total?: number;
    status?: string;
    data?: string;
}