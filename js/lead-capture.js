/**
 * Universal Lead Capture System
 * Works with Solar, Carbon, and Budget Calculators
 * Automatically collects calculator data and sends via EmailJS
 */

class LeadCaptureSystem {
  constructor(options = {}) {
    this.calculatorType = options.calculatorType || 'unknown';
    this.emailRecipient = options.emailRecipient || 'proyectualstudio@gmail.com';
    this.serviceId = options.serviceId || 'service_calculator_leads';
    this.templateId = options.templateId || 'template_calculator_lead';
    this.dataCollector = options.dataCollector || this.defaultDataCollector;
  }

  /**
   * Open the lead capture modal
   */
  openModal() {
    const modal = document.getElementById('leadCaptureModal');
    if (!modal) {
      console.error('Lead capture modal not found in DOM');
      return;
    }

    // Collect calculator data
    const calculatorData = this.dataCollector();

    // Populate modal with calculator data
    this.populateModalSummary(calculatorData);

    // Clear form
    this.clearForm();

    // Clear previous messages
    const statusEl = document.getElementById('leadCaptureStatus');
    if (statusEl) statusEl.innerHTML = '';

    // Show modal
    modal.classList.add('active');
  }

  /**
   * Close the lead capture modal
   */
  closeModal() {
    const modal = document.getElementById('leadCaptureModal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.clearForm();
  }

  /**
   * Clear form fields
   */
  clearForm() {
    const fields = ['leadName', 'leadEmail', 'leadPhone', 'leadCompany', 'leadMessage'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }

  /**
   * Populate modal summary with calculator data
   */
  populateModalSummary(data) {
    // Set calculator type
    const typeEl = document.getElementById('leadCalculatorType');
    if (typeEl) typeEl.textContent = this.calculatorType;

    // Populate custom summary fields dynamically
    const summaryEl = document.getElementById('leadDataSummary');
    if (summaryEl && data.summary) {
      summaryEl.innerHTML = Object.entries(data.summary)
        .map(([key, value]) => `
          <div class="lead-summary-item">
            <span class="lead-summary-label">${this.formatLabel(key)}</span>
            <span class="lead-summary-value">${value}</span>
          </div>
        `)
        .join('');
    }

    // Store full data for sending
    this.currentCalculatorData = data.full || data.summary;
  }

  /**
   * Send the lead capture form
   */
  async sendLead() {
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const company = document.getElementById('leadCompany').value.trim();
    const message = document.getElementById('leadMessage').value.trim();

    // Validation
    if (!name) {
      this.showStatus('Please enter your name', 'error');
      return;
    }
    if (!email || !email.includes('@')) {
      this.showStatus('Please enter a valid email address', 'error');
      return;
    }

    // Disable button
    const button = document.querySelector('.lead-capture-button');
    if (button) {
      button.disabled = true;
      button.textContent = this.getCurrentLanguage() === 'en' ? 'Sending...' : 'Enviando...';
    }

    try {
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not configured');
      }

      // Prepare email parameters
      const emailParams = {
        to_email: this.emailRecipient,
        from_name: name,
        from_email: email,
        phone: phone || 'Not provided',
        company: company || 'Not provided',
        calculator_type: this.calculatorType,
        message: message || 'No additional message',
        submission_date: new Date().toLocaleDateString(),
        // Spread calculator-specific data
        ...this.currentCalculatorData
      };

      // Send via EmailJS
      await emailjs.send(this.serviceId, this.templateId, emailParams);

      // Success
      this.showStatus(
        this.getCurrentLanguage() === 'en'
          ? 'Thank you! We will contact you soon with a custom proposal.'
          : '¡Gracias! Nos contactaremos pronto con una propuesta personalizada.',
        'success'
      );

      // Close modal after 2 seconds
      setTimeout(() => this.closeModal(), 2000);
    } catch (error) {
      console.error('Lead capture error:', error);
      this.showStatus(
        this.getCurrentLanguage() === 'en'
          ? 'Error sending request. Please try again or email us directly.'
          : 'Error al enviar. Por favor intenta de nuevo.',
        'error'
      );
    } finally {
      // Re-enable button
      if (button) {
        button.disabled = false;
        button.textContent = this.getCurrentLanguage() === 'en'
          ? 'Send Request'
          : 'Enviar Solicitud';
      }
    }
  }

  /**
   * Show status message
   */
  showStatus(message, type) {
    const statusEl = document.getElementById('leadCaptureStatus');
    if (statusEl) {
      statusEl.className = `lead-status lead-status-${type}`;
      statusEl.textContent = message;
    }
  }

  /**
   * Format label from camelCase or snake_case to Title Case
   */
  formatLabel(str) {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
      .trim();
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return localStorage.getItem('lang') || 'en';
  }

  /**
   * Default data collector (override in calculator)
   */
  defaultDataCollector() {
    return {
      summary: { info: 'No calculator data available' },
      full: { info: 'No calculator data available' }
    };
  }
}

// Global instance
window.leadCapture = null;

/**
 * Initialize lead capture for a specific calculator
 */
function initializeLeadCapture(options) {
  window.leadCapture = new LeadCaptureSystem(options);

  // Attach close handler to modal overlay click
  const modal = document.getElementById('leadCaptureModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'leadCaptureModal') {
        window.leadCapture.closeModal();
      }
    });
  }

  // Attach send button handler
  const sendButton = document.querySelector('.lead-capture-button');
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      window.leadCapture.sendLead();
    });
  }
}

/**
 * Open lead capture modal
 */
function openLeadCaptureModal() {
  if (window.leadCapture) {
    window.leadCapture.openModal();
  } else {
    console.error('Lead capture system not initialized');
  }
}
