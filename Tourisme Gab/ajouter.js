// Fonction pour ajouter un vol
document.getElementById('newVol').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch('Ajouter_vols.php?action=add', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            loadVols(); 
        }
    })
    .catch(error => console.error('Erreur:', error));
});

// Fonction pour charger les vols
function loadVols() {
    fetch('Ajouter_vols.php?action=list')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('vols-table');
            tableBody.innerHTML = ''; // Réinitialise le tableau avant de le remplir

            data.vols.forEach(vol => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${vol.nom_avion}</td>
                    <td>${vol.type_avion}</td>
                    <td>${vol.nbr_place}</td>
                    <td>${vol.ville_depart}</td>
                    <td>${vol.destination}</td>
                    <td>${vol.date}</td>
                    <td>${vol.heure_depart}</td>
                    <td>${vol.heure_arrivee}</td>
                    <td>${vol.nbr_escale}</td>
                    <td>
                        <button onclick="editVol(${vol.id})">Modifier</button>
                        <button onclick="deleteVol(${vol.id})">Supprimer</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

// Fonction pour modifier un vol 
function editVol(id) {
    alert('Modifier vol avec id: ' + id);
}

// Fonction pour supprimer un vol
function deleteVol(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce vol ?')) {
        fetch(`Ajouter_vols.php?action=delete&id=${id}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.status === 'success') {
                    loadVols(); 
                }
            })
            .catch(error => console.error('Erreur:', error));
    }
}

// Charger les vols au démarrage
window.onload = loadVols;
