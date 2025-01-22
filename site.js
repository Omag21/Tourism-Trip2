const express = require('express');
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


router.post('/add-site', express.json(), (req, res) => {
    const { name, date_aller, date_retour, duree_sejour, prix_billet, pays } = req.body;

    console.log('Données reçues:', req.body);

    if (!name || !date_aller || !date_retour || !duree_sejour || !prix_billet || !pays) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    const query = 'INSERT INTO site (name, date_aller, date_retour, duree_sejour, prix_billet, pays) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, date_aller, date_retour, duree_sejour, prix_billet, pays], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion:', err);
            return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }

        // Renvoyer les données du site inséré avec son ID
        const insertedSite = {
            id: result.insertId, 
            name,
            date_aller,
            date_retour,
            duree_sejour,
            prix_billet,
            pays,
            devise: 'EUR'
        };
        

        res.json({ success: true, message: 'Site ajouté avec succès', site: insertedSite });
    });
});


router.get('/get-sites', (req, res) => {
    const query = 'SELECT * FROM site';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des sites:', err);
            return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }

        res.json({ success: true, sites: results });
    });
});


router.put('/update-site/:id', express.json(), (req, res) => {
    const siteId = req.params.id;
    const { name, date_aller, date_retour, duree_sejour, prix_billet, pays } = req.body;

    if (!name || !date_aller || !date_retour || !duree_sejour || !prix_billet || !pays) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    const query = `
        UPDATE site 
        SET name = ?, date_aller = ?, date_retour = ?, duree_sejour = ?, prix_billet = ?, pays = ?
        WHERE id = ?`;

    db.query(query, [name, date_aller, date_retour, duree_sejour, prix_billet, pays, siteId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour:', err);
            return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Aucun site trouvé avec cet ID' });
        }

        res.json({ success: true, message: 'Site mis à jour avec succès' });
    });
});

// Suppression d'un site touristique
router.delete('/delete-site/:id', (req, res) => {
    const siteId = req.params.id;

    const query = 'DELETE FROM site WHERE id = ?';
    db.query(query, [siteId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression:', err);
            return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Aucun site trouvé avec cet ID' });
        }

        res.json({ success: true, message: 'Site supprimé avec succès' });
    });
});


module.exports = router;
