// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cek tema yang tersimpan di localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon berdasarkan tema
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Set icon awal
updateThemeIcon(currentTheme);

// Toggle tema saat tombol diklik
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// ===== FALLING LEAVES ANIMATION =====
function createFallingLeaves() {
  const leavesContainer = document.querySelector('.falling-leaves');
  if (!leavesContainer) return;

  const leafSymbols = ['🍃', '🌿'];
  const leafCount = window.innerWidth < 768 ? 8 : 15; // Lebih sedikit di mobile
  
  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Random leaf symbol
    leaf.textContent = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
    
    // Random size
    const sizes = ['small', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    leaf.classList.add(randomSize);
    
    // Random blur for depth
    if (Math.random() > 0.6) {
      leaf.classList.add('blur');
    }
    
    // Random horizontal position
    leaf.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (slower = more calming)
    const duration = 15 + Math.random() * 15; // 15-30 seconds
    leaf.style.animationDuration = duration + 's';
    
    // Random delay
    leaf.style.animationDelay = Math.random() * 5 + 's';
    
    // Random drift (horizontal movement)
    const drift = (Math.random() - 0.5) * 100; // -50px to 50px
    leaf.style.setProperty('--drift', drift + 'px');
    
    // Random rotation
    const rotation = Math.random() * 360;
    leaf.style.setProperty('--rotation', rotation + 'deg');
    
    leavesContainer.appendChild(leaf);
  }
  
  // Create initial leaves
  for (let i = 0; i < leafCount; i++) {
    setTimeout(() => createLeaf(), i * 500);
  }
}

// Initialize falling leaves when page loads
window.addEventListener('load', createFallingLeaves);

// Recreate leaves on window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const leavesContainer = document.querySelector('.falling-leaves');
    if (leavesContainer) {
      leavesContainer.innerHTML = '';
      createFallingLeaves();
    }
  }, 500);
});

// ===== NAVBAR TOGGLE (MOBILE) =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Tutup menu saat link diklik
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe semua elemen dengan class fade-in
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.padding = '12px 0';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '16px 0';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }
  
  lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
