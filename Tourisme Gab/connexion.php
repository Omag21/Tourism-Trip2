<?php
session_start();


$dsn = 'mysql:host=localhost;dbname=connexion';
$username = 'root';
$password = '';

try {
    $bdd = new PDO($dsn, $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Vérification des données soumises
if (isset($_POST['connexion'])) {
    if (!empty($_POST['email']) && !empty($_POST['password'])) {
        // Récupération et nettoyage des données 
        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);

        //  vérification de l'utilisateur
        $checkUser = $bdd->prepare('SELECT * FROM connexion WHERE email = ?');
        $checkUser->execute([$email]);
        $user = $checkUser->fetch();

        if ($user) {
            // Vérification du mot de passe
            if (password_verify($password, $user['password'])) {
               
                $_SESSION['email'] = $user['email'];
                $_SESSION['id'] = $user['id'];

                // Vérification du domaine de l'email 
                if (strpos($email, '@gmail.com') !== false) {
                    header("Location: utilisateur.html"); 
                } elseif (strpos($email, '@Trip.gab') !== false) {
                    header("Location: interface_user.html"); 
                    echo "Email invalide. Domaine non reconnu.";
                }
                exit(); 
            } else {
               
                echo "Mot de passe incorrect.";
            }
        } else {
           
            header("Location: creation_compte.html");
            exit();
        }
    } else {
        echo "Veuillez remplir tous les champs !";
    }
}
?>
