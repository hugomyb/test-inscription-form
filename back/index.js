const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/users', (req, res) => {
    const { nom, prenom, email, dateNaissance, ville, codePostal } = req.body;

    const query = `
        INSERT INTO users (nom, prenom, email, date_naissance, ville, code_postal)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    db.query(query, [nom, prenom, email, dateNaissance, ville, codePostal])
        .then(result => {
            const userId = result.rows[0].id;
            res.status(201).json({ message: 'Utilisateur créé avec succès', userId });
        })
        .catch(err => {
            console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
        });
});

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users')
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
        });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Le serveur backend est en cours d'exécution sur le port ${PORT}`);
});
