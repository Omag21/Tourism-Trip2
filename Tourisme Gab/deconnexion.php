<?php
session_start();
$_SESSION = array();
session_destroy();
header('Location: connexion.html')
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Déconnexion</title>
</head>
<body>
    <a href="deconnexion.php"></a>
    <button class ="btn btn-primary">Se déconnecter</button>
</body>
</html>