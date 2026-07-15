# Quito Coffee Roasters - Dashboard Web Interactivo ☕✨

Este proyecto es una aplicación web moderna, interactiva y totalmente responsive desarrollada para **Quito Coffee Roasters**, una tostadería artesanal de café de especialidad ubicada en el Centro Histórico de Quito. La plataforma automatiza la experiencia del cliente permitiéndole explorar el catálogo de cafés, calcular subtotales, impuestos (IVA 15%) y costos de envío dinámicos por zona, interactuar con APIs globales en tiempo real y cambiar de tema visual.

---

## 🚀 Características Principales (Criterio Sobresaliente)

* **HTML5 Altamente Semántico & Accesible:** Estructura limpia utilizando etiquetas como `<header>`, `<main>`, `<section>`, `<article>`, `<nav>` y atributos ARIA para accesibilidad.
* **Diseño Fluido y Responsive (CSS Grid & Flexbox):** Interfaz que se adapta perfectamente a dispositivos móviles, tablets y pantallas de escritorio sin romper la experiencia visual.
* **Gestión de Tema Dual con Persistencia:** Sistema de cambio de tema Claro / Oscuro implementado mediante `classList.toggle()` nativo que recuerda la preferencia del usuario en sesiones futuras a través de `localStorage`.
* **Slider Interactivo de Imágenes:** Carrusel visual dinámico en la pantalla de inicio con navegación manual (flechas) y transiciones automáticas temporizadas.
* **Logotipo Vectorial Inteligente (SVG):** Diseño gráfico adaptativo que muta e integra su paleta cromática de forma sincronizada con el cambio de tema de la web.
* **Catálogo Dinámico con Búsqueda y Filtrado:** Barra de búsqueda por texto e indexación predictiva por origen (*Ecuador, Colombia, Brasil, Etiopía*) operando en tiempo real.
* **Calculadora Matemática de Pedido:** Sistema transaccional que procesa adiciones y remociones de artículos, cálculo constante del **IVA (15%)**, tarifas variables de envío según el sector de Quito (*Norte, Centro, Sur, Valles*) y conversión a moneda extranjera.
* **Formulario con Validación Reactiva en Tiempo Real:** Validación campo por campo al escribir (`input`), utilizando expresiones regulares (Regex) para control de correos y teléfonos ecuatorianos, complementado con mensajes de retroalimentación (*UX/Feedback*).

---

## 🛠️ Arquitectura y Estructura del Proyecto

El código JavaScript está desarrollado bajo los estándares de **ECMAScript 6 (ES6+)** y estructurado de forma modular e independiente para garantizar mantenibilidad:

```text
├── index.html          # Estructura semántica de la aplicación
└── css/
    ├── styles.css      # Estilos globales, variables corporativas (:root) y Media Queries
├── images/
    ├── logo.svg        # Logotipo vectorial interactivo
└── js/
    ├── app.js          # Orquestador principal del ciclo de vida del DOM
    ├── theme.js        # Módulo de control del tema claro/oscuro y LocalStorage
    ├── products.js     # Módulo del catálogo, buscador y renderizado de tarjetas
    ├── cart.js         # Módulo de la calculadora de pedidos y resumen de cuentas
    ├── api.js          # Módulo centralizado de peticiones asíncronas (Fetch + async/await)
    └── contact.js      # Módulo de validación en tiempo real del formulario

## 🛠️ APIs del Proyecto

La plataforma consume 3 APIs externas de manera completamente asíncrona mediante fetch y async/await, blindadas con estructuras robustas try/catch para proporcionar datos de respaldo estáticos si ocurre un fallo de red:

Open-Meteo API: * Propósito: Obtener el clima en tiempo real del Centro Histórico de Quito basándose en coordenadas geográficas (latitude=-0.2202&longitude=-78.5123).

Endpoint: https://api.open-meteo.com/v1/forecast

DummyJson Quotes API: * Propósito: Desplegar una frase célebre o motivacional aleatoria como inspiración diaria para el consumidor.

Endpoint: https://dummyjson.com/quotes/random

ExchangeRate-API: * Propósito: Consumir el tipo de cambio actualizado global para convertir el total final de dólares (USD) a euros (EUR) como valor agregado para clientes internacionales.

Endpoint: https://open.er-api.com/v6/latest/USD