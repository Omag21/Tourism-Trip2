<?php

$host = 'localhost'; 
$dbname = 'connexion';
$username = 'root';
$password = '';

try {
   
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour récupérer les commentaires
    $stmt = $pdo->query("SELECT commentaire, created_at FROM commentaire ORDER BY created_at DESC");
    $commentaires = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les commentaires en JSON
    echo json_encode($commentaires);
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
