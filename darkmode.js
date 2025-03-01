document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // Cargar el sonido del interruptor
    const switchSound = new Audio("switchSound.mp3"); // Ruta al sonido

    // SVG de la Luna (Modo Claro)
    const moonIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.8" stroke="black" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
    `;

    // SVG del Sol (Modo Oscuro)
    const sunIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
    `;

    // Aplica el tema guardado en localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeIcon.innerHTML = sunIcon;
    } else {
        body.classList.remove("dark-mode"); // Asegura que no tenga la clase dark-mode
        themeIcon.innerHTML = moonIcon;
    }

    // Evento para alternar el tema con sonido
    themeToggle.addEventListener("click", () => {
        switchSound.currentTime = 0; // Reinicia el sonido en cada click
        switchSound.play(); // Reproduce el sonido

        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeIcon.innerHTML = sunIcon; // Sol en modo oscuro
        } else {
            localStorage.setItem("theme", "light");
            themeIcon.innerHTML = moonIcon; // Luna en modo claro
        }
    });
});
