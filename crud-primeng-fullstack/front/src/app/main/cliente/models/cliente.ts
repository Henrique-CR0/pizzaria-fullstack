// Modelo de dados de um Cliente. - [Henrique]
export interface Cliente {
    id?: number;
    nomeCompleto?: string;
    telefone?: string;
    cep?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    pontoReferencia?: string;
    tipoEndereco?: string;
}