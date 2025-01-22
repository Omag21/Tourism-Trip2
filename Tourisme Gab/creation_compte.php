<?php
// Démarrage de la sortie tampon
ob_start();


$dsn = 'mysql:host=localhost;dbname=connexion';
$username = 'root';
$password = '';

try {
    $bdd = new PDO($dsn, $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}

if (isset($_POST['create_account'])) {
   
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];
    $password_confirmation = $_POST['password_confirmation'];

    // Vérification des mots de passe
    if ($password !== $password_confirmation) {
        echo "Les mots de passe ne correspondent pas.";
        exit();
    }

    // Vérification de l'existence de l'utilisateur
    $stmt = $bdd->prepare("SELECT * FROM connexion WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        echo "Un utilisateur avec cet email existe déjà.";
        exit();
    } else {
        
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

       
        $stmt = $bdd->prepare("INSERT INTO connexion (email, password) VALUES (?, ?)");
        $stmt->execute([$email, $hashedPassword]);

        if ($stmt->rowCount() > 0) {
            $userId = $bdd->lastInsertId();

            // mail de confirmation
            $url = 'http://localhost:3000/compte/send-confirmation';
            $data = ['userId' => $userId];

            $options = [
                'http' => [
                    'header'  => "Content-type: application/json\r\n",
                    'method'  => 'POST',
                    'content' => json_encode($data),
                ],
            ];
            
            $context = stream_context_create($options);
            $result = @file_get_contents($url, false, $context);

            if ($result === FALSE) {
                echo 'Erreur lors de l\'envoi de l\'email de confirmation.';
            }
        }

      
        if (strpos($email, '@Trip.gab') !== false) {
            header("Location: interface_user.html");
        } elseif (strpos($email, '@gmail.com') !== false) {
            header("Location: utilisateur.html");
        } else {
            echo "L'email doit être valide.";
            exit();
        }
    }
}

// Fin de la sortie tampon
ob_end_flush();
?>
