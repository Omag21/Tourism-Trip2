<?php
$host = 'localhost';
$dbname = 'connexion';
$username = 'root';
$password = '';

try {
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connexion réussie à la base de données.<br>";

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['commentaire'])) {
        $commentaireText = trim($_POST['commentaire']);

        if (!empty($commentaireText)) {
           
            $stmt = $pdo->prepare("INSERT INTO commentaire (commentaire, created_at) VALUES (?, NOW())");
            $stmt->execute([$commentaireText]);

            // Récupérer l'ID du commentaire
            $commentaireId = $pdo->lastInsertId();

           
            $stmt = $pdo->prepare("INSERT INTO notification (commentaire_id, message, created_at) VALUES (?, ?, NOW())");
            $stmt->execute([$commentaireId, "Nouveau commentaire soumis."]);

            echo "✅ Commentaire et notification enregistrés avec succès.";
        } else {
            echo "⚠️ Le champ commentaire est vide.";
        }
    }
} catch (PDOException $e) {
    die("❌ Erreur SQL : " . $e->getMessage());
}
?>
