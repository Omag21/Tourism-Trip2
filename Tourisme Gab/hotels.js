
// Fonction pour faire défiler les images
function DemarreDefilement() {

    const images = [
        { src: "Radisson Blu.jpeg", alt: "Radisson Blu, Libreville" },
        { src: "Ritz-Carliton Astana.jpg", alt: "Ritz-Carliton Astana" },
        { src: "Nomad Suisse.jpeg", alt: "Nomad Suisse, Libreville" },
        { src: "Kings Court Hotel Prague.jpeg", alt: "Kings Court Hotel Prague" },
        { src: "Mariote hotel.jpeg", alt: "Mariote Hôtel, Cameroun" },
        { src: "Hotel.jpeg", alt: "Marrakech" },
        { src: "Barcelon.jpeg", alt: "Hôtel de luxe Barcelon" },
        { src: "Sofitel.jpeg", alt: "Hôtel Sofitel, Abidjan" },
       
        
       

    ];

    //Bouton toggle barre de navigation
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

    // Fonction pour afficher les images dans les cadres et leur texte alternatif
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

    // Afficher immédiatement la première image
    AfficherProchaineImage();
}
