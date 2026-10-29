/* ==========================================================================
   Erin Maria Bobin — Web Portfolio Client Interactivity
   Features:
   - Dynamic Project Categorization Filter
   - ScrollSpy Active Section Indicator
   - Theme Toggle (Light / Dark) with LocalStorage
   - VTOP Assessment Print / Export PDF Trigger
   - Copy Link to Clipboard with Toast Notification
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
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
    });
  }
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
