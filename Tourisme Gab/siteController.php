<?php

class SiteController {
    private $pdo;

    public function __construct() {
        $dsn = 'mysql:host=localhost;dbname=connexion;charset=utf8';
        $username = 'root';
        $password = '';
        $this->pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    }

    public function addSite() {
        // Récupération des données depuis la requête POST
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            echo json_encode(['success' => false, 'message' => 'Données non valides']);
            return;
        }

        $stmt = $this->pdo->prepare("
            INSERT INTO site (name, date_aller, date_retour, duree_sejour, prix_billet, pays) 
            VALUES (:name, :date_aller, :date_retour, :duree_sejour, :prix_billet, :pays)
        ");

        $stmt->execute([
            ':name' => $data['name'],
            ':date_aller' => $data['date_aller'],
            ':date_retour' => $data['date_retour'],
            ':duree_sejour' => $data['duree_sejour'],
            ':prix_billet' => $data['prix_billet'],
            ':pays' => $data['pays']
        ]);

        echo json_encode(['success' => true, 'message' => 'Site ajouté avec succès']);
    }
}

// Routeur simple
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller = new SiteController();
    $controller->addSite();
}
?>
