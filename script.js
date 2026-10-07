/**
 * ==========================================================================
 * TARUN VASHISHTH - PORTFOLIO INTERACTIVITY SCRIPT
 * Features: Dark/Light Mode, Mobile Menu, Typing Effect, Scroll Spy, 
 *           Scroll Reveal, Contact Form Handling, Modal Controls
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 
                     (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  // Apply initial theme
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }


  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  // Show Menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Hide Menu on Close Click
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  // Close Menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show-menu')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
      }
    }
  });


  /* --------------------------------------------------------------------------
     3. HEADER SCROLL EFFECT & SCROLL-TO-TOP BUTTON
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow and compact height
    if (header) {
      if (scrollY >= 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY >= 350) {
        scrollTopBtn.classList.add('show-scroll');
      } else {
        scrollTopBtn.classList.remove('show-scroll');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* --------------------------------------------------------------------------
     4. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHT)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const sectionLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (sectionLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionLink.classList.add('active-link');
        } else {
          sectionLink.classList.remove('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActive);


  /* --------------------------------------------------------------------------
     5. HERO DYNAMIC TYPING ANIMATION
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('hero-typing');
  
  if (typingElement) {
    const roles = [
      'B.Tech 1st Year ECE Student',
      'C / C++ Programmer',
      'Robotics Club Core Member',
      'JU Makerspace Innovator',
      'Smart India Hackathon Participant',
      'Tech Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing word, pause before deleting
        typeSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }


  /* --------------------------------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const animatedElements = document.querySelectorAll(
    '.about__content, .about__cards-column, .timeline__item, .skill-category, .project-card, .achievement-card, .contact__info, .contact__form-wrapper'
  );

  animatedElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('active'));
  }


  /* --------------------------------------------------------------------------
     7. RESUME PREVIEW MODAL
     -------------------------------------------------------------------------- */
  const resumeBtn = document.getElementById('resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel');

  function openModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });


  /* --------------------------------------------------------------------------
     8. CONTACT FORM HANDLING
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Visual sending state
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          showStatus(`Thank you, ${name}! Your message has been received. Tarun will get back to you soon.`, 'success');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          // Auto clear success message after 6 seconds
          setTimeout(() => {
            if (formStatus) {
              formStatus.className = 'form__status';
              formStatus.textContent = '';
            }
          }, 6000);
        }, 800);
      }
    });
  }

  function showStatus(message, type) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = `form__status ${type}`;
    }
  }


  /* --------------------------------------------------------------------------
     9. AUTO UPDATE CURRENT YEAR IN FOOTER
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
