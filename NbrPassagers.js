const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'connexion' 
});


db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

router.get('/nbrPassagers', (req, res) => {
    const sql = "SELECT site_selectionne AS site, COUNT(*) AS nbrPassagers FROM reservations GROUP BY site_selectionne";

    console.log("📡 Exécution de la requête SQL...");

    db.query(sql, (error, results) => {
        if (error) {
            console.error("❌ Erreur SQL:", error);
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        } else {
            console.log("✅ Résultat SQL:", results);
            res.json(results);
        }
    });
});
module.exports = router;
