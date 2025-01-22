require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.post('/send', (req, res) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "fotaho7187@suggets.com",
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
