const http = require('http');
const app = require('./app');
require('dotenv').config()

app.set('port', 3000);

const server = http.createServer(app);

server.listen(3000);
