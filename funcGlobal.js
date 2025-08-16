const fs = require('fs').promises;

function HoraAtual() {
  const agora = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const ano = agora.getFullYear();
  const mes = pad(agora.getMonth() + 1); // meses começam em 0
  const dia = pad(agora.getDate());
  const hora = pad(agora.getHours());
  const minuto = pad(agora.getMinutes());
  const segundo = pad(agora.getSeconds());

  return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}

async function LogEvent(message) {
    const logLine = `${message}\n`;

    console.log(logLine.trim()); // imprime no console
    try {
        await fs.appendFile("./log-server.log", logLine);
    } catch (err) {
        console.error("Erro ao escrever no log:", err);
    }
}

module.exports = { HoraAtual, LogEvent };