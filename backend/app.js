const { Pool } = require('pg');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require ('path')
const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');




const pool = new Pool({
  user: 'fatou',
  host: 'localhost',
  database: 'dall_diamm_api',
  password: 'fatou',
  port: 5432, // default PostgreSQL port
});

const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post(`/utilisateur`, async (req, res) => {
  try {
    const { mail, password } = req.body;
    const postUser = async (mail) => {
      try {
        const query = 'SELECT * FROM utilisateur WHERE email = $1';
        const values = [mail];
        const result = await pool.query(query, values);
        const user = result.rows[0];
        console.log(result.rows[0])
        if (user === undefined) {
          // L'utilisateur n'existe pas
          return null;
        } else {
          return user;
        }
      } catch (error) {
        throw new Error("Une erreur est survenue lors de la récupération des infos de l'utilisateur.");
      }
    };
    const user = await postUser(mail);

    if (user === null) {
      res.status(403).json({ message: "Paire mail / mot de passe incorrect" });
    } else {
      const passwordMatch = user.mot_de_passe ;

      if (passwordMatch != password) {
        res.status(403).json({ message: "Paire mail / mot de passe incorrect" });
      } else {
        // Stocker les informations de session dans le token d'authentification
        const token = jwt.sign({ full_name: user.prenom, role: user.role_id }, 'secret-key', { expiresIn: '1h' });

        // Ajouter le token aux informations renvoyées
        res.status(200).json({ message: "Info utilisateur récupéré avec succès.", user_name: user.prenom, user_role: user.role_id, token: token, user });
      }
    }
  }  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});





// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurer le dossier des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));


// DELETE request for deleting an item
app.delete('/:category/:id', async (req, res) => {
  const category = req.params.category;
  const idColumn = idColumns[category];
  try {
    const id = req.params.id;

    const query = `DELETE FROM ${category} WHERE ${idColumn} = $1`;
    const values = [id];

    await pool.query(query, values);

    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.use((req, res) => {

    res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;