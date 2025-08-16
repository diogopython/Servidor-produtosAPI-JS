const axios = require('axios');

const API = 'http://localhost:3000'; // Ajuste se necessário
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0MzQxNTI4LCJleHAiOjE3NTQzNDUxMjh9.RAlEWQUBItEq96tVTSjv-_Ep474kgwRm1IY_NGNm5wA'; 

const produtos = [
  { nome: "Camiseta Básica", preco: 12.50, quantidade: 10 },
  { nome: "Tênis Esportivo", preco: 25.00, quantidade: 5 },
  { nome: "Caneca Personalizada", preco: 7.30, quantidade: 20 },
  { nome: "Relógio Digital", preco: 99.99, quantidade: 2 },
  { nome: "Mochila Escolar", preco: 45.00, quantidade: 15 },
  { nome: "Fone de Ouvido", preco: 19.90, quantidade: 30 },
  { nome: "Smartphone", preco: 35.75, quantidade: 8 },
  { nome: "Óculos de Sol", preco: 60.00, quantidade: 12 },
  { nome: "Cadeira Gamer", preco: 80.25, quantidade: 4 },
  { nome: "Livro de Ficção", preco: 5.00, quantidade: 50 },
  { nome: "Teclado Mecânico", preco: 23.10, quantidade: 7 },
  { nome: "Mouse Sem Fio", preco: 14.99, quantidade: 25 },
  { nome: "Capa para Celular", preco: 8.40, quantidade: 18 },
  { nome: "Lampada LED", preco: 67.00, quantidade: 3 },
  { nome: "Agenda 2025", preco: 12.75, quantidade: 9 },
  { nome: "Bateria Portátil", preco: 90.10, quantidade: 1 },
  { nome: "Jaqueta Jeans", preco: 42.20, quantidade: 14 },
  { nome: "Caixa de Som", preco: 29.99, quantidade: 11 },
  { nome: "Kit de Ferramentas", preco: 33.30, quantidade: 6 },
  { nome: "Bolsa Feminina", preco: 55.55, quantidade: 5 },
  { nome: "Garrafa Térmica", preco: 18.75, quantidade: 22 },
  { nome: "Tênis Casual", preco: 70.00, quantidade: 2 },
  { nome: "Mousepad Gamer", preco: 15.60, quantidade: 17 },
  { nome: "Suéter de Lã", preco: 38.90, quantidade: 10 },
  { nome: "Relógio de Pulso", preco: 27.80, quantidade: 20 },
  { nome: "Carregador USB", preco: 9.99, quantidade: 33 },
  { nome: "Câmera de Segurança", preco: 48.50, quantidade: 7 },
  { nome: "Tablet", preco: 61.00, quantidade: 4 },
  { nome: "Monitor LED", preco: 74.25, quantidade: 3 },
  { nome: "Livro de Receitas", preco: 21.40, quantidade: 16 },
  { nome: "Camiseta Estampada", preco: 11.50, quantidade: 30 },
  { nome: "Bolsa Masculina", preco: 14.20, quantidade: 28 },
  { nome: "Caixa Organizadora", preco: 26.90, quantidade: 9 },
  { nome: "Jogo de Panelas", preco: 39.00, quantidade: 11 },
  { nome: "Monitor Gamer", preco: 52.75, quantidade: 6 },
  { nome: "Smartwatch", preco: 62.10, quantidade: 8 },
  { nome: "Fone Bluetooth", preco: 77.00, quantidade: 3 },
  { nome: "Aspirador de Pó", preco: 88.90, quantidade: 1 },
  { nome: "Camiseta Polo", preco: 16.60, quantidade: 24 },
  { nome: "Tênis de Corrida", preco: 34.30, quantidade: 13 },
  { nome: "Ventilador", preco: 50.00, quantidade: 7 },
  { nome: "Caixa de Som Bluetooth", preco: 69.99, quantidade: 5 },
  { nome: "Agenda Semanal", preco: 24.80, quantidade: 18 },
  { nome: "Copo Térmico", preco: 32.50, quantidade: 12 },
  { nome: "Carteira Masculina", preco: 43.20, quantidade: 9 },
  { nome: "Livro Infantil", preco: 58.90, quantidade: 6 },
  { nome: "Tênis Infantil", preco: 72.00, quantidade: 3 },
  { nome: "Luminária de Mesa", preco: 85.55, quantidade: 2 },
  { nome: "Chinelo", preco: 19.90, quantidade: 21 },
  { nome: "Mochila de Viagem", preco: 40.00, quantidade: 10 }
];

async function cadastrarProdutos() {
  for (const produto of produtos) {
    try {
      const res = await axios.post(`${API}/produtos`, produto, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(`✅ Produto cadastrado: ${produto.nome}`);
    } catch (err) {
      console.error(`❌ Erro ao cadastrar ${produto.nome}:`, err.response?.data?.erro || err.message);
    }
  }
}

cadastrarProdutos();
