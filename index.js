const express = require('express');
const cors = require('cors'); // importa o pacote CORS
const app = express();

const authRoutes = require('./routes/auth');
const produtoRoutes = require('./routes/produtos');
const { HoraAtual, LogEvent } = require('./funcGlobal');

// Permitir requisições de qualquer origem (ou só do seu frontend)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'userip'],
}));

app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);

app.get("/valid", (req, res) => {
  res.json({ valid: true });
});

app.listen(3000, () => {
  LogEvent(`[${HoraAtual()}] API rodando em http://localhost:3000`);
});