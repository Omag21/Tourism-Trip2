document.addEventListener("DOMContentLoaded", function () {
    const commentaireLink = document.getElementById("show-comment-form");
    const commentaireForm = document.getElementById("commentForm");

   
    commentaireForm.style.display = "none";

    commentaireLink.addEventListener("click", function (event) {
        event.preventDefault();
        // Bascule entre afficher/masquer le formulaire
        commentaireForm.style.display = commentaireForm.style.display === "none" ? "block" : "none";
    });

    // Envoi du commentaire
    commentaireForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const commentaire = document.getElementById('commentaire').value;

        fetch('/commentaire/envoyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commentaire: commentaire })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Commentaire envoyé avec succès!');
                    document.getElementById('commentaire').value = '';  // Réinitialise le champ
                    commentaireForm.style.display = "none";  // Masquer le formulaire
                } else {
                    alert('Erreur lors de l\'envoi du commentaire.');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur de connexion');
            });
    });
});
