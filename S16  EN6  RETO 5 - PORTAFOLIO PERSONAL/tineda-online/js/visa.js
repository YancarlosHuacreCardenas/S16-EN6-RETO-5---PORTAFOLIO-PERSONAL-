// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Carrito de Compras
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para calcular el total a pagar
    function calcularTotalAPagar() {
        let totalAPagar = 0;
        carrito.forEach(producto => {
            totalAPagar += producto.precio * producto.cantidad; // Sumar el subtotal de cada producto
        });
        return totalAPagar.toFixed(2); // Retornar el total con dos decimales
    }

    // Mostrar el total en el formulario
    const totalPagoElement = document.getElementById('total-pago');
    totalPagoElement.textContent = `$${calcularTotalAPagar()}`; // Actualizar el total en el HTML

    // Formatear el número de tarjeta
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function(e) {
        // Eliminar caracteres no numéricos
        let value = this.value.replace(/\D/g, '');
        
        // Formatear como XXXX-XXXX-XXXX-XXXX
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += '-';
            }
            formattedValue += value[i];
        }
        
        // Limitar a 16 caracteres
        if (formattedValue.length > 19) {
            formattedValue = formattedValue.slice(0, 19);
        }
        
        this.value = formattedValue; // Actualizar el valor del input
    });

    // Formatear la fecha de vencimiento
    const expiryDateInput = document.getElementById('expiry-date');
    expiryDateInput.addEventListener('input', function(e) {
        // Eliminar caracteres no numéricos
        let value = this.value.replace(/\D/g, '');

        // Formatear como MM/YYYY
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 2) {
                formattedValue += '/'; // Añadir el separador después del mes
            }
            formattedValue += value[i];
        }

        // Limitar a 7 caracteres
        if (formattedValue.length > 7) {
            formattedValue = formattedValue.slice(0, 7);
        }

        this.value = formattedValue; // Actualizar el valor del input
    });

    // Limitar el CVV a 3 dígitos
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        // Eliminar caracteres no numéricos
        let value = this.value.replace(/\D/g, '');

        // Limitar a 3 caracteres
        if (value.length > 3) {
            value = value.slice(0, 3);
        }

        this.value = value; // Actualizar el valor del input
    });

    // Obtén el formulario y el mensaje de pago
    const paymentForm = document.getElementById("visa-payment-form");
    const mensajePago = document.getElementById('mensaje-pago');

    // Agrega un evento para el envío del formulario
    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevenir el envío del formulario para procesarlo primero

          // Validar número de tarjeta
    const cardNumber = cardNumberInput.value.replace(/-/g, ''); // Eliminar guiones
    if (!cardNumber || cardNumber.length !== 16) {
        alert("Por favor, ingresa un número de tarjeta válido (16 dígitos).");
        return; // Detener el envío si no es válido
    }
    
        // Ocultar el formulario
        paymentForm.style.display = 'none';

        // Mostrar el mensaje de pago realizado
        mensajePago.style.display = 'flex'; // Mostrar el mensaje

        // Espera 6 segundos y luego oculta el mensaje
        setTimeout(function() {
            mensajePago.classList.add('hidden'); // Agrega la clase para desvanecer
        }, 6000); // 6000 milisegundos = 4 segundos

        // Opcional: Ocultar el mensaje completamente después de que se desvanezca
        setTimeout(function() {
            mensajePago.style.display = 'none'; // Oculta el mensaje completamente
            mensajePago.classList.remove('hidden'); // Restablece la clase para futuros usos
        }, 5000); // 5000 milisegundos = 5 segundos (1 segundo después de que se desvanezca)

        // Vaciar el carrito en el almacenamiento local
        localStorage.removeItem('carrito'); // Eliminar el carrito del localStorage

        // Redirigir al carrito después de un breve retraso
        setTimeout(function() {
            window.location.href = "carrito.html";  // Redirige al carrito después de 1 segundo
        }, 1000);  // Retraso de 1 segundo antes de la redirección
    });
});