/* ==========================================================================
   Erin Maria Bobin — Web Portfolio Client Interactivity
   Features:
   - React Bits WebGL2 Interactive Particles Background
   - Dynamic Project Categorization Filter
   - ScrollSpy Active Section Indicator
   - Theme Toggle (Light / Dark) with LocalStorage
   - VTOP Assessment Print / Export PDF Trigger
   - Copy Link to Clipboard with Toast Notification
   ========================================================================== */

let particlesController = null;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticlesEffect();
  initProjectFilter();
  initScrollSpy();
  initActionButtons();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Default to Dark Theme so the glowing white particles shine with high contrast
  const initialTheme = savedTheme || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeButton(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeButton(newTheme);

      if (particlesController) {
        particlesController.updateOptions({
          particleColors: ['#ffffff', '#ffffff', '#ffffff', '#f8fafc'],
          glow: 0.85,
          opacity: 1
        });
      }
    });
  }
}

/* ==========================================================================
   2. React Bits: WebGL2 Interactive Particles Background
   ========================================================================== */
function initParticlesEffect() {
  const container = document.getElementById('particles-background');
  if (!container || typeof window.initParticles !== 'function') return;

  particlesController = window.initParticles(container, {
    particleCount: 260,
    particleSpread: 12,
    speed: 0.15,
    particleColors: ['#ffffff', '#ffffff', '#ffffff', '#f8fafc'],
    particleBaseSize: 130,
    sizeRandomness: 0.85,
    cameraDistance: 20,
    glow: 0.85,
    twinkle: 0.45,
    alphaParticles: false,
    moveParticlesOnHover: true,
    hoverEffect: 'parallax',
    particleHoverFactor: 1.2,
    hoverRadius: 160,
    clickBurst: true,
    drift: 'none',
    intro: false,
    opacity: 1
  });
}

function updateThemeButton(theme) {
  const iconSpan = document.getElementById('theme-icon');
  const textSpan = document.getElementById('theme-text');
  if (!iconSpan) return;

  if (theme === 'dark') {
    iconSpan.textContent = '☀️';
    if (textSpan) textSpan.textContent = 'Light Mode';
  } else {
    iconSpan.textContent = '🌙';
    if (textSpan) textSpan.textContent = 'Dark Mode';
  }
}

/* ==========================================================================
   2. Project Filtering Logic
   ========================================================================== */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          // Trigger slight fade-in
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. ScrollSpy Navigation Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section-wrapper');
  const navLinks = document.querySelectorAll('.section-nav a');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Action Buttons (Print PDF & Copy Link)
   ========================================================================== */
function initActionButtons() {
  // Print for VTOP buttons
  const printButtons = document.querySelectorAll('.trigger-print');
  printButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // Copy URL Button
  const copyBtn = document.getElementById('copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const urlToCopy = window.location.href;
      navigator.clipboard.writeText(urlToCopy).then(() => {
        showToast('Portfolio link copied to clipboard!');
      }).catch(() => {
        // Fallback
        showToast('Press Ctrl+C to copy current link');
      });
    });
  }
}

/* ==========================================================================
   5. Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
