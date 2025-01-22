const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/envoyer', (req, res) => {
    const commentaire = req.body.commentaire;
    
    if (commentaire) {
        
        saveCommentaire(commentaire, (error) => {
            if (error) {
                return res.status(500).json({ success: false });
            }

            // Envoyer notification à l'admin
            sendNotificationToAdmin('Nouveau commentaire soumis');
            
            res.json({ success: true });
        });
    } else {
        res.status(400).json({ success: false });
    }
});

function saveCommentaire(commentaire, callback) {
    
    callback(null);  
}

function sendNotificationToAdmin(message) {
   
    console.log('Notification envoyée à l\'admin :', message);
}

module.exports = router;
