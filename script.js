// JavaScript para manejar la selección y cantidad de hamburguesas
const menuItems = document.querySelectorAll('.menu-item');
const btnWhatsApp = document.getElementById('btn-whatsapp');

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

// Función para actualizar el enlace de WhatsApp
function updateWhatsAppLink() {
    let message = "Hola, quiero hacer el siguiente pedido:\n";
    let total = 0;

    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').value);
        if (quantity > 0) {
            const name = item.getAttribute('data-name');
            const price = parseInt(item.getAttribute('data-price'));
            const subtotal = quantity * price;
            message += `- ${quantity} x ${name}: $${subtotal.toLocaleString()} COP\n`;
            total += subtotal;
        }
    });

    if (total > 0) {
        message += `\nTotal: $${total.toLocaleString()} COP`;
        const encodedMessage = encodeURIComponent(message);
        btnWhatsApp.href = `https://wa.me/3001234567?text=${encodedMessage}`;
    } else {
        btnWhatsApp.href = "#";
    }
}