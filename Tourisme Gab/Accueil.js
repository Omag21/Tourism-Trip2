
function DemarreDefilement() {
   
    const images = [
        { src: "chute.niagara1.jpeg", alt: "Chute de Niagara", ville: "Niagara", pays: "Canada", description: "La majestueuse chute du Niagara." },
        { src: "parc Mayumba.jpeg", alt: "Parc de Mayumba", ville: "Mayumba", pays: "Gabon", description: "Un parc naturel situé à Mayumba." },
        { src: "ville_bleue.jpeg", alt: "Ville Bleue", ville: "Chefchaouen", pays: "Maroc", description: "Une ville pittoresque au Maroc, célèbre pour ses bâtiments bleus." },
        { src: "plage El jebha1.jpg", alt: "Plage El Jebha", ville: "El Jebha", pays: "Maroc", description: "Une belle plage située sur la côte méditerranéenne." },
        { src: "chute.niagara2.jpeg", alt: "Chute de Niagara", ville: "Niagara", pays: "Canada", description: "Une autre vue spectaculaire de la chute du Niagara." },
        { src: "montagne.verte1.jpg", alt: "Montagne", ville: "Suisse", pays: "Suisse", description: "Les montagnes suisses, un paysage naturel magnifique." },
        { src: "chute.niagara3.jpeg", alt: "Chute de Niagara", ville: "Niagara", pays: "Canada", description: "Vue panoramique sur les chutes du Niagara." },
        { src: "plage Mayumba2.jpeg", alt: "Plage de Mayumba", ville: "Mayumba", pays: "Gabon", description: "Plage magnifique de Mayumba, idéale pour se détendre." },
        { src: "cinque.terre1.jpeg", alt: "Les cinque Terre", ville: "Cinque Terre", pays: "Italie", description: "Les célèbres villages de pêcheurs de Cinque Terre." },
        { src: "plage Gabon2.jpg", alt: "Plage du Gabon", ville: "Gabon", pays: "Gabon", description: "Plage idyllique sur la côte du Gabon." },
        { src: "cinque.terre2.jpeg", alt: "Les cinque Terre", ville: "Cinque Terre", pays: "Italie", description: "Une autre vue des magnifiques Cinque Terre." },
        { src: "plage Mayumba1.jpeg", alt: "Plage de Mayumba", ville: "Mayumba", pays: "Gabon", description: "Plage relaxante à Mayumba." },
        { src: "cité.interdite1.jpeg", alt: "La cité interdite", ville: "Pékin", pays: "Chine", description: "Le célèbre palais impérial à Pékin, Chine." },
        { src: "parc Mayumba1.jpeg", alt: "Parc de Mayumba", ville: "Mayumba", pays: "Gabon", description: "Parc naturel offrant une biodiversité unique." },
        { src: "plage El_jebha2.jpg", alt: "Plage El Jebha", ville: "El Jebha", pays: "Maroc", description: "Une autre vue de la plage d'El Jebha." },
        { src: "ville_bleue1.jpeg", alt: "Ville Bleue", ville: "Chefchaouen", pays: "Maroc", description: "La ville bleue, un lieu magique et coloré au Maroc." },
        { src: "cité.interdite2.jpeg", alt: "La cité interdite", ville: "Pékin", pays: "Chine", description: "Un autre aperçu de la cité interdite en Chine." },
        { src: "colise1.jpeg", alt: "Le Colisé", ville: "Rome", pays: "Italie", description: "Le fameux Colisée de Rome, un site historique emblématique." },
        { src: "louvre1.jpeg", alt: "Le Louvre", ville: "Paris", pays: "France", description: "Le musée du Louvre à Paris, un des plus grands musées du monde." },
        { src: "baie_tortues.jpeg", alt: "La Baie des Tortues", ville: "Libreville", pays: "Gabon", description: "Une baie protégée avec une grande population de tortues." },
        { src: "colise2.jpeg", alt: "Le Colisé", ville: "Rome", pays: "Italie", description: "Vue spectaculaire du Colisée de Rome." },
        { src: "louvre2.jpeg", alt: "Le Louvre", ville: "Paris", pays: "France", description: "Le musée du Louvre, une expérience culturelle unique." },
        { src: "pongara.baleine.jpeg", alt: "Pongara", ville: "Pongara", pays: "Gabon", description: "Réserve naturelle à Pongara, connue pour ses baleines." },
        { src: "pongara.chute.jpeg", alt: "Pongara", ville: "Pongara", pays: "Gabon", description: "Chutes magnifiques dans la réserve de Pongara." },
        { src: "montagne.verte.jpg", alt: "Montagne", ville: "Gabon", pays: "Gabon", description: "Une vue spectaculaire sur les montagnes vertes du Gabon." },
        { src: "pongara.cours.jpeg", alt: "Pongara", ville: "Pongara", pays: "Gabon", description: "Le parcours dans la réserve naturelle de Pongara." },
        { src: "chute.jpeg", alt: "Chute", ville: "Amazonie", pays: "Brésil", description: "Les chutes d'eau impressionnantes de l'Amazonie." },
        { src: "sentier.fleuris.jpeg", alt: "Chemin fleuri", ville: "Japon", pays: "Japon", description: "Un sentier fleuri typique des jardins japonais." },
        { src: "plage Gabon.jpg", alt: "Plage du Gabon", ville: "Libreville", pays: "Gabon", description: "Plage paisible à Libreville, idéale pour les vacances." },
        { src: "sentiers desertiques.jpeg", alt: "Désert", ville: "Sahara", pays: "Algérie", description: "Les vastes étendues désertiques du Sahara." },
        { src: "sommet1.jpeg", alt: "Sommet", ville: "Himalaya", pays: "Népal", description: "Vue imprenable sur le sommet de l'Himalaya." },
        { src: "plage Mayumba3.jpeg", alt: "Plage de Mayumba", ville: "Mayumba", pays: "Gabon", description: "Une plage isolée à Mayumba." },
        { src: "plage El_jebha3.jpg", alt: "Plage El Jebha", ville: "El Jebha", pays: "Maroc", description: "Plage tranquille sur la côte méditerranéenne." },
        { src: "chute.niagara4.jpeg", alt: "Chute de Niagara", ville: "Niagara", pays: "Canada", description: "Une autre vue des magnifiques chutes du Niagara." },

    ];



    // barre de navigation
    function toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('show');
    }
   
    const cadres = [
        { image: document.querySelector("#cadre img"), text: document.querySelector("#text-cadre") },
        { image: document.querySelector("#cadre1 img"), text: document.querySelector("#text-cadre1") },
        { image: document.querySelector("#cadre2 img"), text: document.querySelector("#text-cadre2") }
    ];

    let index = 0; 
    
    
    function AfficherProchaineImage() {
        cadres.forEach((cadre, i) => {
            const currentImage = images[(index + i) % images.length];  
            cadre.image.src = currentImage.src;  
            cadre.image.alt = currentImage.alt;  
            cadre.text.textContent = currentImage.alt;  
        });

        index = (index + 1) % images.length;  
    }

   
    setInterval(AfficherProchaineImage, 3000);

   
    AfficherProchaineImage();
}




/* const userSitesKey = 'userSites';
        const userSites = JSON.parse(localStorage.getItem(userSitesKey)) || [];

        const userSiteList = document.getElementById('userSiteList');

        function renderUserSites() {
            userSiteList.innerHTML = '';
            userSites.forEach((site) => {
                const row = `<tr>
                    <td>${site.name}</td>
                    <td>${site.dateAller}</td>
                    <td>${site.dateRetour}</td>
                    <td>${site.dureeSejour}</td>
                    <td>$${site.prixBillet}</td>
                    <td>${site.pays}</td>
                </tr>`;
                userSiteList.innerHTML += row;
            });
        }

        renderUserSites();

 */



        const cadres = document.querySelectorAll('.cadre');


function moveCadres() {
    cadres.forEach(cadre => {
        const x = Math.random() * 20 - 10; 
        const y = Math.random() * 20 - 10; 
        cadre.style.transform = `translate(${x}px, ${y}px)`;
    });
}


setInterval(moveCadres, 2000);

// Maintenir l'agrandissement 
cadres.forEach(cadre => {
    cadre.addEventListener('mouseover', () => {
        cadre.style.transform += ' scale(1.1)'; 
    });

    cadre.addEventListener('mouseout', () => {
        cadre.style.transform = cadre.style.transform.replace(' scale(1.1)', ''); 
    });
});


// Fonction pour charger les sites touristiques
async function loadUserSites() {
    try {
        const response = await fetch('http://localhost:3000/api/get-sites');
        const result = await response.json();

        if (result.success) {
            const userSiteList = document.getElementById('userSiteList');
            userSiteList.innerHTML = ''; 

            result.sites.forEach(site => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${site.name}</td>
                    <td>${site.date_aller}</td>
                    <td>${site.date_retour}</td>
                    <td>${site.duree_sejour}</td>
                    <td>${site.prix_billet} €</td>
                    <td>${site.pays}</td>
                `;
                userSiteList.appendChild(row);
            });
        } else {
            console.error('Erreur lors de la récupération des sites:', result.message);
        }
    } catch (error) {
        console.error('Erreur réseau lors du chargement des sites:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadUserSites);


// fonction de receherche
function searchFunction() {
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Recherche dans les lignes de la table destination
    const destinationRows = document.querySelectorAll('#userSiteList tr');
    let found = false;

    // Recherche dans les lignes des destinations
    destinationRows.forEach(row => {
        const columns = row.querySelectorAll('td');
        let matchFound = false;

        columns.forEach(column => {
            if (column.textContent.toLowerCase().includes(query)) {
                matchFound = true;
            }
        });

        //correspond à la recherche
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

    // Recherche dans le tableau
    const cityRows = document.querySelectorAll('.ville table tbody tr');
    cityRows.forEach(row => {
        const columns = row.querySelectorAll('td');
        let matchFound = false;

        columns.forEach(column => {
            if (column.textContent.toLowerCase().includes(query)) {
                matchFound = true;
            }
        });

        // recherche correspondante
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
