const http = require('http');
const app = require('./App')
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)
server.listen(PORT); 
