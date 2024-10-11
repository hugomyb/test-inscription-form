const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

// Vérifie la connexion
pool.connect((err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données PostgreSQL:', err);
    } else {
        console.log('Connecté à la base de données PostgreSQL.');

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            nom VARCHAR(255),
            prenom VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            date_naissance DATE,
            ville VARCHAR(255),
            code_postal VARCHAR(10)
        );
        `;

        pool.query(createTableQuery, (err, res) => {
            if (err) {
                console.error('Erreur lors de la création de la table:', err);
            } else {
                console.log('Table "users" vérifiée ou créée avec succès.');
            }
        });
    }
});

module.exports = pool;