
let list = document.querySelectorAll(".navigation li");

function activeLink() {
    list.forEach((item) => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function() {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};

// Langue sélectionnée
document.getElementById('languageSelect').addEventListener('change', function () {
    const selectedLanguage = this.value;
    console.log(`Langue sélectionnée : ${selectedLanguage}`);
});


document.getElementById('showFormBtn').addEventListener('click', function() {
    document.getElementById('addForm').style.display = 'block'; 
});

// Gestion de la soumission du formulaire (ajout ou mise à jour d'un site)
/*document.getElementById('siteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const siteId = e.target.dataset.siteId || null;  
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        date_aller: formData.get('date_aller'),
        date_retour: formData.get('date_retour'),
        duree_sejour: formData.get('duree_sejour'),
        prix_billet: formData.get('prix_billet'),
        pays: formData.get('pays'),
        devise: 'EUR'
    };

    try {
        const url = siteId ? `http://localhost:3000/api/update-site/${siteId}` : `http://localhost:3000/api/add-site`;
        const method = siteId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert(siteId ? 'Site mis à jour avec succès' : 'Site ajouté avec succès');
            loadSites();  // Recharger la liste des sites
            document.getElementById('siteForm').reset();
            document.getElementById('addForm').style.display = 'none';
        } else {
            alert('Erreur : ' + result.message);
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur lors de l\'envoi des données.');
    }
});
*/


// Fonction pour charger les sites touristiques 
async function loadSites() {
    try {
        const response = await fetch('http://localhost:3000/api/get-sites');
        const result = await response.json();

        if (result.success) {
            updateTable('siteList', result.sites);
            updateTable('userSiteList', result.sites);
        } else {
            console.error('Erreur lors de la récupération des sites:', result.message);
        }
    } catch (error) {
        console.error('Erreur réseau lors du chargement des sites:', error);
    }
}

// Fonction pour mettre à jour un tableau avec les données des sites
/*function updateTable(tableId, sites) {
    const table = document.getElementById(tableId);
    table.innerHTML = ''; 

    sites.forEach(site => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${site.name}</td>
            <td>${site.date_aller}</td>
            <td>${site.date_retour}</td>
            <td>${site.duree_sejour}</td>
            <td>${site.prix_billet} €</td>
            <td>${site.pays}</td>
        `;

        // Ajout des boutons supplémentaires pour le tableau siteList uniquement
       if (tableId === 'siteList') {
            row.innerHTML += `
                <input type="button" value="modifier" onclick="supprimer">
                 <input type="button" value="supprimer" onclick="modifier">
            `;
        }

        // Ajout des événements pour les boutons
        row.querySelector('.button').addEventListener('click', () => modifier(site.id, row));
        row.querySelector('.button').addEventListener('click', () => supprimer(site));

        table.appendChild(row);
    });
}*/

// Fonction pour mettre à jour un tableau
function updateTable(tableId, sites) {
    const table = document.getElementById(tableId);
    table.innerHTML = ''; 

    sites.forEach(site => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${site.name}</td>
            <td>${site.date_aller}</td>
            <td>${site.date_retour}</td>
            <td>${site.duree_sejour}</td>
            <td>${site.prix_billet} €</td>
            <td>${site.pays}</td>
            <td>
               <button onclick="modifier(${site.id}, this.parentElement.parentElement)">Modifier</button>
                <button onclick="supprimer(${site.id})">Supprimer</button>
            </td>
        `;
        table.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSites();  
});

// Fonction de modification d'un site
function modifier(siteId, row) {
    const cells = row.getElementsByTagName('td');

    document.querySelector('input[name="name"]').value = cells[0].textContent;
    document.querySelector('input[name="date_aller"]').value = cells[1].textContent;
    document.querySelector('input[name="date_retour"]').value = cells[2].textContent;
    document.querySelector('input[name="duree_sejour"]').value = cells[3].textContent;
    document.querySelector('input[name="prix_billet"]').value = parseFloat(cells[4].textContent);
    document.querySelector('input[name="pays"]').value = cells[5].textContent;

    document.getElementById('addForm').style.display = 'block'; // Affiche le formulaire pour la modification
    document.getElementById('siteForm').dataset.siteId = siteId; // Ajoute l'ID du site pour la modification
}
document.getElementById('siteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Désactiver le formulaire pendant la soumission
    const formSubmitButton = e.target.querySelector('button[type="submit"]');
    formSubmitButton.disabled = true;

    const siteId = e.target.dataset.siteId || null;
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        date_aller: formData.get('date_aller'),
        date_retour: formData.get('date_retour'),
        duree_sejour: formData.get('duree_sejour'),
        prix_billet: formData.get('prix_billet'),
        pays: formData.get('pays'),
        devise: 'EUR'
    };

    try {
        const url = siteId ? `http://localhost:3000/api/update-site/${siteId}` : `http://localhost:3000/api/add-site`;
        const method = siteId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert(siteId ? 'Site mis à jour avec succès' : 'Site ajouté avec succès');
            loadSites();  
            document.getElementById('siteForm').reset();
            document.getElementById('addForm').style.display = 'none';
        } else {
            alert('Erreur : ' + result.message);
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur lors de l\'envoi des données.');
    } finally {
        // Réactivation du bouton après la soumission
        formSubmitButton.disabled = false;
    }
});




// Fonction de suppression d'un site
function supprimer(siteId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce site ?')) {
        fetch(`http://localhost:3000/api/delete-site/${siteId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Site supprimé avec succès');
                    loadSites(); 
                } else {
                    alert('Erreur : ' + result.message);
                }
            })
            .catch(error => console.error('Erreur lors de la suppression du site:', error));
    }
}



// photo de profil */
document.addEventListener("DOMContentLoaded", function () {
    fetch("/get-profile-image")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.imagePath) {
                document.getElementById("profileImage").src = data.imagePath;
            }
        })
        .catch(error => console.error("Erreur lors du chargement de l'image :", error));
});

document.getElementById("uploadImage").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profileImage").src = e.target.result;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("image", file);

        fetch("/upload-profile-image", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Image enregistrée avec succès !");
                    document.getElementById("profileImage").src = data.imagePath;
                } else {
                    alert("Erreur : " + data.message);
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
    }
});

//profile
document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.getElementById("profileLink");
    const profileForm = document.getElementById("Profile");

    profileLink.addEventListener("click", function (event) {
        event.preventDefault(); 
        profileForm.classList.toggle("show"); 
    });
});


/*document.addEventListener("DOMContentLoaded", function () {
    // Charger l'image de profil au chargement de la page
    fetch("/profileImage/get")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.imagePath) {
                document.getElementById("profileImage").src = data.imagePath;
            }
        })
        .catch(error => console.error("Erreur lors du chargement de l'image :", error));
});*/

// Gérer l'upload de l'image
/*document.getElementById("uploadImage").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        fetch("/profileImage/upload", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("profileImage").src = data.imagePath; // Mettre à jour l'image affichée
                    alert("Image enregistrée avec succès !");
                } else {
                    alert("Erreur : " + data.message);
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
    }
});
*/

document.getElementById('toggleDeletePassagers').addEventListener('click', function() {
    const tableContainer = document.getElementById('DeletePassagers');
    
    
    if (tableContainer.style.display === 'none' || tableContainer.style.display === '') {
        tableContainer.style.display = 'block';
    } else {
        tableContainer.style.display = 'none';
    }
});

//fonction pour afficher la liste des passagers désistants
function loadPassagersDesistant() {
    fetch('/PassagersDesistants') 
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const tbody = document.getElementById('PassagersDesistant');
                tbody.innerHTML = ''; 

                
                data.data.forEach(passager => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${passager.nom}</td>
                        <td>${passager.prenom}</td>
                        <td>${passager.email}</td>
                        <td>${passager.depart}</td>
                        <td>${passager.classe}</td>
                        <td>${passager.site_selectionne}</td>
                        <td>${new Date(passager.date_annulation).toLocaleString()}</td> <!-- Formate la date -->
                    `;
                    tbody.appendChild(row);
                });
            } else {
                console.error('Erreur:', data.message);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des passagers desistants:', error);
        });
}


document.addEventListener('DOMContentLoaded', loadPassagersDesistant);

//incrémentation des cards
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:3000/NbrPassagers/nbrPassagers");
        const sites = await response.json();

        console.log("📡 Données reçues :", sites);

        const cardContainer = document.getElementById("cardContainer");
        console.log("🖼️ Élément cardContainer trouvé :", cardContainer);

        if (!cardContainer) {
            console.error("❌ Erreur : cardContainer est introuvable !");
            return;
        }

        if (!Array.isArray(sites) || sites.length === 0) {
            cardContainer.innerHTML = "<p>Aucune donnée disponible</p>";
            return;
        }

        cardContainer.innerHTML = ""; 

        sites.forEach(site => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div>
                    <div class="numbers">NbrPassagers: ${site.nbrPassagers}</div>
                    <div class="cardName">${site.site}</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="add-circle-outline"></ion-icon>
                </div>
            `;

            console.log("🆕 Carte ajoutée :", card.innerHTML);
            cardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error);
    }
});

//bare de recherche
function searchFunction() {
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Recherche dans les cartes
    const cards = document.querySelectorAll('.card');
    let found = false;

    // Recherche dans les cartes
    cards.forEach(card => {
        const cardName = card.querySelector('.cardName').textContent.toLowerCase();
        
        if (cardName.includes(query)) {
            found = true;
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.border = '2px solid red'; 
        } else {
            card.style.border = 'none'; 
        }
    });

    // Recherche dans les lignes du tableau
    const rows = document.querySelectorAll('#siteList tr');
    rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        let matchFound = false;

       
        columns.forEach(column => {
            if (column.textContent.toLowerCase().includes(query)) {
                matchFound = true;
            }
        });

       
        if (matchFound) {
            found = true;
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            row.style.backgroundColor = 'lightyellow'; 
            row.style.border = '2px solid red'; 
        } else {
            row.style.backgroundColor = ''; 
            row.style.border = ''; 
        }
    });

    
    if (!found) {
        alert('Aucun résultat trouvé');
    }
}


   

