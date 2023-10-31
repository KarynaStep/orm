const http = require('http');
const app = require('./app.js');

const post = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(post, () => { console.log('server started at port =', port) });

