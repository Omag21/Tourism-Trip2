const formContainer = document.getElementById('dynamic-form');

       
        formContainer.addEventListener('focusin', () => {
            formContainer.classList.add('active'); 
        });

        
        formContainer.addEventListener('focusout', () => {
            formContainer.classList.remove('active'); 
        });

        
        formContainer.addEventListener('mouseenter', () => {
            formContainer.classList.add('active');
        });

       
        formContainer.addEventListener('mouseleave', () => {
            formContainer.classList.remove('active');
        });


        const borderColors = ["#87CEFA", "#FF7F7F", "#ADD8E6", "#4B4B4B"];
        let colorIndex = 0;

        function changeBorderColor()
        {
            const form = document.getElementById("animated-border-form");
            form.style.borderColor = borderColors[colorIndex];
            colorIndex = (colorIndex + 1) % borderColors.length;

        }

        setInterval(changeBorderColor, 1000);