// Seleccionar elementos del DOM
const menuItems = document.querySelectorAll('.menu-item');
const btnWhatsApp = document.getElementById('btn-whatsapp');

// Función para actualizar el enlace de WhatsApp
function updateWhatsAppLink() {
    let message = "Hola, quiero hacer el siguiente pedido:\n";
    let total = 0;
    let hasSelection = false; // Para verificar si hay algo seleccionado

    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').value);
        if (quantity > 0) {
            hasSelection = true; // Hay al menos una hamburguesa seleccionada
            const name = item.getAttribute('data-name');
            const price = parseInt(item.getAttribute('data-price'));
            const subtotal = quantity * price;
            message += `- ${quantity} x ${name}: $${subtotal.toLocaleString()} COP\n`;
            total += subtotal;
        }
    });

    if (hasSelection) {
        message += `\nTotal: $${total.toLocaleString()} COP`;

        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);
        const timestamp = new Date().getTime(); // Genera un timestamp único
        const whatsappLink = `https://wa.me/573206823621?text=${encodedMessage}&_=${timestamp}`;

        // Actualizar el enlace del botón de WhatsApp
        btnWhatsApp.href = whatsappLink;

        // Verificar el enlace en la consola (solo para depuración)
        console.log("Enlace de WhatsApp generado:", whatsappLink);
    } else {
        btnWhatsApp.href = "#"; // Si no hay selección, el botón no hace nada
        alert("Por favor, selecciona al menos una hamburguesa."); // Mensaje de alerta
    }
}

// Añadir eventos a los elementos del menú
menuItems.forEach(item => {
    const quantityInput = item.querySelector('.quantity');
    const minusBtn = item.querySelector('.minus');
    const plusBtn = item.querySelector('.plus');

    // Añadir funcionalidad a los botones de cantidad
    minusBtn.addEventListener('click', () => {
        if (quantityInput.value > 0) {
            quantityInput.value--;
            updateWhatsAppLink();
        }
    });

    plusBtn.addEventListener('click', () => {
        quantityInput.value++;
        updateWhatsAppLink();
    });

    // Añadir funcionalidad al input de cantidad
    quantityInput.addEventListener('change', () => {
        if (quantityInput.value < 0) quantityInput.value = 0;
        updateWhatsAppLink();
    });

    // Seleccionar el item al hacer clic
    item.addEventListener('click', () => {
        item.classList.toggle('selected');
        updateWhatsAppLink();
    });
});

// Inicializar el enlace de WhatsApp al cargar la página
updateWhatsAppLink();