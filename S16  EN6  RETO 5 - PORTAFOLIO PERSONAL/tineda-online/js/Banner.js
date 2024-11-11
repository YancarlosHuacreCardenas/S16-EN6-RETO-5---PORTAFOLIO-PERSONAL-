const images = document.querySelectorAll('.banner-image');
const bannerImagesContainer = document.querySelector('.banner-images');

let currentIndex = 0;

function showNextImage() {
    // Incrementa el índice y resetea si es necesario
    currentIndex = (currentIndex + 1) % images.length;
    
    // Mueve el contenedor de imágenes hacia la izquierda
    const offset = currentIndex * -100; // Cada imagen ocupa el 100% del contenedor
    bannerImagesContainer.style.transform = `translateX(${offset}%)`;
}

// Llamar a la función de cambio de imagen cada 5 segundos
setInterval(showNextImage, 5000);

// Inicializa la primera imagen
showNextImage(); // Para que comience en la primera imagen al cargar
