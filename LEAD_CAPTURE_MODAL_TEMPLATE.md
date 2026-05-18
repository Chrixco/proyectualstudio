# Universal Lead Capture Modal Template

This is the reusable modal that should be added to all calculators.

## HTML to Add (paste before closing </body> tag)

```html
<!-- Universal Lead Capture Modal -->
<div class="modal-overlay" id="leadCaptureModal">
  <div class="modal-content">
    <button class="modal-close" onclick="openLeadCaptureModal && window.leadCapture.closeModal()">&times;</button>
    
    <div class="modal-header">
      <span data-en="Request Custom Design" data-es="Solicitar Diseño Personalizado">Request Custom Design</span>
      <span style="font-size: 0.7rem; opacity: 0.7;">(<span id="leadCalculatorType">Calculator</span>)</span>
    </div>

    <!-- Calculator Data Summary -->
    <div class="modal-section">
      <div class="modal-section-title" data-en="Your Results" data-es="Tus Resultados">Your Results</div>
      <div id="leadDataSummary"></div>
    </div>

    <!-- Contact Information -->
    <div class="modal-section">
      <div class="modal-section-title" data-en="Contact Information" data-es="Información de Contacto">Contact Information</div>
      <input type="text" class="modal-input" id="leadName" placeholder="Your Name / Tu Nombre" required>
      <input type="email" class="modal-input" id="leadEmail" placeholder="your@email.com" required>
      <input type="tel" class="modal-input" id="leadPhone" placeholder="+1 (555) 123-4567">
      <input type="text" class="modal-input" id="leadCompany" placeholder="Company Name / Nombre de Empresa">
    </div>

    <!-- Message -->
    <div class="modal-section">
      <div class="modal-section-title" data-en="Message" data-es="Mensaje">Message (Optional)</div>
      <textarea class="modal-input" id="leadMessage" placeholder="Tell us about your project / Cuéntanos sobre tu proyecto" rows="4" style="resize: vertical;"></textarea>
    </div>

    <!-- Status Message -->
    <div id="leadCaptureStatus"></div>

    <!-- Send Button -->
    <button class="modal-button lead-capture-button" data-en="Send Request" data-es="Enviar Solicitud">Send Request</button>
  </div>
</div>
```

## CSS Styles (already included in solar-calculator.html)

The modal-overlay, modal-content, modal-input, and modal-button styles are already defined in the solar calculator. Make sure to include these in the calculator page or in a shared CSS file:

```css
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.modal-overlay.active {
  display: flex;
}

.modal-content {
  background: var(--bg-primary);
  border: 4px solid var(--brutalist-yellow);
  border-radius: var(--panel-border-radius);
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 40px var(--brutalist-yellow);
  position: relative;
  animation: slideIn 0.3s ease;
}

.modal-header {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--brutalist-yellow);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 3px solid var(--brutalist-yellow);
  padding-bottom: 1rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--brutalist-yellow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  transform: rotate(90deg);
}

.modal-section {
  margin-bottom: 1.5rem;
}

.modal-section-title {
  font-weight: bold;
  text-transform: uppercase;
  color: var(--brutalist-yellow);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  letter-spacing: 1px;
}

.modal-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--brutalist-yellow);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  border-radius: var(--panel-border-radius);
  transition: all 0.3s ease;
}

.modal-input:focus {
  outline: none;
  background: var(--bg-primary);
  box-shadow: 0 0 10px var(--brutalist-yellow);
}

.modal-button {
  width: 100%;
  padding: 1rem;
  background: var(--brutalist-yellow);
  color: var(--brutalist-black);
  border: 3px solid var(--brutalist-black);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: var(--panel-border-radius);
  transition: all 0.3s ease;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
}

.modal-button:hover:not(:disabled) {
  transform: translate(-3px, -3px);
  box-shadow: 6px 6px 0px var(--brutalist-black);
}

.modal-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lead-summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--accent-light);
  font-size: 0.9rem;
}

.lead-summary-label {
  font-weight: bold;
  color: var(--brutalist-yellow);
  text-transform: uppercase;
}

.lead-summary-value {
  color: var(--text-primary);
}

.lead-status {
  padding: 1rem;
  border-radius: var(--panel-border-radius);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
}

.lead-status-success {
  background: rgba(144, 238, 144, 0.2);
  color: #90EE90;
  border: 2px solid #90EE90;
}

.lead-status-error {
  background: rgba(255, 107, 107, 0.2);
  color: #FF6B6B;
  border: 2px solid #FF6B6B;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## JavaScript Integration

### Step 1: Add script import (in <head>)
```html
<script src="../js/lead-capture.js"></script>
```

### Step 2: Initialize with calculator-specific data collector

```javascript
// Initialize lead capture for your calculator
initializeLeadCapture({
  calculatorType: 'Solar Design', // Change based on calculator
  emailRecipient: 'proyectualstudio@gmail.com', // Your email
  serviceId: 'service_calculator_leads',
  templateId: 'template_calculator_lead',
  dataCollector: function() {
    // Collect data from YOUR calculator
    return {
      summary: {
        location: document.getElementById('modalLocation').textContent,
        roofArea: document.getElementById('modalArea').textContent,
        systemCost: document.getElementById('modalCost').textContent,
        annualSavings: document.getElementById('modalSavings').textContent
      },
      full: {
        // All calculator data as key-value pairs
        location: 'Cuenca, Ecuador',
        roofArea: '50 m²',
        systemCost: '$150,000',
        annualSavings: '$1,800/yr'
        // etc...
      }
    };
  }
});
```

### Step 3: Add button to your calculator

Replace link or button with:
```html
<button onclick="openLeadCaptureModal()" class="cta-final">
  <span data-en="Request Custom Design" data-es="Solicitar Diseño Personalizado">Request Custom Design</span>
</button>
```

## Benefits

✅ Single modal component used across all calculators
✅ Automatic data population based on calculator inputs
✅ Unified email system via EmailJS
✅ Lead capture for all calculator types
✅ Bilingual support (English/Spanish)
✅ Mobile responsive
✅ Professional design matching site aesthetic

## Customization per Calculator

For each calculator, you only need to customize the `dataCollector` function to pull the relevant data from that specific calculator.
