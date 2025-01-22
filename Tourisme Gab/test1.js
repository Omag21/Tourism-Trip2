const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'connexion'
});

// Connecter à la base de données
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Route pour la soumission du formulaire (POST)
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

// Route pour afficher les réservations (GET)
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
                        <button class="annuler-btn" data-id="${row.id}">Annuler</button>
                    </td>
                </tr>`;
        });

        tableHtml += `</tbody></table>
                <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        // Gestion du bouton Modifier
                        document.querySelectorAll('.modifier-btn').forEach(button => {
                            button.addEventListener('click', (event) => {
                                const reservationId = event.target.getAttribute('data-id');
                                window.location.href = '/vol_utilisateur/modifier/' + reservationId;
                            });
                        });

                        // Gestion du bouton Annuler
                        document.querySelectorAll('.annuler-btn').forEach(button => {
                            button.addEventListener('click', (event) => {
                                const reservationId = event.target.getAttribute('data-id');
                                if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                                    fetch('/vol_utilisateur/annuler/' + reservationId, { method: 'DELETE' })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.success) {
                                                alert('Réservation annulée avec succès.');
                                                location.reload();
                                            } else {
                                                alert('Erreur lors de l\'annulation.');
                                            }
                                        })
                                        .catch(error => console.error('Erreur:', error));
                                }
                            });
                        });
                    });
                </script>
                </body>
            </html>`;

        res.send(tableHtml);
    });
});

// Route pour charger le formulaire de modification
router.get('/modifier/:id', (req, res) => {
    const reservationId = req.params.id;

    db.query('SELECT * FROM reservations WHERE id = ?', [reservationId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        if (results.length > 0) {
            res.send(`
                <form action="/vol_utilisateur/modifier/${reservationId}" method="POST">
                    <label>Nom: <input type="text" name="nom" value="${results[0].nom}" required></label><br>
                    <label>Prénom: <input type="text" name="prenom" value="${results[0].prenom}" required></label><br>
                    <label>Email: <input type="email" name="email" value="${results[0].email}" required></label><br>
                    <label>Départ: <input type="text" name="depart" value="${results[0].depart}" required></label><br>
                    <label>Classe: <input type="text" name="classe" value="${results[0].classe}" required></label><br>
                    <label>Site Sélectionné: <input type="text" name="site_selectionne" value="${results[0].site_selectionne}" required></label><br>
                    <button type="submit">Enregistrer les modifications</button>
                </form>
            `);
        } else {
            res.status(404).send('Réservation non trouvée.');
        }
    });
});

// Route pour soumettre les modifications
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
router.delete('/annuler/:id', (req, res) => {
    const reservationId = req.params.id;

    db.query('DELETE FROM reservations WHERE id = ?', [reservationId], (err) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            return res.json({ success: false, message: 'Erreur lors de l\'annulation.' });
        }

        res.json({ success: true, message: 'Réservation annulée avec succès.' });
    });
});

module.exports = router;
