const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'fatou',
  host: 'localhost',
  database: 'dall_diamm_api',
  password: 'fatou',
  port: 5432, // default PostgreSQL port
});


const http = require('http');
// appel de notre application express
const app = require('./app');
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app)

server.listen(process.env.PORT || 3000);