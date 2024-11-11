// Carrito de Compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para calcular y mostrar el total a pagar
function mostrarTotalAPagar() {
    let totalAPagar = 0;

    carrito.forEach(producto => {
        totalAPagar += producto.precio * producto.cantidad; // Sumar el subtotal de cada producto
    });

    document.getElementById('total').value = totalAPagar.toFixed(2); // Mostrar el total en el campo
}

// Llama a la función al cargar el formulario de pago
document.addEventListener('DOMContentLoaded', () => {
    mostrarTotalAPagar();
});

// Manejo del envío del formulario
document.getElementById('pago-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de inmediato

    // Obtener valores del formulario
    const nombre = document.getElementById('correo').value; // Cambiado a 'correo'
    const numeroTarjeta = document.getElementById('numero-tarjeta').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;
    const cvv = document.getElementById('cvv').value;

    // Validaciones simples
    if (nombre === '' || numeroTarjeta === '' || fechaExpiracion === '' || cvv === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Simulación de procesamiento de pago
    alert('Pago realizado con éxito.'); // Solo para propósitos de demostración

    // Limpiar el carrito después del pago
    clearCart();

    // Aquí podrías redirigir a otra página o realizar otra acción
    // window.location.href = 'pagina-exitosa.html'; // Descomenta si necesitas redirigir
});

// Función para limpiar el carrito
function clearCart() {
    // Supongamos que el carrito se guarda en localStorage
    localStorage.removeItem('carrito'); // Elimina el carrito de localStorage

    // Actualiza el contador de carrito en el HTML
    document.getElementById('contador-carrito').innerText = '0';

    // Limpia la lista de artículos en la página
    const listaCarrito = document.getElementById('lista-carrito');
    if (listaCarrito) {
        listaCarrito.innerHTML = ''; // Limpia la tabla de artículos
    }

    // Actualiza el total a 0
    document.getElementById('total').value = '0.00'; // Asegúrate de que el total también se limpie
}

// Función para formatear el número de tarjeta
function formatCardNumber(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Eliminar todo lo que no sea dígito

    // Limitar la longitud a 16 dígitos
    if (value.length > 16) {
        value = value.slice(0, 16);
    }

    // Añadir guiones cada 4 dígitos
    const formattedValue = value.match(/.{1,4}/g)?.join('-') || '';
    input.value = formattedValue; // Actualizar el valor del input
}

// Función para formatear la fecha de expiración
function formatExpirationDate(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Eliminar todo lo que no sea dígito
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4); // Añadir la barra
    }
    input.value = value; // Actualizar el valor del input
}

// Función para validar el campo CVV
function validateCVV(event) {
    const input = event.target;
    // Permitir solo 3 dígitos
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3); // Limitar a 3 caracteres
    }
}

// Añadir eventos de entrada a los campos
document.getElementById('numero-tarjeta').addEventListener('input', formatCardNumber);
document.getElementById('fecha-expiracion').addEventListener('input', formatExpirationDate);
document.getElementById('cvv').addEventListener('input', validateCVV);