<?php
// Connexion à la base de données
$dsn = 'mysql:host=localhost;dbname=connexion';
$username = 'root';
$password = '';

try {
    $bdd = new PDO($dsn, $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]));
}

// Requête pour récupérer le nombre de passagers par site
$query = "SELECT site_selectionne, COUNT(*) as nbrPassagers FROM reservations GROUP BY site_selectionne";
$stmt = $bdd->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retourner les résultats au format JSON
header('Content-Type: application/json');
echo json_encode($result);
?>
