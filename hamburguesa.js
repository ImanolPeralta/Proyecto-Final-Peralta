// hamburguesa.js
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Función para cerrar el menú
function closeMenu() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
}

// Evento para abrir/cerrar el menú al hacer clic en el ícono
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Evento para cerrar el menú al hacer clic en un enlace
const navItems = document.querySelectorAll('#nav-links ul li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        closeMenu(); // Cierra el menú
    });
});