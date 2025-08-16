const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://diogo:Diogo.908@72.60.1.190:27017/admin';
const client = new MongoClient(uri);
const dbName = 'produtosdb';
const { HoraAtual, LogEvent } = require('../funcGlobal')

// Função para verificar token JWT
function verificarTokenJWT(token) {
  if (!token) throw new Error('Token ausente');
  return jwt.verify(token, process.env.JWT_SECRET); // pode lançar erro
}

// Função para verificar se token já foi usado (está no MongoDB)
async function tokenJaUsado(token) {
  try {
    client.connect();
    const db = client.db(dbName);
    const colecao = db.collection('tokens_usados');
    
    const res = await colecao.findOne({ token });
    return !!res; // true se token está usado
  } catch(err) {
    LogEvent(`[${HoraAtual()}] error in tokenJaUsado: ${err}`);
    return false;
  }
}

// Middleware principal
async function autenticar(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ erro: 'Token ausente' });
    
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ erro: 'Token ausente' });
    
    // Verifica validade JWT
    const decoded = verificarTokenJWT(token);
    
    //Verifica se token já foi usado
    const usado = await tokenJaUsado(token);
    if (usado) return res.status(403).json({ erro: 'Token já usado ou inválido' });
    LogEvent(`[${HoraAtual()}] verify token in mongodb: ${usado}`)
    
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = autenticar;