const express = require("express");
const router = express.Router();
const mysql = require('mysql');


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

router.post("/register-user", (req, res) => {
    const { id, nom, prenom, mail, adresse, profileImage } = req.body;

    
    const checkConnexionQuery = "SELECT * FROM connexion WHERE id = ?";
    db.query(checkConnexionQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Erreur serveur", error: err });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "Utilisateur non trouvé dans connexion." });
        }

        
        const insertUserQuery = "INSERT INTO utilisateur (id, nom, prenom, mail, adresse, profileImage) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertUserQuery, [id, nom, prenom, mail, adresse, profileImage], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement", error: err });
            }

            res.json({ success: true, message: "Utilisateur enregistré avec succès." });
        });
    });
});

module.exports = router;
