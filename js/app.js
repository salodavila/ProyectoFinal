/**
 * Archivo principal de la aplicación (Orquestador)
 * Importa los módulos específicos y arranca la lógica global.
 */

// Importamos todos los módulos especializados de la aplicación (ES6+)
import { inicializarTema } from './theme.js';
import { inicializarCatalogo } from './products.js';
import { inicializarCarrito, agregarProductoAlCarrito } from './cart.js';
import { inicializarApis } from './api.js';
import { inicializarFormulario } from './contact.js'; // <-- Módulo final incorporado Nuevo módulo

// Escuchamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializamos el tema claro/oscuro
    inicializarTema();

    // 2. Inicializamos la calculadora de pedido y el carrito
    inicializarCarrito();

    // 3. Inicializamos el catálogo pasándole la acción del carrito
    inicializarCatalogo((producto) => {
        agregarProductoAlCarrito(producto);
    });

    // 4. Inicializamos las llamadas asíncronas en tiempo real (Clima y Frases)
    inicializarApis();

    // 5. Inicializamos las validaciones reactivas en tiempo real del formulario de contacto
    inicializarFormulario();

    // === LÓGICA DEL SLIDER INTERACTIVO ===
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('prev-slide');
    const btnNext = document.getElementById('next-slide');
    let indiceActual = 0;

    // Función para cambiar de imagen removiendo y asignando la clase .active
    const mostrarSlide = (indice) => {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[indice].classList.add('active');
    };

    // Evento botón Siguiente
    btnNext.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % slides.length; // Cicla al inicio si llega al final
        mostrarSlide(indiceActual);
    });

    // Evento botón Anterior
    btnPrev.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + slides.length) % slides.length; // Cicla al final si baja de cero
        mostrarSlide(indiceActual);
    });

    // Cambio automático opcional cada 6 segundos para dinamismo en la experiencia
    setInterval(() => {
        indiceActual = (indiceActual + 1) % slides.length;
        mostrarSlide(indiceActual);
    }, 6000);
    // =====================================

    console.log('🎉 Todos los módulos y el Slider visual se han cargado de manera exitosa.');
    

    console.log('Estructura completa cargada con éxito. Listo para el bloque final.');
});