// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Hide loading screen after page loads
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);

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

  // Scroll progress and scroll to top button
  const scrollBtn = document.getElementById("scrollTop");
  const scrollProgress = document.getElementById("scrollProgress");
  
  window.addEventListener("scroll", () => {
    // Scroll to top button visibility
    scrollBtn.classList.toggle("d-none", window.scrollY < 400);
    
    // Scroll progress bar
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  });
  
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Light/Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }
  function getCurrentTheme() {
    return document.body.getAttribute('data-bs-theme') || 'light';
  }
  // Set icon on load
  updateThemeIcon(getCurrentTheme());
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = getCurrentTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-bs-theme", newTheme);
      updateThemeIcon(newTheme);
      
      // Save theme preference
      localStorage.setItem('theme', newTheme);
    });
  }
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute("data-bs-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }



  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
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
