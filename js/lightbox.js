/**
 * Proyectual Studio - Image Lightbox Gallery
 * Full-screen image viewer with navigation
 * - Click image to open
 * - Arrow buttons to navigate between images
 * - Dots indicator showing position
 * - Keyboard navigation (left/right arrows, Escape)
 * - Click outside or X button to close
 */

(function() {
  'use strict';

  let galleryImages = [];
  let currentIndex = 0;

  // Create lightbox elements
  function createLightbox() {
    if (document.getElementById('ps-lightbox')) return;

    const overlay = document.createElement('div');
    overlay.id = 'ps-lightbox';
    overlay.className = 'ps-lightbox';
    overlay.innerHTML = `
      <button class="ps-lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="ps-lightbox-nav ps-lightbox-prev" aria-label="Previous image">&#10094;</button>
      <button class="ps-lightbox-nav ps-lightbox-next" aria-label="Next image">&#10095;</button>
      <div class="ps-lightbox-content">
        <img class="ps-lightbox-img" src="" alt="" />
      </div>
      <div class="ps-lightbox-dots"></div>
      <div class="ps-lightbox-counter"></div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.ps-lightbox-close');
    const prevBtn = overlay.querySelector('.ps-lightbox-prev');
    const nextBtn = overlay.querySelector('.ps-lightbox-next');
    const content = overlay.querySelector('.ps-lightbox-content');

    // Close function
    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Navigate to specific image
    function goToImage(index) {
      if (galleryImages.length === 0) return;

      // Wrap around
      if (index < 0) index = galleryImages.length - 1;
      if (index >= galleryImages.length) index = 0;

      currentIndex = index;
      const img = overlay.querySelector('.ps-lightbox-img');
      const imgData = galleryImages[currentIndex];

      // Fade transition
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = imgData.src;
        img.alt = imgData.alt || '';
        img.style.opacity = '1';
      }, 150);

      updateDots();
      updateCounter();
    }

    // Update dots indicator
    function updateDots() {
      const dotsContainer = overlay.querySelector('.ps-lightbox-dots');
      dotsContainer.innerHTML = '';

      if (galleryImages.length <= 1) {
        dotsContainer.style.display = 'none';
        return;
      }

      dotsContainer.style.display = 'flex';
      galleryImages.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'ps-lightbox-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', `Go to image ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToImage(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    // Update counter
    function updateCounter() {
      const counter = overlay.querySelector('.ps-lightbox-counter');
      if (galleryImages.length <= 1) {
        counter.style.display = 'none';
      } else {
        counter.style.display = 'block';
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
      }
    }

    // Show/hide navigation based on gallery size
    function updateNavVisibility() {
      const hasMultiple = galleryImages.length > 1;
      prevBtn.style.display = hasMultiple ? 'flex' : 'none';
      nextBtn.style.display = hasMultiple ? 'flex' : 'none';
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToImage(currentIndex + 1);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === content) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToImage(currentIndex - 1);
          break;
        case 'ArrowRight':
          goToImage(currentIndex + 1);
          break;
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    overlay.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    overlay.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToImage(currentIndex + 1);
        } else {
          goToImage(currentIndex - 1);
        }
      }
    }, { passive: true });

    return { overlay, goToImage, updateDots, updateCounter, updateNavVisibility };
  }

  // Open lightbox with image
  function openLightbox(src, alt, images, index) {
    let lightbox = document.getElementById('ps-lightbox');
    if (!lightbox) {
      createLightbox();
      lightbox = document.getElementById('ps-lightbox');
    }

    // Set gallery images
    galleryImages = images || [{ src, alt }];
    currentIndex = index || 0;

    const img = lightbox.querySelector('.ps-lightbox-img');
    img.src = galleryImages[currentIndex].src;
    img.alt = galleryImages[currentIndex].alt || '';
    img.style.opacity = '1';

    // Update UI
    const hasMultiple = galleryImages.length > 1;
    lightbox.querySelector('.ps-lightbox-prev').style.display = hasMultiple ? 'flex' : 'none';
    lightbox.querySelector('.ps-lightbox-next').style.display = hasMultiple ? 'flex' : 'none';

    // Update dots
    const dotsContainer = lightbox.querySelector('.ps-lightbox-dots');
    dotsContainer.innerHTML = '';
    if (hasMultiple) {
      dotsContainer.style.display = 'flex';
      galleryImages.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'ps-lightbox-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', `Go to image ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          currentIndex = i;
          const img = lightbox.querySelector('.ps-lightbox-img');
          img.style.opacity = '0';
          setTimeout(() => {
            img.src = galleryImages[currentIndex].src;
            img.alt = galleryImages[currentIndex].alt || '';
            img.style.opacity = '1';
          }, 150);
          // Update dots
          dotsContainer.querySelectorAll('.ps-lightbox-dot').forEach((d, idx) => {
            d.classList.toggle('active', idx === currentIndex);
          });
          // Update counter
          const counter = lightbox.querySelector('.ps-lightbox-counter');
          counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
        });
        dotsContainer.appendChild(dot);
      });
    } else {
      dotsContainer.style.display = 'none';
    }

    // Update counter
    const counter = lightbox.querySelector('.ps-lightbox-counter');
    if (hasMultiple) {
      counter.style.display = 'block';
      counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    } else {
      counter.style.display = 'none';
    }

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      lightbox.classList.add('active');
    });
  }

  // Initialize lightbox on images
  function initLightbox() {
    const images = document.querySelectorAll(`
      main img.panel-image:not(a img),
      main .form-container img:not(a img),
      main section img:not(a img),
      main img.img-fluid:not(a img)
    `);

    // Build gallery array
    const gallery = [];
    images.forEach(img => {
      if (img.closest('a')) return;
      gallery.push({ src: img.src, alt: img.alt, element: img });
    });

    gallery.forEach((imgData, index) => {
      const img = imgData.element;
      if (img.dataset.lightbox === 'initialized') return;

      img.dataset.lightbox = 'initialized';
      img.style.cursor = 'zoom-in';

      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(img.src, img.alt, gallery, index);
      });
    });
  }

  // Create lightbox on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    createLightbox();
    initLightbox();
  });

  // Global access
  window.PSLightbox = {
    init: initLightbox,
    open: openLightbox
  };
})();
