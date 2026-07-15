/**
 * Módulo para la Gestión y Validación del Formulario de Contacto
 * Implementa validaciones en tiempo real para mejorar la experiencia de usuario (UX).
 */

export function inicializarFormulario() {
    // 1. Capturamos el formulario y los elementos de error definidos en el HTML
    const formulario = document.getElementById('contact-form');
    
    const inputNombre = document.getElementById('form-name');
    const inputEmail = document.getElementById('form-email');
    const inputTelefono = document.getElementById('form-phone');
    const inputMensaje = document.getElementById('form-message');

    const errorNombre = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorTelefono = document.getElementById('error-phone');
    const errorMensaje = document.getElementById('error-message');
    
    const feedbackGlobal = document.getElementById('form-feedback');

    // 2. Definimos las Expresiones Regulares (Regex) para las validaciones
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato estándar de correo electronico
    const regexTelefono = /^[0-9]{9,10}$/;          // Valida números de 9 o 10 dígitos (celular o fijo de Ecuador)

    // 3. Funciones de validación individuales por campo
    const validarNombre = () => {
        if (inputNombre.value.trim().length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
            return false;
        } else {
            errorNombre.textContent = ""; // Limpia el mensaje si pasa la validación
            return true;
        }
    };

    const validarEmail = () => {
        if (!regexEmail.test(inputEmail.value.trim())) {
            errorEmail.textContent = "Por favor, ingresa un correo electrónico válido.";
            return false;
        } else {
            errorEmail.textContent = "";
            return true;
        }
    };

    const validarTelefono = () => {
        if (!regexTelefono.test(inputTelefono.value.trim())) {
            errorTelefono.textContent = "Ingresa un número telefónico válido (9 o 10 dígitos numéricos).";
            return false;
        } else {
            errorTelefono.textContent = "";
            return true;
        }
    };

    const validarMensaje = () => {
        if (inputMensaje.value.trim().length < 10) {
            errorMensaje.textContent = "El mensaje es muy corto (mínimo 10 caracteres).";
            return false;
        } else {
            errorMensaje.textContent = "";
            return true;
        }
    };

    // 4. Asignamos los escuchadores de eventos 'input' para validar EN TIEMPO REAL
    inputNombre.addEventListener('input', validarNombre);
    inputEmail.addEventListener('input', validarEmail);
    inputTelefono.addEventListener('input', validarTelefono);
    inputMensaje.addEventListener('input', validarMensaje);

    // 5. Escuchamos el evento 'submit' al intentar enviar el formulario completo
    formulario.addEventListener('submit', (evento) => {
        // Detenemos el envío automático por defecto y la recarga de página obligatoria
        evento.preventDefault();

        // Ejecutamos todas las validaciones juntas
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const telefonoValido = validarTelefono();
        const mensajeValido = validarMensaje();

        // 6. Si todos los campos son verdaderos y válidos, procesamos con éxito
        if (nombreValido && emailValido && telefonoValido && mensajeValido) {
            
            // Mostramos una confirmación visual exitosa al usuario (Requerimiento UX)
            feedbackGlobal.textContent = `¡Gracias por escribirnos, ${inputNombre.value.trim()}! Tu mensaje ha sido enviado con éxito a Quito Coffee Roasters. Nos comunicaremos contigo pronto.`;
            feedbackGlobal.style.color = "green";
            feedbackGlobal.style.fontWeight = "bold";
            feedbackGlobal.style.marginTop = "1rem";
            feedbackGlobal.classList.remove('hidden');

            // Limpiamos los campos del formulario de forma elegante
            formulario.reset();
            
            // Ocultamos el mensaje de éxito después de 5 segundos de forma automática
            setTimeout(() => {
                feedbackGlobal.classList.add('hidden');
            }, 5000);

        } else {
            // Si falta algún campo, damos una alerta global de UX
            feedbackGlobal.textContent = "Por favor, corrige los errores en el formulario antes de enviarlo.";
            feedbackGlobal.style.color = "#cc0000";
            feedbackGlobal.style.fontWeight = "bold";
            feedbackGlobal.style.marginTop = "1rem";
            feedbackGlobal.classList.remove('hidden');
        }
    });
}