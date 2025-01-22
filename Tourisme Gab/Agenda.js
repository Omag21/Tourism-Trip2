document.getElementById('agenda-link').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Récupère le formulaire de l'agenda
    const agendaForm = document.getElementById('agenda-form');
    
    
    if (agendaForm.style.display === 'none' || agendaForm.style.display === '') {
        agendaForm.style.display = 'block';
    } else {
        agendaForm.style.display = 'none';
    }
});

document.getElementById("event-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    try {
        const response = await fetch("agendaController.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titre, description, date })
        });

        const result = await response.json();
        if (result.success) {
            alert(result.success);
            loadAgenda();
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
    }
});


async function loadAgenda() {
    try {
        const response = await fetch("agendaController.php?fetch=true");
        const data = await response.json();

        const tableBody = document.getElementById("agenda-table-body");
        tableBody.innerHTML = "";

        data.forEach(item => {
            const row = `<tr>
                <td>${item.IdAgenda}</td>
                <td>${item.titre}</td>
                <td>${item.description}</td>
                <td>${item.date}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Erreur lors du chargement de l'agenda :", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadAgenda();
    
});