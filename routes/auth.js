const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();
const autenticar = require('./autenticar')
const { MongoClient } = require('mongodb');
const { HoraAtual, LogEvent } = require('../funcGlobal')
require('dotenv').config();

// MongoDB config
const uri = 'mongodb://diogo:Diogo.908@72.60.1.190:27017/admin';
const client = new MongoClient(uri);
const dbName = 'produtosdb';    

// Função interna para registrar o token
async function registrarTokenUsado(token) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const colecao = db.collection('tokens_usados');

    await colecao.insertOne({
      token: token,
      usado_em: new Date() // campo para TTL
    });

    return [true];
  } catch (erro) {
    return [false, erro];
  } finally {
    await client.close();
  }
}

router.post('/register', async (req, res) => {
  LogEvent(`[${HoraAtual()}][REGISTER][POST] - Tentativa de registro do usuário: ${req.body.email}`);
  const { nome, email, senha } = req.body;
  try {
    const hashed = await bcrypt.hash(senha, 10);
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashed]);
    conn.release();
    LogEvent(`[${HoraAtual()}][REGISTER][POST] - Usuário registrado com sucesso: ${email}`);
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    LogEvent(`[${HoraAtual()}][REGISTER][POST][ERROR] - Erro ao registrar usuário: ${email} - ${err.message}`);
    res.status(500).json({ erro: err.message });
  }
});

router.post('/login', async (req, res) => {
  LogEvent(`[${HoraAtual()}][LOGIN][POST] - Tentativa de login: ${req.body.email}`);
  const { email, senha } = req.body;
  try {
    const conn = await pool.getConnection();
    const [user] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();

    if (!user) {
      LogEvent(`[${HoraAtual()}][LOGIN][POST] - Usuário não encontrado: ${email}`);
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const valido = await bcrypt.compare(senha, user.senha);
    if (!valido) {
      LogEvent(`[${HoraAtual()}][LOGIN][POST] - Senha incorreta para usuário: ${email}`);
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    LogEvent(`[${HoraAtual()}][LOGIN][POST] - Login bem sucedido: ${email}`);
    res.json({ tokenUS: token, username: `${user.nome}` });
  } catch (err) {
    LogEvent(`[${HoraAtual()}][LOGIN][POST][ERROR] - Erro no login do usuário ${email} - ${err.message}`);
    res.status(500).json({ erro: err.message });
  }
});

router.post('/logout', autenticar, async (req, res) => {
  LogEvent(`[${HoraAtual()}][LOGOUT][POST] - Logout solicitado pelo usuário ID: ${req.userId}`);
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    LogEvent(`[${HoraAtual()}][LOGOUT][POST] - Falha: Token não fornecido para logout do usuário ID: ${req.userId}`);
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const resp = await registrarTokenUsado(token);

    if (!resp[0]) {
      LogEvent(`[${HoraAtual()}][LOGOUT][POST][ERROR] - Erro ao registrar token usado no logout do usuário ID: ${req.userId} - ${resp[1].message}`);
      return res.status(500).json({ erro: resp[1].message });
    }

    LogEvent(`[${HoraAtual()}][LOGOUT][POST] - Logout realizado com sucesso para usuário ID: ${req.userId}`);
    return res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
  } catch (error) {
    LogEvent(`[${HoraAtual()}][LOGOUT][POST][ERROR] - Erro inesperado no logout do usuário ID: ${req.userId} - ${error.message}`);
    return res.status(500).json({ erro: 'Erro inesperado no logout.' });
  }
});

module.exports = router;