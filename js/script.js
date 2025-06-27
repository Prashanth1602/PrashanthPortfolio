// script.js
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  // Typed.js initialization
  new Typed("#typed", {
    strings: [
      "AI Explorer",
      "Full Stack Developer",
      "Creative Technologist",
      "Code for Change."
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });

  // Scroll to top button
  const scrollBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("d-none", window.scrollY < 400);
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Light/Dark mode toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  function updateThemeIcon(theme) {
    themeToggles.forEach(btn => {
      btn.textContent = theme === 'dark' ? '🌙' : '☀️';
    });
  }
  function getCurrentTheme() {
    return document.body.getAttribute('data-bs-theme') || 'light';
  }
  // Set icon on load
  updateThemeIcon(getCurrentTheme());
  themeToggles.forEach(toggleBtn => {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = getCurrentTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-bs-theme", newTheme);
      updateThemeIcon(newTheme);
    });
  });

  // Project filter
  const filterButtons = document.querySelectorAll("#filterButtons button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach(card => {
        const category = card.dataset.category;
        card.style.display =
          filter === "all" || filter === category ? "block" : "none";
      });
    });
  });

  // Custom Navbar Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Optional: close nav on link click (mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Contact Form Validation & AJAX Feedback
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formStatus.textContent = '';
      formStatus.className = '';
      const name = contactForm.elements['name'].value.trim();
      const email = contactForm.elements['email'].value.trim();
      const message = contactForm.elements['message'].value.trim();
      let valid = true;
      if (!name) { valid = false; formStatus.textContent = 'Please enter your name.'; formStatus.className = 'error'; }
      else if (!email || !/^\S+@\S+\.\S+$/.test(email)) { valid = false; formStatus.textContent = 'Please enter a valid email.'; formStatus.className = 'error'; }
      else if (!message) { valid = false; formStatus.textContent = 'Please enter your message.'; formStatus.className = 'error'; }
      if (!valid) return;
      formStatus.textContent = 'Sending...';
      formStatus.className = '';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });
        if (res.ok) {
          formStatus.textContent = 'Thank you! Your message has been sent.';
          formStatus.className = 'success';
          contactForm.reset();
        } else {
          formStatus.textContent = 'Oops! Something went wrong. Please try again.';
          formStatus.className = 'error';
        }
      } catch (err) {
        formStatus.textContent = 'Network error. Please try again.';
        formStatus.className = 'error';
      }
    });
  }

  // Scrollspy for navbar
  const sections = document.querySelectorAll('section, header.hero-banner');
  const navLinksList = document.querySelectorAll('.nav-links a');
  const sectionIdToNav = {};
  navLinksList.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      sectionIdToNav[href.replace('#', '')] = link;
    }
  });
  const observer = new window.IntersectionObserver((entries) => {
    let visibleSection = null;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSection = entry.target;
      }
    });
    if (visibleSection) {
      const id = visibleSection.id;
      navLinksList.forEach(link => link.classList.remove('active'));
      if (sectionIdToNav[id]) sectionIdToNav[id].classList.add('active');
    }
  }, { threshold: 0.5 });
  sections.forEach(section => {
    if (section.id) observer.observe(section);
  });

  // Interactive Parallax Shapes
  const parallaxShapes = document.querySelectorAll('.parallax-shape');
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    parallaxShapes.forEach((shape, i) => {
      const factor = (i + 1) * 10;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1)`;
    });
  });

  // 3D Tilt Effect for Cards, Buttons, Badges, etc.
  function addTiltEffect(selector, maxTilt = 15) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--tilt-x', `${x * maxTilt}deg`);
        el.style.setProperty('--tilt-y', `${-y * maxTilt}deg`);
      });
      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--tilt-x', '0deg');
        el.style.setProperty('--tilt-y', '0deg');
      });
    });
  }
  addTiltEffect('.card');
  addTiltEffect('.glass-card');
  addTiltEffect('.fact-card');
  addTiltEffect('.badge', 10);
  addTiltEffect('.btn', 8);
  addTiltEffect('.footer-glass', 6);
  addTiltEffect('.about-flex', 8);
});
