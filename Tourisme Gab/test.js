const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: "gedeonakoubouangokelele1@outlook.com",
        pass: "ang@2000"
    }
});

router.post('/send', (req, res) => {
    const mailOptions = {
        from: "gedeonakoubouangokelele1@outlook.com",
        to: "gedeon.akoubouangokelele@emsi-edu.ma",
        subject: "E-mail automatique",
        text: "Vous avez réservé un vol pour le ... durant un séjour de ... dans le site touristique..."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur d'envoi d'email :", error);
            res.status(500).send("Erreur lors de l'envoi de l'email.");
        } else {
            console.log("Email envoyé : " + info.response);
            res.status(200).send("Email envoyé avec succès !");
        }
    });
});

module.exports = router;
