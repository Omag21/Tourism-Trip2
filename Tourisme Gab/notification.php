<?php


// Récupérer le nombre de notifications non lues
$query = "SELECT COUNT(*) AS notification_count FROM notification WHERE statut = 'non lu'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
$notificationCount = $row['notification_count'];
// Exemple pour récupérer les notifications de l'admin
$query = "SELECT * FROM notification WHERE statut = 'non lu'";
$result = mysqli_query($conn, $query);

// Affichez les notifications dans l'interface admin
while ($row = mysqli_fetch_assoc($result)) {
    echo "<div class='notification'>{$row['message']}</div>";
}
?>
