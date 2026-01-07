/**
 * Cookie Consent Manager for Proyectual Studio
 * Uses Google Consent Mode v2 (Basic)
 * https://developers.google.com/tag-platform/security/guides/consent
 */

(function() {
  const GA_ID = 'G-K1RNZT5RJ8';
  const CONSENT_KEY = 'proyectual_cookie_consent';

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  // Set default consent state BEFORE loading gtag.js
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });

  // Load Google Analytics (respects consent state)
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize GA
  gtag('js', new Date());
  gtag('config', GA_ID);

  // Check existing consent
  const consent = localStorage.getItem(CONSENT_KEY);

  if (consent === 'accepted') {
    updateConsent(true);
    return;
  }

  if (consent === 'declined') {
    return; // Keep denied, don't show banner
  }

  // No consent yet - show banner when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showConsentBanner);
  } else {
    showConsentBanner();
  }

  function updateConsent(granted) {
    gtag('consent', 'update', {
      'analytics_storage': granted ? 'granted' : 'denied'
    });
  }

  function showConsentBanner() {
    // Get current language
    const lang = localStorage.getItem('lang') || 'en';

    const texts = {
      en: {
        message: 'We use cookies to analyze site traffic and improve your experience.',
        accept: 'Accept',
        decline: 'Decline'
      },
      es: {
        message: 'Usamos cookies para analizar el tráfico y mejorar tu experiencia.',
        accept: 'Aceptar',
        decline: 'Rechazar'
      }
    };

    const t = texts[lang] || texts.en;

    // Create banner element
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <p class="cookie-consent-message">${t.message}</p>
        <div class="cookie-consent-buttons">
          <button id="cookie-accept" class="cookie-btn cookie-btn-accept">${t.accept}</button>
          <button id="cookie-decline" class="cookie-btn cookie-btn-decline">${t.decline}</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookie-accept').addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      updateConsent(true);
      hideBanner();
    });

    document.getElementById('cookie-decline').addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'declined');
      updateConsent(false);
      hideBanner();
    });

    // Animate in
    requestAnimationFrame(() => {
      banner.classList.add('cookie-consent-visible');
    });
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('cookie-consent-visible');
      setTimeout(() => banner.remove(), 300);
    }
  }

  // Listen for language changes to update banner text
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'lang') {
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.remove();
        showConsentBanner();
      }
    }
  };
})();
