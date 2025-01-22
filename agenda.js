
const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/add', async (req, res) => {
    const { title, description, eventDate } = req.body;
    
    try {
       
        await axios.post('http://localhost/agendaController.php', {
            title,
            description,
            eventDate
        });
        
        res.status(201).send("Agenda enregistré avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'agenda :", error);
        res.status(500).send("Erreur lors de l'enregistrement de l'agenda.");
    }
});


router.get('/list', async (req, res) => {
    try {
        const response = await axios.get('http://localhost/agendaController.php?fetch=1');
        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).send("Erreur lors de la récupération des données de l'agenda.");
    }
});

module.exports = router;
