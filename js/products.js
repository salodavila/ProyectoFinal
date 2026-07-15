/**
 * Módulo para la gestión del Catálogo de Cafés
 * Maneja los datos de los productos, filtros y renderizado dinámico.
 */

// 1. Array de objetos que representa nuestra base de datos de cafés de especialidad 
// Array de objetos limpio (sin las etiquetas de citación del documento de la actividad)
const CAFES_CATALOGO = [
    { id: 1, nombre: "Finca Lugmapata", origen: "Ecuador", notas: "Chocolate, panela, frutos rojos", precio: 14.50 },
    { id: 2, nombre: "Geisha Altamira", origen: "Ecuador", notas: "Jazmín, cítricos, té verde", precio: 19.00 },
    { id: 3, nombre: "Supremo Medellín", origen: "Colombia", notas: "Caramelo, nueces, acidez balanceada", precio: 12.00 },
    { id: 4, nombre: "Santos Bourbon", origen: "Brasil", notas: "Almendra, chocolate con leche, cuerpo denso", precio: 10.50 },
    { id: 5, nombre: "Yirgacheffe Orgánico", origen: "Etiopía", notas: "Floral, limón, notas de té silvestre", precio: 16.00 }
];

// 2. Función exportable para inicializar toda la lógica del catálogo
export function inicializarCatalogo(alAgregarAlCarrito) {
    // Capturamos los elementos del DOM necesarios utilizando los IDs definidos en el HTML
    const contenedorGrid = document.getElementById('products-grid');
    const buscadorInput = document.getElementById('search-input');
    const filtroOrigen = document.getElementById('origin-filter');

    // 3. Función interna para renderizar las tarjetas basado en un array recibido 
    const renderizarTarjetas = (listaCafes) => {
        // Limpiamos el contenedor por si había elementos previos o loaders 
        contenedorGrid.innerHTML = "";

        // Si la búsqueda o filtro no arroja resultados, mostramos un mensaje amigable 
        if (listaCafes.length === 0) {
            contenedorGrid.innerHTML = `<p class="no-results">No se encontraron cafés que coincidan con tu búsqueda.</p>`;
            return;
        }

        // Iteramos sobre cada café utilizando el método de array map() de ES6+ 
        listaCafes.map(cafe => {
            // Usamos desestructuración de objetos para extraer las propiedades de forma limpia 
            const { id, nombre, origen, notas, precio } = cafe;

            // Creamos el elemento contenedor de la tarjeta 
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('product-card');

            // Insertamos la estructura HTML usando Template Literals (comillas invertidas) 
            tarjeta.innerHTML = `
                <div>
                    <h3>${nombre}</h3>
                    <p><strong>Origen:</strong> ${origen}</p>
                    <p><strong>Notas:</strong> <em>${notas}</em></p>
                </div>
                <div>
                    <p class="price-highlight"><strong>Precio:</strong> $${precio.toFixed(2)}</p>
                    <button class="btn-add-cart" data-id="${id}">Agregar al pedido</button>
                </div>
            `;

            // Asignamos el evento al botón de agregar usando addEventListener 
            tarjeta.querySelector('.btn-add-cart').addEventListener('click', () => {
                // Ejecutamos el callback pasando el objeto del café seleccionado
                alAgregarAlCarrito(cafe);
            });

            // Añadimos la tarjeta al contenedor principal de la cuadrícula (Grid)
            contenedorGrid.appendChild(tarjeta);
        });
    };

    // 4. Función para filtrar y buscar en tiempo real combinando ambos campos
    const filtrarProductos = () => {
        // Convertimos el texto ingresado a minúsculas para una búsqueda insensible a mayúsculas 
        const textoBusqueda = buscadorInput.value.toLowerCase().trim();
        const origenSeleccionado = filtroOrigen.value;

        // Filtramos usando el método filter() de ES6+ 
        const cafesFiltrados = CAFES_CATALOGO.filter(cafe => {
            // Condición de coincidencia por nombre 
            const coincideNombre = cafe.nombre.toLowerCase().includes(textoBusqueda);
            // Condición de coincidencia por origen del selector 
            const coincideOrigen = origenSeleccionado === "todos" || cafe.origen === origenSeleccionado;

            // Retorna verdadero solo si cumple ambas condiciones
            return coincideNombre && coincideOrigen;
        });

        // Volvemos a renderizar las tarjetas con el nuevo subconjunto filtrado
        renderizarTarjetas(cafesFiltrados);
    };

    // 5. Escuchamos los eventos de tipeo en el buscador y de cambio en el selector de origen 
    buscadorInput.addEventListener('input', filtrarProductos);
    filtroOrigen.addEventListener('change', filtrarProductos);

    // 6. Renderizado inicial al cargar la aplicación por primera vez con todos los productos
    renderizarTarjetas(CAFES_CATALOGO);
}