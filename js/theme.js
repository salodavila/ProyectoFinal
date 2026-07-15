/**
 * Módulo para la gestión del tema visual (Claro / Oscuro)
 * Utiliza LocalStorage para recordar la preferencia del usuario.
 */

// Exportamos la función para que pueda ser utilizada en el archivo principal (app.js)
export function inicializarTema() {
    // 1. Capturamos el botón de cambio de tema usando su ID del HTML
    const botonTema = document.getElementById('theme-toggle');
    
    // 2. Verificamos si el usuario ya tenía una preferencia guardada en LocalStorage
    const temaGuardado = localStorage.getItem('tema');

    // 3. Si el tema guardado era 'oscuro', lo aplicamos de inmediato al cargar la página
    if (temaGuardado === 'oscuro') {
        // Añadimos la clase 'dark-theme' al elemento <body>
        document.body.classList.add('dark-theme');
        // Cambiamos el texto del botón para que muestre el ícono de Sol
        botonTema.textContent = '☀️ Modo Claro';
    }

    // 4. Escuchamos el evento 'click' en el botón para alternar el estado
    botonTema.addEventListener('click', () => {
        // classList.toggle añade la clase si no existe, o la quita si ya existe
        // Devuelve 'true' si la clase terminó agregada, o 'false' si fue eliminada
        const esOscuro = document.body.classList.toggle('dark-theme');

        // 5. Evaluamos si quedó en modo oscuro o claro para actualizar la interfaz y el almacenamiento
        if (esOscuro) {
            // Si el body ahora tiene 'dark-theme', cambiamos el texto del botón
            botonTema.textContent = '☀️ Modo Claro';
            // Guardamos la palabra 'oscuro' en el LocalStorage
            localStorage.setItem('tema', 'oscuro');
        } else {
            // Si se eliminó la clase, volvemos al texto original de Luna
            botonTema.textContent = '🌙 Modo Oscuro';
            // Guardamos la palabra 'claro' en el LocalStorage
            localStorage.setItem('tema', 'claro');
        }
    });
}