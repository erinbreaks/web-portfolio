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
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeButton('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeButton('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeButton(newTheme);

      if (particlesController) {
        const isDarkTheme = newTheme === 'dark';
        particlesController.updateOptions({
          particleColors: isDarkTheme 
            ? ['#58a6ff', '#79b8ff', '#38bdf8', '#ffffff'] 
            : ['#0969da', '#0284c7', '#0369a1', '#64748b'],
          glow: isDarkTheme ? 0.6 : 0.4,
          opacity: isDarkTheme ? 0.95 : 0.8
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

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const isDark = currentTheme === 'dark';

  particlesController = window.initParticles(container, {
    particleCount: 220,
    particleSpread: 12,
    speed: 0.12,
    particleColors: isDark 
      ? ['#58a6ff', '#79b8ff', '#38bdf8', '#ffffff'] 
      : ['#0969da', '#0284c7', '#0369a1', '#64748b'],
    particleBaseSize: 95,
    sizeRandomness: 0.95,
    cameraDistance: 20,
    glow: isDark ? 0.6 : 0.4,
    twinkle: 0.35,
    alphaParticles: true,
    moveParticlesOnHover: true,
    hoverEffect: 'parallax',
    particleHoverFactor: 1.2,
    hoverRadius: 150,
    clickBurst: true,
    drift: 'none',
    opacity: isDark ? 0.95 : 0.8
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
