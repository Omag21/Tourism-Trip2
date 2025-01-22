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


router.get('/', (req, res) => {
    const query = 'SELECT * FROM passagersdesistant'; 

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des passagers desistants:', err);
            return res.status(500).send('Erreur lors de la récupération des données.');
        }

      
        let tableHTML = `
            <html>
            <head>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        font-size: 1.1em;
                        text-align: left;
                        background-color: #f9f9f9;
                    }
                    th, td {
                        padding: 12px 15px;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #4CAF50;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    tr:hover {
                        background-color: #ddd;
                    }
                </style>
            </head>
            <body>
                <h1>Liste des Passagers Désistants</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Départ</th>
                            <th>Classe</th>
                            <th>Site sélectionné</th>
                            <th>Date d'annulation</th>
                        </tr>
                    </thead>
                    <tbody>`;

       
        results.forEach(passager => {
            tableHTML += `
                <tr>
                    <td>${passager.nom}</td>
                    <td>${passager.prenom}</td>
                    <td>${passager.email}</td>
                    <td>${passager.depart}</td>
                    <td>${passager.classe}</td>
                    <td>${passager.site_selectionne}</td>
                    <td>${new Date(passager.date_annulation).toLocaleString()}</td> 
                </tr>`;
        });

        
        tableHTML += `
                    </tbody>
                </table>
            </body>
            </html>`;

        
        res.send(tableHTML);
    });
});

module.exports = router;