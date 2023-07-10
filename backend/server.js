const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'fatou',
  host: 'localhost',
  database: 'dall_diamm_api',
  password: 'fatou',
  port: 5432, // default PostgreSQL port
});

// async function insertData() {
//   try {
//     const jsonData = fs.readFileSync('donnees_electromenager.json', 'utf8');
//     const data = JSON.parse(jsonData);

//     const query = 'INSERT INTO electromenager (nom_ap, emplacement, prix_ap, img_ap) VALUES ($1, $2, $3, $4)';
//     for (const item of data) {
//       const values = [item.nom, item.location, item.prix, item.image];
//       await pool.query(query, values);
//     }

//     console.log('Data inserted successfully');
//   } catch (err) {
//     console.error('Error inserting data:', err);
//   } finally {
//     pool.end();
//   }
// }

// insertData();



const http = require('http');
// appel de notre application express
const app = require('./app');
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app)

server.listen(process.env.PORT || 3000);