// Modo oscuro
const modoOscuroBtn = document.getElementById('modo-oscuro');
modoOscuroBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.dark-mode-toggle').forEach(el => el.classList.toggle('dark-mode'));
});

// Carrito de Compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    document.getElementById('contador-carrito').textContent = carrito.length;
}

// Función para agregar producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const producto = { nombre, precio: parseFloat(precio), cantidad: 1, imagen }; // Incluye la imagen
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`Agregaste ${nombre} al carrito!`);
}


// Función para cargar y mostrar los productos en carrito.html
function cargarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    let total = 0;

    if (listaCarrito) {
        listaCarrito.innerHTML = ''; // Limpiar la lista
        carrito.forEach((producto, index) => {
            const item = document.createElement('tr'); // Cambia esto a 'tr' para usar filas de tabla
            item.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <button onclick="actualizarCantidad(${index}, 'decremento')">-</button>
                    ${producto.cantidad}
                    <button onclick="actualizarCantidad(${index}, 'incremento')">+</button>
                </td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><button onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            `;
            listaCarrito.appendChild(item);
            total += producto.precio * producto.cantidad; // Sumar el subtotal
        });
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`; // Mostrar total
    }
    actualizarContadorCarrito();
}


// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index, accion) {
    if (accion === 'incremento') {
        carrito[index].cantidad++;
    } else if (accion === 'decremento' && carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito(); // Vuelve a cargar el carrito para actualizar el total
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

// Cargar carrito al cargar la página
window.onload = cargarCarrito;

// Evento para agregar productos al carrito
document.querySelectorAll('.btn-agregar-producto').forEach(btn => {
    btn.addEventListener('click', () => {
        const nombre = btn.dataset.nombre; // Asumiendo que tienes un data-attribute en el botón
        const precio = btn.dataset.precio; // Asumiendo que tienes un data-attribute en el botón
        const imagen = btn.dataset.imagen; // Asumiendo que tienes un data-attribute en el botón
        agregarAlCarrito(nombre, precio, imagen);
    });
});
