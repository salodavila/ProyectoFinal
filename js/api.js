/**
 * Módulo Centralizado para el Consumo de APIs Externas
 * Administra Open-Meteo, Frases de inspiración y ExchangeRate-API con async/await.
 */

// Variable modular para almacenar la tasa del Euro (EUR) de respaldo
let tasaEuroGlobal = 0.92;

/**
 * Función exportable principal para inicializar todas las APIs al cargar la app 
 */
export function inicializarApis() {
    cargarClimaQuito();
    cargarFraseDelDia();
    cargarTasaEuroReal();
}

/**
 * Función exportable para que el carrito pueda consultar la tasa actual en cualquier momento 
 */
export function obtenerTasaEuroActual() {
    return tasaEuroGlobal;
}

/**
 * Petición Asíncrona 1: Clima actual en el Centro Histórico de Quito
 */
async function cargarClimaQuito() {
    const lblTemp = document.getElementById('weather-temp');
    const latitud = -0.2202;
    const longitud = -78.5123;
    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;

    try { 
        const respuesta = await fetch(urlClima);
        if (!respuesta.ok) throw new Error('No se pudo obtener la información meteorológica.');

        const datos = await respuesta.json();
        const { temperature } = datos.current_weather;

        lblTemp.textContent = temperature;
        console.log(`Clima de Quito cargado con éxito: ${temperature}°C`);

    } catch (error) { 
        console.error('Error al consumir la API de Clima (Open-Meteo):', error.message);
        lblTemp.textContent = '16.5'; 
    }
}

/**
 * Petición Asíncrona 2: Frase inspiracional aleatoria 
 */
async function cargarFraseDelDia() {
    const contenedorFrase = document.getElementById('daily-quote');
    const urlFrase = 'https://dummyjson.com/quotes/random';

    try { 
        const respuesta = await fetch(urlFrase); 
        if (!respuesta.ok) throw new Error('Error al conectar con el servidor de citas.'); 

        const datos = await respuesta.json();
        contenedorFrase.classList.remove('loading-placeholder');

        contenedorFrase.innerHTML = `
            "${datos.quote}" 
            <br><span style="font-size: 0.9rem; color: var(--color-acento); font-weight: bold;">— ${datos.author}</span>
            <br><small style="display:block; margin-top:0.5rem; color:var(--texto-secundario);">☕ Inspira tu día en Quito Coffee Roasters.</small>
        `; 

    } catch (error) { 
        console.error('Error al consumir la API de Frases:', error.message);
        contenedorFrase.classList.remove('loading-placeholder');
        contenedorFrase.innerHTML = `"El café de especialidad no es solo una bebida, es el arte de capturar el alma de la tierra en cada taza."<br><small style="color:var(--color-acento);">— Quito Coffee Roasters</small>`;
    }
}

/**
 * Petición Asíncrona 3: Conversión de moneda USD a EUR (ExchangeRate-API) 
 */
async function cargarTasaEuroReal() {
    try { 
        const respuesta = await fetch('https://open.er-api.com/v6/latest/USD'); 
        if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor de divisas.'); 

        const datos = await respuesta.json();
        
        if (datos.rates && datos.rates.EUR) {
            tasaEuroGlobal = datos.rates.EUR;
            console.log(`ExchangeRate-API cargada en api.js de forma unificada: 1 USD = ${tasaEuroGlobal} EUR`);
        }
    } catch (error) { 
        console.error('Error al consumir ExchangeRate-API de forma unificada, se usa respaldo:', error.message);
    }
}