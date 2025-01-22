const express = require('express');
const mysql = require('mysql');
const router = express.Router();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'connexion'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});


router.post('/', (req, res) => {
    const { nom, prenom, email, depart, classe, site_selectionne } = req.body;

    const query = 'INSERT INTO reservations (nom, prenom, email, depart, classe, site_selectionne) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nom, prenom, email, depart, classe, site_selectionne], (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement :', err);
            return res.status(500).send('Erreur lors de l\'enregistrement de la réservation.');
        }
        res.redirect('/vol_utilisateur/afficher');
    });
});


router.get('/afficher', (req, res) => {
    db.query('SELECT * FROM reservations', (err, rows) => {
        if (err) throw err;

        let tableHtml = `
            <html>
                <head>
                    <title>Liste des Réservations</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                        table { width: 80%; margin: 20px auto; border-collapse: collapse; background-color: #fff; }
                        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                        th { background-color: #007BFF; color: white; }
                        tr:hover { background-color: #f1f1f1; }
                        button { padding: 8px 16px; margin: 5px; border: none; cursor: pointer; border-radius: 4px; font-size: 14px; }
                        .modifier-btn { background-color: #28a745; color: white; }
                        .annuler-btn { background-color: #dc3545; color: white; }
                        button:hover { opacity: 0.8; }
                    </style>
                </head>
                <body>
                    <h2 style="text-align: center;">Liste des Réservations</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Départ</th>
                                <th>Classe</th>
                                <th>Site Sélectionné</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>`;

        rows.forEach(row => {
            tableHtml += `
                <tr>
                    <td>${row.nom}</td>
                    <td>${row.prenom}</td>
                    <td>${row.email}</td>
                    <td>${row.depart}</td>
                    <td>${row.classe}</td>
                    <td>${row.site_selectionne}</td>
                    <td>
                        <button class="modifier-btn" data-id="${row.id}">Modifier</button>
                       <form id="annuler-form-${row.id}" action="/vol_utilisateur/annuler/${row.id}" method="POST" style="display: inline;">
                         <button type="submit" class="annuler-btn" data-id="${row.id}">Annuler</button>
                       </form>
                    </td>
                </tr>`;
        });

        tableHtml += `</tbody></table>
        <script>
       document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        // Gestion de la modification
        if (event.target.classList.contains('modifier-btn')) {
            const reservationId = event.target.getAttribute('data-id');
            if (reservationId) {
                window.location.href = '/vol_utilisateur/modifier/' + reservationId;
            } else {
                console.error('ID de réservation non défini.');
            }
        }

// Gestion de l'annulation
if (event.target.classList.contains('annuler-btn')) {
    const reservationId = event.target.getAttribute('data-id');
    if (reservationId) {
        // Soumettre le formulaire d'annulation correspondant à cette réservation
        const form = document.getElementById('annuler-form-' + reservationId);
        if (form) {
            form.submit();
        }
    }
}
});
});
</script>


                </body>
            </html>`;

        res.send(tableHtml);
    });
});

router.get('/modifier/:id', (req, res) => {
    const reservationId = req.params.id;

    db.query('SELECT * FROM reservations WHERE id = ?', [reservationId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        if (results.length > 0) {
            res.send(`
                <html>
                <head>
                    <title>Modifier Réservation</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                        .form-container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                            width: 350px;
                            text-align: center;
                        }
                        h2 {
                            margin-bottom: 20px;
                            color: #333;
                        }
                        label {
                            display: block;
                            text-align: left;
                            font-weight: bold;
                            margin: 10px 0 5px;
                        }
                        input {
                            width: 100%;
                            padding: 8px;
                            margin-bottom: 10px;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            font-size: 14px;
                        }
                        .btn {
                            width: 100%;
                            padding: 10px;
                            border: none;
                            border-radius: 5px;
                            font-size: 16px;
                            cursor: pointer;
                            margin-top: 10px;
                        }
                        .btn-submit {
                            background-color: #28a745;
                            color: white;
                        }
                        .btn-cancel {
                            background-color: #dc3545;
                            color: white;
                        }
                        .btn:hover {
                            opacity: 0.8;
                        }
                    </style>
                </head>
                <body>
                    <div class="form-container">
                        <h2>Modifier Réservation</h2>
                        <form action="/vol_utilisateur/modifier/${reservationId}" method="POST">
                            <label>Nom:</label>
                            <input type="text" name="nom" value="${results[0].nom}" required>
                            
                            <label>Prénom:</label>
                            <input type="text" name="prenom" value="${results[0].prenom}" required>
                            
                            <label>Email:</label>
                            <input type="email" name="email" value="${results[0].email}" required>
                            
                            <label>Départ:</label>
                            <input type="text" name="depart" value="${results[0].depart}" required>
                            
                            <label>Classe:</label>
                            <input type="text" name="classe" value="${results[0].classe}" required>
                            
                            <label>Site Sélectionné:</label>
                            <input type="text" name="site_selectionne" value="${results[0].site_selectionne}" required>
                            
                            <button type="submit" class="btn btn-submit">Enregistrer</button>
                            <button type="button" class="btn btn-cancel" onclick="window.history.back();">Annuler</button>
                        </form>
                    </div>

                </body>
                </html>
            `);
        } else {
            res.status(404).send('Réservation non trouvée.');
        }
    });
});


router.post('/modifier/:id', (req, res) => {
    const reservationId = req.params.id;
    const { nom, prenom, email, depart, classe, site_selectionne } = req.body;

    const query = 'UPDATE reservations SET nom = ?, prenom = ?, email = ?, depart = ?, classe = ?, site_selectionne = ? WHERE id = ?';
    db.query(query, [nom, prenom, email, depart, classe, site_selectionne, reservationId], (err) => {
        if (err) {
            console.error('Erreur lors de la mise à jour :', err);
            return res.status(500).send('Erreur lors de la mise à jour de la réservation.');
        }
        res.redirect('/vol_utilisateur/afficher');
    });
});

// Route pour annuler une réservation
/*router.post('/annuler/:id', (req, res) => {
    const reservationId = req.params.id;

    db.query('DELETE FROM reservations WHERE id = ?', [reservationId], (err) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            return res.json({ success: false, message: 'Erreur lors de l\'annulation.' });
        }

        res.redirect('/vol_utilisateur/afficher');
    });
}); */


router.post('/annuler/:id', (req, res) => {
    const reservationId = req.params.id;

    
    db.query('SELECT * FROM reservations WHERE id = ?', [reservationId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de la réservation:', err);
            return res.json({ success: false, message: 'Erreur lors de la récupération des informations.' });
        }

        if (results.length > 0) {
            const reservation = results[0];

           
            const insertQuery = 'INSERT INTO PassagersDesistant (nom, prenom, email, depart, classe, site_selectionne) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, [reservation.nom, reservation.prenom, reservation.email, reservation.depart, reservation.classe, reservation.site_selectionne], (insertErr) => {
                if (insertErr) {
                    console.error('Erreur lors de l\'insertion dans PassagersDesistant:', insertErr);
                    return res.json({ success: false, message: 'Erreur lors de l\'enregistrement du passager dans la liste des desistants.' });
                }

                
                db.query('DELETE FROM reservations WHERE id = ?', [reservationId], (deleteErr) => {
                    if (deleteErr) {
                        console.error('Erreur lors de la suppression de la réservation:', deleteErr);
                        return res.json({ success: false, message: 'Erreur lors de la suppression de la réservation.' });
                    }

                    res.json({ success: true, message: 'Réservation annulée et enregistrée comme passager desisté.' });
                });
            });
        } else {
            res.json({ success: false, message: 'Réservation non trouvée.' });
        }
    });
});


//  route pour récupérer les passagers desistants
/*app.get('/passagers-desistant', (req, res) => {
    const query = 'SELECT nom, prenom, email, depart, classe, site_selectionne FROM PassagersDesistant';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des passagers desistants:', err);
            return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des données.' });
        }

        res.json({ success: true, data: results });
    });
});*/




module.exports = router;
