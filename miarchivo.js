//Simulador interactivo Steel Block 🚀
//¿De qué trata el simulador?:
/* El objetivo del proyecto es desarrollar un simulador interactivo para Steel Block, una empresa constructora de viviendas y edificios con amplia trayectoria en el mercado. Este simulador será una herramienta accesible desde una aplicación web que permitirá a los usuarios personalizar las características de su futuro hogar o empresa según sus preferencias e intereses.
Los usuarios podrán seleccionar y detallar parámetros clave, como el tamaño, diseño y materiales deseados, entre otros. Con esta información, la aplicación generará un presupuesto estimativo que les será presentado de manera clara y profesional. Este simulador busca optimizar el proceso de cotización, ofreciendo una experiencia interactiva y adaptada a las necesidades de cada cliente.
*/

// Creación de la clase constructura Casa 🏠 para organizar los distintos objetos del código.
class Casa {
    constructor(metrosCuadrados, precioBase, incluyePiscina, incluyeQuincho, plantas, revestimiento = null) {
        this.metrosCuadrados = metrosCuadrados;
        this.precioBase = precioBase;
        this.incluyePiscina = incluyePiscina;
        this.incluyeQuincho = incluyeQuincho;
        this.plantas = plantas;
        this.revestimiento = revestimiento;
        this.precioPiscina = 5000;
        this.precioQuincho = 1020;
    }

// Calculos y lógica 📠

    calcularPrecio() {
        let total = this.metrosCuadrados * this.precioBase;
        if (this.plantas === 2) {
            total = total * 2; // Duplicar precio por segunda planta
        }
        if (this.incluyePiscina) {
            total += this.precioPiscina;
        }
        if (this.incluyeQuincho) {
            total += this.precioQuincho;
        }
        // Aplicar recargo por revestimiento, si existe
        if (this.revestimiento === 'placas-yeso') {
            total *= 1.05; // Incremento del 5%
        } else if (this.revestimiento === 'placas-mdf') {
            total *= 1.10; // Incremento del 10%
        }
        return total;
    }
}

// Array de materiales (Cuando la persona selecciona el tipo de construcción tradicional)
const materiales = [
    { nombre: "ladrillo-comun", precio: 950 },
    { nombre: "ladrillo-bloque", precio: 810 },
    { nombre: "hormigon", precio: 1020 }
];


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simulador-form');
    const tecnologiaInputs = document.querySelectorAll('.tecnologia input');
    const areaInput = document.getElementById('area');
    const piscinaInputs = document.querySelectorAll('.piscina input');
    const quinchoInputs = document.querySelectorAll('.quincho input');
    const plantasInputs = document.querySelectorAll('.plantas input');
    const materialInputs = document.querySelectorAll('.material input');
    const revestimientoInputs = document.querySelectorAll('.revestimiento input');
    const precioFinal = document.querySelector('.content p');

    // Cargar datos desde el Local Storage
    function cargarDatos() {
        const datosGuardados = JSON.parse(localStorage.getItem('simuladorDatos'));
        if (datosGuardados) {
            tecnologiaInputs.forEach(input => input.checked = input.value === datosGuardados.tecnologia);
            areaInput.value = datosGuardados.metrosCuadrados || '';
            piscinaInputs.forEach(input => input.checked = input.value === datosGuardados.incluyePiscina);
            quinchoInputs.forEach(input => input.checked = input.value === datosGuardados.incluyeQuincho);
            plantasInputs.forEach(input => input.checked = input.value === datosGuardados.plantas);
            materialInputs.forEach(input => input.checked = input.value === datosGuardados.material);
            revestimientoInputs.forEach(input => input.checked = input.value === datosGuardados.revestimiento);
            precioFinal.textContent = `Precio final: ${datosGuardados.precioFinal}`;
        }
    }

    // Guardado de datos en localStorage.
    function guardarDatos(datos) {
        localStorage.setItem('simuladorDatos', JSON.stringify(datos));
    }

    cargarDatos();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const tecnologia = [...tecnologiaInputs].find(input => input.checked)?.value || "steel-frame";
        const metrosCuadrados = parseInt(areaInput.value) || 0;
        const incluyePiscina = [...piscinaInputs].find(input => input.checked)?.value === "si";
        const incluyeQuincho = [...quinchoInputs].find(input => input.checked)?.value === "si";
        const plantas = parseInt([...plantasInputs].find(input => input.checked)?.value) || 1;

        // Seleccionar precio base
        let precioBase = 750;
        if (tecnologia === "tradicional") {
            const materialSeleccionado = [...materialInputs].find(input => input.checked)?.value;
            const material = materiales.find(m => m.nombre === materialSeleccionado);
            precioBase = material ? material.precio : 950;
        }

        // Selección de revestimiento (solamente para cuadno la persona elige el método Steel Frame, es decir, no aplica para tradicional.)
        let revestimiento = null;
        if (tecnologia === "steel-frame") {
            revestimiento = [...revestimientoInputs].find(input => input.checked)?.value || null;
        }

        // Crear instancia de Casa y calcular precio
        const nuevaCasa = new Casa(metrosCuadrados, precioBase, incluyePiscina, incluyeQuincho, plantas, revestimiento);
        const total = nuevaCasa.calcularPrecio();

        // Mostrar el precio final
        precioFinal.textContent = `Precio final: $${total.toFixed(2)} USD`;

        // Guardar los datos en el Local Storage
        guardarDatos({
            tecnologia,
            metrosCuadrados,
            incluyePiscina,
            incluyeQuincho,
            plantas,
            material: tecnologia === "tradicional" ? [...materialInputs].find(input => input.checked)?.value || null : null,
            revestimiento,
            precioFinal: `Precio final: $${total.toFixed(2)} USD`
        });

        // Alertar al usuario
        Swal.fire({
            title: '¡Presupuesto generado!',
            text: `El precio de tu casa es $${total.toFixed(2)} USD`,
            icon: 'success'
        });
    });

    form.addEventListener('reset', () => {
        precioFinal.textContent = 'Precio final: $ ... USD';
        localStorage.removeItem('simuladorDatos');
    });
});

// Envío de presupuesto al correo electrónico del usuario

document.getElementById('enviar-correo').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const presupuesto = document.querySelector('.content p').textContent;

    if (!nombre || !email) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos obligatorios.',
            icon: 'error'
        });
        return;
    }

    const emailData = {
        service_id: 'service_5jld4xn',
        template_id: 'template_4i3tlxa',
        user_id: 'fx3r_Qp_eqVEx1Cks',
        template_params: {
            'to_name': nombre,
            'from_name': email,
            'message': mensaje,
            'presupuesto': presupuesto
        }
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'El presupuesto se ha enviado correctamente.',
                icon: 'success'
            });
            document.getElementById('email-form').reset();
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el correo. Inténtalo nuevamente.',
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error inesperado.',
            icon: 'error'
        });
    });
});