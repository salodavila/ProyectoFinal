/**
 * Módulo para la gestión de la Calculadora de Pedido y Carrito
 * Simplificado gracias a la delegación de APIs en api.js.
 */

// Importamos la función para obtener la tasa limpia desde el módulo unificado 
import { obtenerTasaEuroActual } from './api.js';

let carrito = []; 
const TASA_IVA = 0.15; 

export function inicializarCarrito() { 
    const selectZona = document.getElementById('shipping-zone');
    // Escuchamos los cambios en la zona de envío 
    selectZona.addEventListener('change', actualizarTotales);
}

export function agregarProductoAlCarrito(producto) { // 
    const productoExistente = carrito.find(item => item.id === producto.id); // Método find() 

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 }); // Operador Spread ES6+ 
    }

    renderizarCarrito();
    actualizarTotales();
}

function renderizarCarrito() {
    const contenedorCart = document.getElementById('cart-items');
    
    if (carrito.length === 0) {
        contenedorCart.innerHTML = `<p>El carrito está vacío. ¡Añade tu café favorito!</p>`;
        return;
    }

    contenedorCart.innerHTML = "";

    carrito.map(item => { // Método map() 
        const itemElement = document.createElement('div');
        itemElement.style.display = 'flex';
        itemElement.style.justify = 'space-between';
        itemElement.style.marginBottom = '1rem';
        itemElement.style.borderBottom = '1px dashed var(--color-borde)';
        itemElement.style.paddingBottom = '0.5rem';

        itemElement.innerHTML = `
            <div>
                <strong>${item.nombre}</strong> (x${item.cantidad})
                <br><small style="color:var(--texto-secundario)">Precio unitario: $${item.precio.toFixed(2)}</small>
            </div>
            <div>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button class="btn-remove" data-id="${item.id}" style="margin-left:1rem; background:none; border:none; color:#cc0000; cursor:pointer;">❌</button>
            </div>
        `; // Template Literals 

        itemElement.querySelector('.btn-remove').addEventListener('click', () => { // Arrow Function 
            eliminarProductoDelCarrito(item.id);
        });

        contenedorCart.appendChild(itemElement);
    });
}

function actualizarTotales() {
    const lblSubtotal = document.getElementById('subtotal-val');
    const lblIva = document.getElementById('iva-val');
    const lblEnvio = document.getElementById('shipping-val');
    const lblTotal = document.getElementById('total-val');
    const lblEuro = document.getElementById('eur-conversion');
    const selectZona = document.getElementById('shipping-zone');

    // Calculamos el subtotal usando reduce() 
    const subtotal = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
    const valorIva = subtotal * TASA_IVA;

    const opcionSeleccionada = selectZona.options[selectZona.selectedIndex];
    const costoEnvio = parseFloat(opcionSeleccionada.getAttribute('data-cost')) || 0;

    const totalFinal = subtotal + valorIva + costoEnvio;

    // --- AQUÍ CONSUMIMOS LA TASA CENTRALIZADA EN API.JS ---
    const tasaEuro = obtenerTasaEuroActual(); 
    const totalEnEuros = totalFinal * tasaEuro;

    lblSubtotal.textContent = subtotal.toFixed(2);
    lblIva.textContent = valorIva.toFixed(2);
    lblEnvio.textContent = costoEnvio.toFixed(2);
    lblTotal.textContent = totalFinal.toFixed(2);

    if (totalFinal > 0) {
        lblEuro.textContent = `Aprox. €${totalEnEuros.toFixed(2)} EUR (Tasa: ${tasaEuro.toFixed(4)})`;
    } else {
        lblEuro.textContent = "";
    }
}

function eliminarProductoDelCarrito(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carrito = carrito.filter(item => item.id !== id); // Método filter() 
        }
    }
    renderizarCarrito();
    actualizarTotales();
}