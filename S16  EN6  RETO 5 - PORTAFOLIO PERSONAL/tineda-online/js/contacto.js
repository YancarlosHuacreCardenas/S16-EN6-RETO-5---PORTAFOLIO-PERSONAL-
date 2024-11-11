function enviarFormulario(event) {
    event.preventDefault(); // Previene el envío real del formulario
    // Aquí puedes agregar la lógica para enviar los datos del formulario a tu servidor o servicio
    document.getElementById('mensaje-exito').style.display = 'block'; // Muestra el mensaje de éxito
    document.getElementById('contact-form').reset(); // Reinicia el formulario
    return false; // Evita el comportamiento por defecto del formulario
}
