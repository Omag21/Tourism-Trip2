const formContainer = document.getElementById('dynamic-form');

        // Lorsque le formulaire ou un champ est touché (focus)
        formContainer.addEventListener('focusin', () => {
            formContainer.classList.add('active'); 
        });

        // Lorsque le focus quitte le formulaire ou les champs
        formContainer.addEventListener('focusout', () => {
            formContainer.classList.remove('active'); 
        });

        // Lorsque la souris survole le formulaire
        formContainer.addEventListener('mouseenter', () => {
            formContainer.classList.add('active');
        });

        // Lorsque la souris quitte le formulaire
        formContainer.addEventListener('mouseleave', () => {
            formContainer.classList.remove('active');
        });