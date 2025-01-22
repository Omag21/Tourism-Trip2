// Fonction de modification d'une réservation
function modifier(reservationId, row) {
    const cells = row.getElementsByTagName('td');

    document.querySelector('input[name="nom"]').value = cells[0].textContent;
    document.querySelector('input[name="prenom"]').value = cells[1].textContent;
    document.querySelector('input[name="email"]').value = cells[2].textContent;
    document.querySelector('input[name="depart"]').value = cells[3].textContent;
    document.querySelector('input[name="classe"]').value = cells[4].textContent;
    document.querySelector('input[name="site_selectionne"]').value = cells[5].textContent;

    document.getElementById('addForm').style.display = 'block'; // Affiche le formulaire pour la modification
    document.getElementById('reservationForm').dataset.reservationId = reservationId; // Ajoute l'ID de la réservation pour la modification
}

// Gestion de la soumission du formulaire de modification
document.getElementById('reservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservationId = e.target.dataset.reservationId || null;
    const formData = new FormData(e.target);

    const data = {
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        depart: formData.get('depart'),
        classe: formData.get('classe'),
        site_selectionne: formData.get('site_selectionne'),
    };

    const url = reservationId ? `/vol_utilisateur/modifier/${reservationId}` : `/vol_utilisateur/ajouter`; // Modifier si ID existe
    const method = reservationId ? 'PUT' : 'POST'; // PUT si modification, POST si ajout

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            alert(reservationId ? 'Réservation mise à jour avec succès' : 'Réservation ajoutée avec succès');
            loadReservations(); 
            document.getElementById('reservationForm').reset();
            document.getElementById('addForm').style.display = 'none';
        } else {
            alert('Erreur : ' + result.message);
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur lors de l\'envoi des données.');
    }
});

// Fonction de suppression d'une réservation
function supprimer(reservationId) {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
        fetch(`/vol_utilisateur/annuler/${reservationId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Réservation annulée avec succès');
                    loadReservations(); 
                } else {
                    alert('Erreur : ' + result.message);
                }
            })
            .catch(error => console.error('Erreur lors de l\'annulation de la réservation:', error));
    }
}
