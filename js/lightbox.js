/**
 * Proyectual Studio - Image Lightbox
 * Full-screen image viewer with blur background
 * - Click image to open
 * - Click outside or X button to close
 * - Escape key to close
 */

(function() {
  'use strict';

  // Create lightbox elements
  function createLightbox() {
    // Check if already exists
    if (document.getElementById('ps-lightbox')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'ps-lightbox';
    overlay.className = 'ps-lightbox';
    overlay.innerHTML = `
      <button class="ps-lightbox-close" aria-label="Close lightbox">&times;</button>
      <div class="ps-lightbox-content">
        <img class="ps-lightbox-img" src="" alt="" />
      </div>
    `;
    document.body.appendChild(overlay);

    // Get elements
    const closeBtn = overlay.querySelector('.ps-lightbox-close');
    const content = overlay.querySelector('.ps-lightbox-content');
    const img = overlay.querySelector('.ps-lightbox-img');

    // Close function
    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        img.src = '';
      }, 300);
    }

    // Close on overlay click (outside image)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === content) {
        closeLightbox();
      }
    });

    // Close on button click
    closeBtn.addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeLightbox();
      }
    });

    return { overlay, img };
  }

  // Open lightbox with image
  function openLightbox(src, alt) {
    let lightbox = document.getElementById('ps-lightbox');
    if (!lightbox) {
      createLightbox();
      lightbox = document.getElementById('ps-lightbox');
    }

    const img = lightbox.querySelector('.ps-lightbox-img');
    img.src = src;
    img.alt = alt || '';

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show with animation
    requestAnimationFrame(() => {
      lightbox.classList.add('active');
    });
  }

  // Initialize lightbox on images
  function initLightbox() {
    // Target images with panel-image class or inside project content
    // Exclude images that are inside links (navigation thumbnails)
    const images = document.querySelectorAll(`
      main img.panel-image:not(a img),
      main .form-container img:not(a img),
      main section img:not(a img),
      main img.img-fluid:not(a img)
    `);

    images.forEach(img => {
      // Skip if already initialized or if parent is a link
      if (img.dataset.lightbox === 'initialized') return;
      if (img.closest('a')) return;

      // Mark as initialized
      img.dataset.lightbox = 'initialized';

      // Add cursor style
      img.style.cursor = 'zoom-in';

      // Add click handler
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(img.src, img.alt);
      });
    });
  }

  // Create lightbox on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    createLightbox();
    initLightbox();
  });

  // Re-init if content changes (for dynamic content)
  window.PSLightbox = {
    init: initLightbox,
    open: openLightbox
  };
})();
