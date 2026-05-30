// Modelo "Produto": pizzas, bebidas e sobremesas.
// Mesmo padrao do modelo Usuario - cada campo vira uma coluna. - [Equipe Pizzaria]

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true, // descricao e opcional
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // so aceita uma dessas tres categorias
      isIn: [['Pizza', 'Bebida', 'Sobremesa']],
    },
  },
});

module.exports = Produto;
