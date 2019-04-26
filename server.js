const express = require('express');
const debug = require('debug')('node:server');
const http = require('http');

const app = express();
const port = normalizePort(process.env.PORTc||  3000);

app.set('port', port);

// Criando um server na porta 3000
const server = http.createServer(app);
// Arquivo de rota
const router = express.Router();

// Criando uma rota
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node API',
    version: '0.0.1'
  });
});

app.get('/', route);

server.listen(port);
server.on('error', onError);
server.on('Listening', onListening);
console.log(`API rodando na porta ${port}`);

// Verifica se há outras portas disponiveis. Caso não, utiliza a porta 3000
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
}

// Função para tratar erro no servidor
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe' + port :
    'Port' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    
    default:
      throw error;
  }
}

// Iniciando o debug
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'Pipe' + addr :
    'Port' + addr.port;

  debug('Listening on ' + bind);
}