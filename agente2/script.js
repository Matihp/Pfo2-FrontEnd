document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIÓN DEL MENÚ MÓVIL
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = menuToggle.querySelector('i');

    function setMenuOpen(open) {
        nav.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-times', open);
    }

    menuToggle.addEventListener('click', () => {
        setMenuOpen(!nav.classList.contains('active'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    window.matchMedia('(max-width: 768px)').addEventListener('change', () => {
        setMenuOpen(false);
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
            inputElement.setAttribute('aria-invalid', 'true');
        }
    }

    // Función para limpiar errores
    function clearErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            group.querySelector('input, select').removeAttribute('aria-invalid');
        });
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
                successMessage.focus();
                
                // Reiniciar el formulario
                form.reset();
            } else {
                form.querySelector('[aria-invalid="true"]').focus();
            }
        });

        // Limpiar error al escribir
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
                input.removeAttribute('aria-invalid');
            });
            input.addEventListener('change', () => {
                input.parentElement.classList.remove('error');
                input.removeAttribute('aria-invalid');
            });
        });
    }
});
