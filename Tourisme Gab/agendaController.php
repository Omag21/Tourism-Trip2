<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "connexion";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion : " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération et validation des données du formulaire
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['titre'], $data['description'], $data['date'])) {
        echo json_encode(["error" => "Les champs titre, description et date sont requis."]);
        exit;
    }

    $titre = $data['titre'];
    $description = $data['description'];
    $date = $data['date'];

    // Préparation et exécution de la requête
    $stmt = $conn->prepare("INSERT INTO agenda (titre, description, date) VALUES (?, ?, ?)");
    
    if ($stmt) {
        $stmt->bind_param("sss", $titre, $description, $date);
        if ($stmt->execute()) {
            echo json_encode(["success" => "Agenda ajouté avec succès"]);
        } else {
            echo json_encode(["error" => "Erreur lors de l'insertion : " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["error" => "Erreur lors de la préparation de la requête : " . $conn->error]);
    }
}

if (isset($_GET['fetch'])) {
    $result = $conn->query("SELECT * FROM agenda");
    $agenda = [];

    while ($row = $result->fetch_assoc()) {
        $agenda[] = $row;
    }

    echo json_encode($agenda);
}

$conn->close();
?>
