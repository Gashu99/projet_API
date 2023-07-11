const { Pool } = require('pg');
const bodyParser = require('body-parser');
const fs = require('fs');



const pool = new Pool({
  user: 'fatou',
  host: 'localhost',
  database: 'dall_diamm_api',
  password: 'fatou',
  port: 5432, // default PostgreSQL port
});

const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(function(req, res, next) {
    console.log(`new connection detected: \nip address: \n${req.ip}`);
    console.log(`URL: ${req.url}`)
    console.log(`Method: ${req.method}`)
    console.log(`Date: ${Date()}`)
    console.log(` `)
    next();
  });



const l = ['electronique', 'electromenager', 'luminaire'];

const idColumns = {
  electronique: "id_e",
  electromenager: "id_ap",
  luminaire: "id_l"
};

for (let i of l) {
  // Route pour récupérer toutes les données de la catégorie
  app.get(`/${i}`, async (req, res) => {
    try {
      const query = `SELECT * FROM ${i}`;
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Route générique pour récupérer les données de la catégorie en fonction de l'ID
  app.get(`/${i}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const idColumn = idColumns[i];
      const query = `SELECT * FROM ${i} WHERE ${idColumn} = $1`;
      const values = [id];
      const { rows } = await pool.query(query, values);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
}



app.use(express.json()); // Pour analyser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les données du formulaire


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const data = {
  nom: "ordinateur",
  prix: "240000 FCFA",
  image: "image"
};

// Route POST pour la table "electronique"
app.post('/electronique', async (req, res) => {
  try {
    const { nom, prix, image } = req.body;

    const query = `INSERT INTO electronique (nom, prix, image) VALUES ($1, $2, $3)`;
    const values = [nom, prix, image];

    await pool.query(query, values);

    res.json({ message: 'Données insérées avec succès dans la table "electronique"' });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.use((req, res) => {

    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });
 



module.exports = app;