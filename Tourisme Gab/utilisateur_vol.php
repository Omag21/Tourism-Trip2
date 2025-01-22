<?php

$host = 'localhost';
$dbname = 'connexion'; 
$username = 'root';
$password = '';

try {
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $email = $_POST['email'];
        $depart = $_POST['depart'];
        $classe = $_POST['classe'];
        $site_selectionne = $_POST['site_selectionne']; 

        
        $sql = "INSERT INTO reservations (nom, prenom, email, depart, classe, site_selectionne) 
                VALUES (:nom, :prenom, :email, :depart, :classe, :site_selectionne)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nom' => $nom,
            ':prenom' => $prenom,
            ':email' => $email,
            ':depart' => $depart,
            ':classe' => $classe,
            ':site_selectionne' => $site_selectionne
        ]);

       
        echo json_encode(['success' => true, 'message' => 'Réservation enregistrée avec succès.'], JSON_UNESCAPED_UNICODE);
    }
} catch (PDOException $e) {
    
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);

}


//header("Location: interface_user.html"); 
exit();

?>
