document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Aquí podrías agregar lógica para enviar el formulario a un servidor

    // Muestra el mensaje de éxito
    document.getElementById('mensaje-exito').style.display = 'block';

    // Limpia el formulario
    this.reset();
});