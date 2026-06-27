document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIÓN DEL MENÚ MÓVIL
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = menuToggle.querySelector('i');

    function toggleMenu() {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. HEADER STICKY CON EFECTO AL SCROLL
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Inicializar estado
    handleScroll();

    // 3. ACTUALIZAR AÑO DEL FOOTER DINÁMICAMENTE
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 4. VALIDACIÓN DE FORMULARIO DE CONTACTO (Client-Side)
    const form = document.getElementById('early-access-form');
    const successMessage = document.getElementById('success-message');
    
    // Función para validar email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para mostrar error
    function showError(inputId) {
        const inputElement = document.getElementById(inputId);
        if(inputElement && inputElement.parentElement) {
            inputElement.parentElement.classList.add('error');
        }
    }

    // Función para limpiar errores
    function clearErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => group.classList.remove('error'));
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar envío real
            clearErrors();
            let isValid = true;

            // Validar Nombre
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError('name');
                isValid = false;
            }

            // Validar Email
            const emailInput = document.getElementById('email');
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                showError('email');
                isValid = false;
            }

            // Validar Deporte (Select)
            const sportSelect = document.getElementById('sport');
            if (sportSelect.value === '') {
                showError('sport');
                isValid = false;
            }

            // Si es válido, simular envío exitoso manipulando DOM
            if (isValid) {
                // Ocultar form y mostrar éxito
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Reiniciar el formulario
                form.reset();
            }
        });

        // Limpiar error al escribir
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
            input.addEventListener('change', () => {
                input.parentElement.classList.remove('error');
            });
        });
    }
});
