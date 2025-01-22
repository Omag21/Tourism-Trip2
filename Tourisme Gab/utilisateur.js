document.getElementById('toggleMenu').addEventListener('click', toggleMenu);

function toggleMenu() {
    const menu = document.querySelector('.navigation');
    const main = document.querySelector('.main');
    menu.classList.toggle('active');
    main.classList.toggle('active');
}

function DemarreDefilement() {
    const images = [
        { src: "Radisson Blu.jpeg", alt: "Radisson Blu, Libreville" },
        { src: "chute.niagara1.jpeg", alt: "Chute de Niagara" },
        { src: "Ritz-Carliton Astana.jpg", alt: "Ritz-Carliton Astana" },
        { src: "parc Mayumba.jpeg", alt: "Parc de Mayumba" },
        { src: "ville_bleue.jpeg", alt: "Ville Bleue" },
        { src: "Nomad Suisse.jpeg", alt: "Nomad Suisse, Libreville" },
        { src: "Ritz-Carliton Astana1.jpg", alt: "Ritz-Carliton Astana" },
        { src: "plage El jebha1.jpg", alt: "Plage El Jebha" },
        { src: "chute.niagara2.jpeg", alt: "Chute de Niagara" },
        { src: "Kings Court Hotel Prague.jpeg", alt: "Kings Court Hotel Prague" },
        { src: "Mariote hotel.jpeg", alt: "Mariote Hôtel, Cameroun" },
        { src: "chute.niagara3.jpeg", alt: "Chute de Niagara" },
        { src: "Hotel.jpeg", alt: "Marrakech" },
        { src: "montagne.verte1.jpg", alt: "Montagne" },
        { src: "plage Mayumba2.jpeg", alt: "Plage de Mayumba" },
        { src: "Barcelon.jpeg", alt: "Hôtel de luxe Barcelon" },
        { src: "cinque.terre1.jpeg", alt: "Les cinque Terre" },
        { src: "plage Gabon2.jpg", alt: "Plage du Gabon" },
        { src: "Sofitel.jpeg", alt: "Hôtel Sofitel, Abidjan" },
        { src: "cinque.terre2.jpeg", alt: "Les cinque Terre" },
        { src: "plage Mayumba1.jpeg", alt: "Plage de Mayumba" },
        { src: "Hayman Island.jpeg", alt: "Hayman Island, Australie" },
        { src: "cité.interdite1.jpeg", alt: "La cité interdite" },
        { src: "parc Mayumba1.jpeg", alt: "Parc de Mayumba" },
        { src: "plage El_jebha2.jpg", alt: "Plage El Jebha" },
        { src: "ville_bleue1.jpeg", alt: "Ville Bleue" },
        { src: "cité.interdite2.jpeg", alt: "La cité interdite" },
        { src: "colise1.jpeg", alt: "Le Colisé" },
        { src: "louvre1.jpeg", alt: "Le Louvre" },
        { src: "baie_tortues.jpeg", alt: "La Baie des Tortues" },
        { src: "colise2.jpeg", alt: "Le Colisé" },
        { src: "louvre2.jpeg", alt: "Le Louvre" },
        { src: "pongara.baleine.jpeg", alt: "Pongara" },
       
        { src: "pongara.chute.jpeg", alt: "Pongara" },
        { src: "montagne.verte.jpg", alt: "Montagne" },
        { src: "pongara.cours.jpeg", alt: "Pongara" },
        { src: "chute.jpeg", alt: "Chute" },
        { src: "sentier.fleuris.jpeg", alt: "Chemin fleuri" },
        { src: "plage Gabon.jpg", alt: "Plage du Gabon" },
        { src: "sentiers desertiques.jpeg", alt: "Désert" },
        { src: "sommet1.jpeg", alt: "Sommet" },
        { src: "plage Mayumba3.jpeg", alt: "Plage de Mayumba" },
        { src: "plage El_jebha3.jpg", alt: "Plage El Jebha" },
        { src: "chute.niagara4.jpeg", alt: "Chute de Niagara" },
    ];

    const cadres = [
        { image: document.querySelector("#cadre img"), text: document.querySelector("#text-cadre") },
        { image: document.querySelector("#cadre1 img"), text: document.querySelector("#text-cadre1") },
        { image: document.querySelector("#cadre2 img"), text: document.querySelector("#text-cadre2") },
        { image: document.querySelector("#cadre3 img"), text: document.querySelector("#text-cadre3") }
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

    setInterval(AfficherProchaineImage, 5000);
    AfficherProchaineImage();
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

document.addEventListener('DOMContentLoaded', () => {

    const reserverLink = document.querySelector('a[href="#reserver"]');
    
    const reservationSection = document.getElementById('reservation-section');
    
    const containerCadres = document.querySelector('.container-cadres');

    if (reserverLink && reservationSection && containerCadres) {
        reserverLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            
            reservationSection.style.display = 'block';
            
           
            containerCadres.style.display = 'none';

           
            window.scrollTo(0, reservationSection.offsetTop);
        });
    }
});

/*
document.getElementById('logout-link').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche la redirection immédiate

    // Récupère le conteneur de chargement
    const loadingDiv = document.getElementById('logout-loading');
    // Vérifie si le conteneur existe
    if (loadingDiv) {
        loadingDiv.style.display = 'flex'; // Affiche le conteneur de chargement
    } else {
        console.error("Le conteneur #logout-loading n'existe pas !");
        return;
    }

    // Ajoute un délai avant la redirection
    setTimeout(() => {
        window.location.href = 'connexion.html'; // Redirige vers la page de connexion
    }, 2000); 
}); */






const cadres = document.querySelectorAll('.cadre');

function moveCadres() {
    cadres.forEach(cadre => {
        const x = Math.random() * 20 - 10; 
        const y = Math.random() * 20 - 10; 
        cadre.style.transform = `translate(${x}px, ${y}px)`;
    });
}


setInterval(moveCadres, 2000);

// Maintenir l'agrandissement lors du survol 
cadres.forEach(cadre => {
    cadre.addEventListener('mouseover', () => {
        cadre.style.transform += ' scale(1.2)';
    });

    cadre.addEventListener('mouseout', () => {
        cadre.style.transform = cadre.style.transform.replace(' scale(1.2)', ''); // Revenir à l'état précédent
    });
});

// date et heure

document.addEventListener("DOMContentLoaded", function () {
    function updateDateTime() {
      const now = new Date();
      const formattedDateTime = now.toLocaleString('fr-FR', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      document.getElementById("dateTimeBadge").textContent = formattedDateTime;
    }

    updateDateTime();
    setInterval(updateDateTime, 60000); 
  });

  