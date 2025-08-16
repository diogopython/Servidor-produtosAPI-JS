const { MongoClient } = require('mongodb');
const { HoraAtual, LogEvent } = require("./funcGlobal")

const uri = 'mongodb://localhost:27017'; // URL do MongoDB
const client = new MongoClient(uri);
const dbName = 'produtosdb';

async function registrarTokenUsado(token) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const colecao = db.collection('tokens_usados');

    await colecao.insertOne({
      token: token,
      usado_em: new Date() // usado pelo índice TTL
    });

    return true

  } catch (erro) {
    LogEvent(`[${HoraAtual()}] Erro ao registrar token: erro`);
    return [false, erro];
  } finally {
    await client.close();
  }
}

module.exports = registrarTokenUsado;