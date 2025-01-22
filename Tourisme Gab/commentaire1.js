// Fonction pour récupérer les commentaires
function getCommentaires() {
    fetch('get_commentaires.php') 
        .then(response => response.json())
        .then(data => {
            const commentairesContainer = document.getElementById('commentaires');
            commentairesContainer.innerHTML = ''; 
            data.forEach(commentaire => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('commentaire');
                commentElement.innerHTML = `
                    <p>${commentaire.commentaire}</p>
                    <small>Posté le ${commentaire.created_at}</small>
                `;
                commentairesContainer.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Erreur de récupération des commentaires:', error));
}

// Appeler la fonction pour récupérer les commentaires
getCommentaires();
