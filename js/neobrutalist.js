/**
 * Neo-Brutalist Effects - Shared across all pages
 * Adds cursor glow, scroll animations, and other effects
 */

// Cursor glow effect
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 213, 0, 0.4) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = (glowX - 100) + 'px';
    glow.style.top = (glowY - 100) + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateX(0)';
        }, index * 100);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right').forEach(el => {
    observer.observe(el);
  });
}

// Parallax effect on images
function initParallax() {
  const images = document.querySelectorAll('.parallax-img');

  window.addEventListener('scroll', () => {
    images.forEach((img, index) => {
      const scrolled = window.pageYOffset;
      const speed = index % 2 === 0 ? 0.05 : -0.05;
      img.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Add brutalist accent corners to elements
function addBrutalistAccents() {
  document.querySelectorAll('.brutalist-accent').forEach(el => {
    // Corners are handled by CSS ::before and ::after
    // This function can be extended for dynamic corner additions
  });
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initScrollAnimations();
  initParallax();
  addBrutalistAccents();
});
