// Ejemplo de código para cambiar el tema
const toggleTheme = document.querySelector('#toggle-theme');

toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});