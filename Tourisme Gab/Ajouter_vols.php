<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'connexion';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Échec de la connexion à la base de données : " . $conn->connect_error);
}

$nom_avion = $_POST['nom_avion'];
$type_avion = $_POST['type_avion'];
$nbr_place = $_POST['nbr_place'];
$ville_depart = $_POST['ville_depart'];
$destination = $_POST['destination'];
$date_vol = date('Y-m-d', strtotime($_POST['date']));
$heure_depart = $_POST['heure_depart'];
$heure_arrivee = $_POST['heure_arrivee'];
$nbr_escale = $_POST['nbr_escale'];
$prix = $_POST['prix'];

$sql = "INSERT INTO liste_vols (nom_avion, type_avion, nbr_place, ville_depart, destination, date, heure_depart, heure_arrivee, nbr_escale, prix) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssisssssid", $nom_avion, $type_avion, $nbr_place, $ville_depart, $destination, $date_vol, $heure_depart, $heure_arrivee, $nbr_escale, $prix);

if ($stmt->execute()) {
    echo "Vol ajouté avec succès.";
} else {
    echo "Erreur lors de l'ajout du vol : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
