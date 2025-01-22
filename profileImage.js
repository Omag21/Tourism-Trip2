const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "connexion"
});

db.connect(err => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connexion à la base de données réussie !");
    }
});


const uploadDir = "public/uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Aucun fichier sélectionné" });
    }

    const imagePath = "/uploads/" + req.file.filename;
    const userId = 1; 

    const sql = "UPDATE utilisateur SET profileImage = ? WHERE id = ?";
    db.query(sql, [imagePath, userId], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'enregistrement de l'image :", err);
            return res.json({ success: false, message: "Erreur de base de données" });
        }
        res.json({ success: true, imagePath });
    });
});


router.get("/get", (req, res) => {
    const userId = 1; 

    const sql = "SELECT profileImage FROM utilisateur WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.json({ success: false, message: "Image non trouvée" });
        }
        res.json({ success: true, imagePath: results[0].profileImage });
    });
});

module.exports = router;