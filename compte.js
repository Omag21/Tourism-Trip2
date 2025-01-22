const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
const router = express.Router();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'connexion',
};

router.post('/send-confirmation', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ status: 'error', message: 'ID utilisateur manquant.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT email FROM connexion WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé.' });
        }

        const email = rows[0].email;
        console.log(`Email récupéré : ${email}`);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'gedeonakoubouangokelele1@gmail.com',
                pass: 'votre-mot-de-passe-d-application',
            },
        });

        const mailOptions = {
            from: '"Support Trip.gab" <gedeonakoubouangokelele1@gmail.com>',
            to: email,
            subject: 'Confirmation de votre email',
            text: `Bonjour,\n\nMerci pour votre inscription ! Cliquez sur le lien ci-dessous pour confirmer votre email :\n\nhttp://localhost:3000/compte/confirm?email=${encodeURIComponent(email)}\n\nMerci, L'équipe Trip.gab`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email de confirmation envoyé à ${email}`);
        res.status(200).json({ status: 'success', message: 'Email de confirmation envoyé.' });

        await connection.end();
    } catch (error) {
        console.error('Erreur lors de la récupération ou de l\'envoi de l\'email :', error);
        res.status(500).json({ status: 'error', message: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
