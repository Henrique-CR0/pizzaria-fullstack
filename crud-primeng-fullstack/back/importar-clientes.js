// Cadastra varios clientes de uma vez a partir de um arquivo JSON.
const fs = require('fs');

const API = 'http://localhost:3000';
const USUARIO = 'henriquecr00';   
const SENHA = '135790Hcr!';       

async function main() {
    // 1) login para pegar o token
    const respLogin = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: USUARIO, password: SENHA })
    });
    const dadosLogin = await respLogin.json();
    const token = dadosLogin.token || dadosLogin.accessToken;
    if (!token) {
        console.log('Nao consegui logar. Resposta do servidor:', dadosLogin);
        return;
    }
    console.log('Login OK.');

    // le o arquivo de clientes
    const conteudo = fs.readFileSync('clientes.json', 'utf8');
    const dados = JSON.parse(conteudo);
    const clientes = dados.clientes || dados;

    // cadastra um por um
    let ok = 0;
    for (const cliente of clientes) {
        const corpo = { ...cliente };
        delete corpo.id; 
        const resp = await fetch(API + '/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(corpo)
        });
        if (resp.ok) {
            ok++;
        } else {
            console.log('Falhou:', cliente.nomeCompleto, '- status', resp.status);
        }
    }
    console.log('Cadastrados ' + ok + ' de ' + clientes.length + ' clientes.');
}

main();