/* =============================================
   CONTEXTILO ATHLETICS — script.js
   Vanilla JavaScript: Navigation, Form, Animations
   ============================================= */

(function () {
  'use strict';

  /* ==========================================
     1. DOM REFERENCES
     ========================================== */
  const header        = document.getElementById('header');
  const hamburgerBtn  = document.getElementById('hamburger-btn');
  const navMenu       = document.getElementById('nav-menu');
  const navLinks      = document.querySelectorAll('.nav__link');
  const form          = document.getElementById('early-access-form');
  const nameInput     = document.getElementById('name');
  const emailInput    = document.getElementById('email');
  const sportSelect   = document.getElementById('sport');
  const nameError     = document.getElementById('name-error');
  const emailError    = document.getElementById('email-error');
  const sportError    = document.getElementById('sport-error');
  const successMsg    = document.getElementById('success-message');
  const yearSpan      = document.getElementById('current-year');
  const animatables   = document.querySelectorAll('[data-animate]');

  /* ==========================================
     2. DYNAMIC COPYRIGHT YEAR
     ========================================== */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================
     3. STICKY HEADER — scroll-based class
     ========================================== */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // run on load

  /* ==========================================
     4. HAMBURGER MENU
     ========================================== */
  function openMenu() {
    navMenu.classList.add('open');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
  }

  // Close menu when a nav link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });

  /* ==========================================
     5. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72) + 20;

    sections.forEach(function (section) {
      var sectionTop    = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId     = section.getAttribute('id');
      var correspondingLink = document.querySelector('.nav__link[href="#' + sectionId + '"]');

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.style.color = 'var(--accent)';
        } else {
          if (!correspondingLink.classList.contains('nav__link--cta')) {
            correspondingLink.style.color = '';
          }
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ==========================================
     6. INTERSECTION OBSERVER — SCROLL ANIMATIONS
     ========================================== */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatables.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements
    animatables.forEach(function (el) {
      el.style.opacity = '1';
    });
  }

  /* ==========================================
     7. FORM VALIDATION
     ========================================== */

  /**
   * Validates an email address format.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email.trim());
  }

  /**
   * Sets error state on an input.
   * @param {HTMLElement} input
   * @param {HTMLElement} errorEl
   * @param {string} message
   */
  function setError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
  }

  /**
   * Clears error state from an input.
   * @param {HTMLElement} input
   * @param {HTMLElement} errorEl
   */
  function clearError(input, errorEl) {
    errorEl.textContent = '';
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
  }

  /**
   * Validates all form fields.
   * @returns {boolean} True if valid.
   */
  function validateForm() {
    var isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      setError(nameInput, nameError, 'Por favor, ingresa tu nombre completo.');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      setError(nameInput, nameError, 'El nombre debe tener al menos 2 caracteres.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Email validation
    if (!emailInput.value.trim()) {
      setError(emailInput, emailError, 'Por favor, ingresa tu correo electrónico.');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Ingresa un correo electrónico válido (ej. nombre@dominio.com).');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Sport validation
    if (!sportSelect.value) {
      setError(sportSelect, sportError, 'Por favor, selecciona tu deporte principal.');
      isValid = false;
    } else {
      clearError(sportSelect, sportError);
    }

    return isValid;
  }

  // Real-time validation on blur
  if (nameInput) {
    nameInput.addEventListener('blur', function () {
      if (nameInput.value.trim()) {
        clearError(nameInput, nameError);
      }
    });
    nameInput.addEventListener('input', function () {
      if (nameInput.classList.contains('error') && nameInput.value.trim()) {
        clearError(nameInput, nameError);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', function () {
      if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    });
    emailInput.addEventListener('input', function () {
      if (emailInput.classList.contains('error') && isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    });
  }

  if (sportSelect) {
    sportSelect.addEventListener('change', function () {
      if (sportSelect.value) {
        clearError(sportSelect, sportError);
      }
    });
  }

  /* ==========================================
     8. FORM SUBMIT — DOM manipulation success message
     ========================================== */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('[type="submit"]');

      if (!validateForm()) {
        // Shake the button on invalid submission
        submitBtn.style.animation = 'none';
        submitBtn.offsetHeight; // reflow
        submitBtn.style.animation = 'shake .4s ease';
        return;
      }

      // Simulate loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

      setTimeout(function () {
        // Hide form, show success message
        form.style.display = 'none';
        successMsg.classList.add('show');

        // Smooth scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1200);
    });
  }

  /* ==========================================
     9. SMOOTH SCROLL POLYFILL (for older browsers)
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - headerH;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================
     10. SHAKE ANIMATION (injected via JS)
     ========================================== */
  var shakeStyle = document.createElement('style');
  shakeStyle.textContent = [
    '@keyframes shake {',
    '  0%, 100% { transform: translateX(0); }',
    '  20%       { transform: translateX(-6px); }',
    '  40%       { transform: translateX(6px); }',
    '  60%       { transform: translateX(-4px); }',
    '  80%       { transform: translateX(4px); }',
    '}'
  ].join('\n');
  document.head.appendChild(shakeStyle);

  /* ==========================================
     11. FEATURE CARD PARALLAX TILT (subtle, desktop only)
     ========================================== */
  if (window.matchMedia('(min-width: 1024px)').matches) {
    var featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect  = card.getBoundingClientRect();
        var x     = e.clientX - rect.left;
        var y     = e.clientY - rect.top;
        var cx    = rect.width  / 2;
        var cy    = rect.height / 2;
        var rotX  = ((y - cy) / cy) * -5;
        var rotY  = ((x - cx) / cx) *  5;

        card.style.transform = 'translateY(-6px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
      });
    });
  }

})();
