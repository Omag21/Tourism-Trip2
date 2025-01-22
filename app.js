const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const router = express.Router();  // Vous utilisez express.Router() pour gérer les routes

// Middleware pour analyser les données des formulaires
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

// Serveur de fichiers statiques
router.use(express.static(path.join(__dirname, 'Tourism Gab')));

// Fonction pour lire les passagers existants ou retourner un tableau vide
function getPassagers() {
  const filePath = path.join(__dirname, 'list_passagers.json');
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  }
  return [];
}

// Fonction pour sauvegarder les passagers dans le fichier JSON
function savePassagers(passagers) {
  const filePath = path.join(__dirname, 'list_passagers.json');
  fs.writeFileSync(filePath, JSON.stringify(passagers, null, 2), 'utf8');
}

// Fonction pour lire les réservations existantes ou retourner un tableau vide
function getReservations() {
  const filePath = path.join(__dirname, 'reservation.json');
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  }
  return [];
}

// Fonction pour sauvegarder les réservations dans le fichier JSON
function saveReservations(reservations) {
  const filePath = path.join(__dirname, 'reservation.json');
  fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2), 'utf8');
}

// Fonction pour sauvegarder la réservation temporaire dans un fichier
function saveCurrentReservation(reservation) {
  const filePath = path.join(__dirname, 'currentReservation.json');
  fs.writeFileSync(filePath, JSON.stringify(reservation, null, 2), 'utf8');
}

// Fonction pour récupérer la réservation temporaire
function getCurrentReservation() {
  const filePath = path.join(__dirname, 'currentReservation.json');
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  }
  return null;
}

// Route pour le formulaire de réservation initial
router.post('/formulaire-reservation', (req, res) => {
  const { nom, prenom, adresse, email, site, phone } = req.body;

  const passager = {
    id: uuidv4(),
    nom,
    prenom,
    adresse,
    email,
    phone,
    destination: site,
  };

  // Sauvegarde dans le fichier list_passagers.json
  const passagers = getPassagers();
  passagers.push(passager);
  savePassagers(passagers);

  saveCurrentReservation(passager);
  res.redirect('/formulaire-paiement');  // Redirection vers le formulaire de paiement
});

// Route pour afficher le formulaire de paiement
router.get('/formulaire-paiement', (req, res) => {
  const htmlFormPaiement = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="reservation.css">
      <title>Formulaire de Paiement</title>
    </head>
    <body>
      <form action="/paiement" method="POST" class="container">
        <label for="Paypal">Paypal:</label>
        <input type="text" name="Paypal" id="Paypal">
        <br>
        <label for="Visa">Carte Visa:</label>
        <input type="text" name="Visa" id="Visa">
        <br>
        <label for="Autre">Autre:</label>
        <input type="text" name="Autre" id="Autre">
        <br>
        <input type="submit" value="Payer">
      </form>
    </body>
  </html>`;
  res.send(htmlFormPaiement);
});

// Route pour enregistrer les données de paiement
router.post('/paiement', (req, res) => {
  const paiementData = req.body;
  const currentReservation = getCurrentReservation();

  if (!currentReservation) {
    return res.status(400).send('Erreur : Aucune réservation trouvée.');
  }

  const reservationWithId = {
    id: uuidv4(),
    ...currentReservation,
    paiement: paiementData,
  };

  const reservations = getReservations();
  reservations.push(reservationWithId);
  saveReservations(reservations);

  fs.unlinkSync(path.join(__dirname, 'currentReservation.json'));
  res.send('Paiement enregistré avec succès!');
});

// Route pour afficher les passagers dans un tableau HTML
router.get('/list_passagers.html', (req, res) => {
  const passagers = getPassagers();
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Liste des Passagers</title>

      <style>
      body{
      background-color: #34e39b;}
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
      <h2>Liste des Passagers</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  passagers.forEach(passager => {
    htmlContent += `
      <tr>
        <td>${passager.id}</td>
        <td>${passager.nom}</td>
        <td>${passager.prenom}</td>
         <td>${passager.email}</td>
        <td>${passager.destination}</td>
      </tr>
    `;
  });

  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

// Route pour afficher les réservations
router.get('/list_reservation.html', (req, res) => {
  const reservations = getReservations();
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Liste des Réservations</title>
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
      <h2>Liste des Réservations</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Destination</th>
            <th>Paypal</th>
            <th>Visa</th>
            <th>Autre</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  reservations.forEach(reservation => {
    htmlContent += `
      <tr>
        <td>${reservation.id}</td>
        <td>${reservation.nom}</td>
        <td>${reservation.prenom}</td>
        <td>${reservation.adresse}</td>
        <td>${reservation.email}</td>
        <td>${reservation.destination}</td>
        <td>${reservation.paiement?.Paypal || ''}</td>
        <td>${reservation.paiement?.Visa || ''}</td>
        <td>${reservation.paiement?.Autre || ''}</td>
      </tr>
    `;
  });

  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

module.exports = router;
