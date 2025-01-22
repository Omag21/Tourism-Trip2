const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'connexion'
});


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/vols', (req, res) => {
    const { nom_avion, type_avion, nbr_place, ville_depart, destination, date, heure_depart, heure_arrivee, nbr_escale, prix } = req.body;

    
    console.log('Données reçues :', req.body);

    if (!date) {
        return res.status(400).send('La date du vol est manquante ou invalide.');
    }

    const query = `
        INSERT INTO liste_vols (nom_avion, type_avion, nbr_place, ville_depart, destination, date, heure_depart, heure_arrivee, nbr_escale, prix) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [nom_avion, type_avion, nbr_place, ville_depart, destination, date, heure_depart, heure_arrivee, nbr_escale, prix], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du vol :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Vol ajouté avec succès');
    });
});


router.get('/list_vols', (req, res) => {
    const query = 'SELECT * FROM liste_vols';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des vols :', err);
            return res.status(500).send('Erreur serveur');
        }

        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Liste des Vols</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .container {
                        margin: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Liste des Vols</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom Avion</th>
                                <th>Type Avion</th>
                                <th>Nombre de Places</th>
                                <th>Ville Départ</th>
                                <th>Destination</th>
                                <th>Date</th>
                                <th>Heure Départ</th>
                                <th>Heure Arrivée</th>
                                <th>Nombre d'Escales</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

       
        results.forEach(vol => {
            htmlContent += `
                <tr>
                    <td>${vol.id}</td>
                    <td>${vol.nom_avion}</td>
                    <td>${vol.type_avion}</td>
                    <td>${vol.nbr_place}</td>
                    <td>${vol.ville_depart}</td>
                    <td>${vol.destination}</td>
                    <td>${vol.date}</td>
                    <td>${vol.heure_depart}</td>
                    <td>${vol.heure_arrivee}</td>
                    <td>${vol.nbr_escale}</td>
                    <td>${vol.prix}</td>
                </tr>
            `;
        });

        htmlContent += `
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
        `;
        res.send(htmlContent);
    });
});

module.exports = router;


/*const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
}); */
