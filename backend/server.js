const express = require('express');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const emailjs = require('@emailjs/nodejs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Initialize EmailJS with credentials from environment variables
if (process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID) {
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  });
}

// Color palette matching the website
const COLORS = {
  yellow: '#FFD500',
  black: '#000000',
  white: '#FFFFFF',
  darkGray: '#1a1a1a',
  lightGray: '#f5f5f5',
  textPrimary: '#e0e0e0',
  accentLight: 'rgba(255, 213, 0, 0.2)'
};

// Utility function to add header
function addHeader(doc, title) {
  doc.fillColor(COLORS.yellow);
  doc.fontSize(24).font('Helvetica-Bold').text('PROYECTUAL STUDIO', 50, 40);
  doc.fontSize(14).font('Helvetica').text(title, 50, 70);

  // Yellow line
  doc.moveTo(50, 90).lineTo(550, 90).strokeColor(COLORS.yellow).lineWidth(3).stroke();

  doc.fillColor(COLORS.textPrimary);
}

// Utility function to add section title
function addSectionTitle(doc, title, yPos) {
  doc.fillColor(COLORS.yellow);
  doc.fontSize(12).font('Helvetica-Bold').text(title.toUpperCase(), 50, yPos);
  doc.moveTo(50, yPos + 18).lineTo(550, yPos + 18).strokeColor(COLORS.yellow).lineWidth(2).stroke();
  doc.fillColor(COLORS.textPrimary);
  return yPos + 35;
}

// Utility function to add key-value row
function addRow(doc, label, value, yPos, alternate = false) {
  const lineHeight = 20;

  if (alternate) {
    doc.rect(50, yPos - 5, 500, lineHeight).fill(COLORS.accentLight);
  }

  doc.fillColor(COLORS.yellow);
  doc.fontSize(10).font('Helvetica-Bold').text(label, 60, yPos);

  doc.fillColor(COLORS.textPrimary);
  doc.fontSize(10).font('Helvetica').text(value, 300, yPos);

  return yPos + lineHeight;
}

// Utility function to add footer
function addFooter(doc, email) {
  const pageHeight = doc.page.height;
  const footerY = pageHeight - 60;

  doc.moveTo(50, footerY).lineTo(550, footerY).strokeColor(COLORS.yellow).lineWidth(1).stroke();

  doc.fillColor(COLORS.textPrimary);
  doc.fontSize(9).text('Email: proyectualstudio@gmail.com', 50, footerY + 10);
  doc.fontSize(9).text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 50, footerY + 22);
  doc.fontSize(9).text(`User Email: ${email}`, 50, footerY + 34);
}

// Solar Calculator PDF
app.post('/generate-solar-pdf', (req, res) => {
  try {
    const { data, email } = req.body;
    const summary = data.summary || {};
    const full = data.full || {};

    const doc = new PDFDocument({ size: 'A4', margin: 0 });

    // Set background color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.darkGray);

    // Reset for content
    doc.fillColor(COLORS.textPrimary);

    // Header
    addHeader(doc, 'Solar Panel System Design');

    let yPos = 110;

    // System Details
    yPos = addSectionTitle(doc, 'System Details', yPos);
    yPos = addRow(doc, 'Location:', summary.location || 'Not specified', yPos);
    yPos = addRow(doc, 'Roof Area:', summary.roofArea || 'Not specified', yPos, true);
    yPos = addRow(doc, 'System Cost:', summary.systemCost || 'Not calculated', yPos);
    yPos = addRow(doc, 'Panel Type:', full.panelType || 'Not specified', yPos, true);
    yPos = addRow(doc, 'Orientation:', full.orientation || 'Not specified', yPos);
    yPos += 15;

    // Financial Analysis
    yPos = addSectionTitle(doc, 'Financial Analysis', yPos);
    yPos = addRow(doc, 'Annual Production:', summary.annualSavings || 'Not calculated', yPos);
    yPos = addRow(doc, 'Payback Period:', summary.paybackPeriod || 'Not calculated', yPos, true);
    yPos = addRow(doc, '30-Year Savings:', full.thirtyYearSavings || 'Not calculated', yPos);
    yPos += 15;

    // Additional Info
    yPos = addSectionTitle(doc, 'Additional Information', yPos);
    yPos = addRow(doc, 'Latitude:', full.latitude || 'Not specified', yPos);
    yPos = addRow(doc, 'Loss Factors:', full.lossFactors || 'Not specified', yPos, true);
    yPos = addRow(doc, 'Electricity Price:', full.electricityPrice || 'Not specified', yPos);
    yPos += 20;

    // Disclaimer
    doc.fillColor(COLORS.yellow);
    doc.fontSize(10).font('Helvetica-Bold').text('DISCLAIMER', 50, yPos);
    yPos += 20;

    doc.fillColor(COLORS.textPrimary);
    doc.fontSize(9).text(
      'This is an estimation based on standard solar irradiance data. Actual production depends on weather, shading, panel degradation, and installation quality.',
      50, yPos, { width: 500 }
    );

    // Footer
    addFooter(doc, email);

    // Send response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="proyectual-solar-design.pdf"');
    doc.pipe(res);
    doc.end();

  } catch (error) {
    console.error('Solar PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  }
});

// Carbon Calculator PDF
app.post('/generate-carbon-pdf', (req, res) => {
  try {
    const { data, email } = req.body;
    const summary = data.summary || {};
    const full = data.full || {};

    const doc = new PDFDocument({ size: 'A4', margin: 0 });

    // Set background color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.darkGray);
    doc.fillColor(COLORS.textPrimary);

    // Header
    addHeader(doc, 'Carbon Footprint Analysis');

    let yPos = 110;

    // Emissions Summary
    yPos = addSectionTitle(doc, 'Emissions Summary', yPos);
    yPos = addRow(doc, 'Total Emissions:', summary.totalEmissions || 'Not calculated', yPos);
    yPos = addRow(doc, 'Scope 1 Emissions:', summary.scope1 || 'Not calculated', yPos, true);
    yPos = addRow(doc, 'Scope 2 Emissions:', summary.scope2 || 'Not calculated', yPos);
    yPos = addRow(doc, 'Scope 3 Emissions:', summary.scope3 || 'Not calculated', yPos, true);
    yPos += 15;

    // Project Details
    yPos = addSectionTitle(doc, 'Project Details', yPos);
    yPos = addRow(doc, 'Location:', summary.location || 'Not specified', yPos);
    yPos = addRow(doc, 'Building Type:', summary.buildingType || 'Not specified', yPos, true);
    yPos = addRow(doc, 'Project Size:', summary.projectSize || 'Not specified', yPos);
    yPos += 15;

    // Material Breakdown
    yPos = addSectionTitle(doc, 'Material Breakdown', yPos);
    yPos = addRow(doc, 'Concrete Amount:', full.concreteAmount || 'Not specified', yPos);
    yPos = addRow(doc, 'Steel Amount:', full.steelAmount || 'Not specified', yPos, true);
    yPos = addRow(doc, 'Timber Amount:', full.timberAmount || 'Not specified', yPos);
    yPos += 20;

    // Disclaimer
    doc.fillColor(COLORS.yellow);
    doc.fontSize(10).font('Helvetica-Bold').text('DISCLAIMER', 50, yPos);
    yPos += 20;

    doc.fillColor(COLORS.textPrimary);
    doc.fontSize(9).text(
      'This carbon footprint analysis is based on standard environmental coefficients. Actual embodied carbon may vary based on specific materials, manufacturing processes, and transportation distances.',
      50, yPos, { width: 500 }
    );

    // Footer
    addFooter(doc, email);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="proyectual-carbon-analysis.pdf"');
    doc.pipe(res);
    doc.end();

  } catch (error) {
    console.error('Carbon PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  }
});

// Budget Calculator PDF
app.post('/generate-budget-pdf', (req, res) => {
  try {
    const { data, email } = req.body;
    const summary = data.summary || {};
    const full = data.full || {};

    const doc = new PDFDocument({ size: 'A4', margin: 0 });

    // Set background color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.darkGray);
    doc.fillColor(COLORS.textPrimary);

    // Header
    addHeader(doc, 'Project Budget Estimate');

    let yPos = 110;

    // Project Information
    yPos = addSectionTitle(doc, 'Project Information', yPos);
    yPos = addRow(doc, 'Project Type:', summary.discipline || 'Not specified', yPos);
    yPos = addRow(doc, 'Location:', summary.location || 'Not specified', yPos, true);
    yPos = addRow(doc, 'Project Size:', summary.size || 'Not specified', yPos);
    yPos += 15;

    // Financial Summary
    yPos = addSectionTitle(doc, 'Financial Summary', yPos);
    yPos = addRow(doc, 'Estimated Total Cost:', summary.estimatedCost || 'Not calculated', yPos);
    yPos += 20;

    // Cost Breakdown
    yPos = addSectionTitle(doc, 'Cost Details', yPos);
    yPos = addRow(doc, 'Project Discipline:', full.projectDiscipline || 'Not specified', yPos);
    yPos = addRow(doc, 'Project Location:', full.projectLocation || 'Not specified', yPos, true);
    yPos = addRow(doc, 'Project Size:', full.projectSize || 'Not specified', yPos);
    yPos = addRow(doc, 'Total Estimated Cost:', full.estimatedTotalCost || 'Not calculated', yPos, true);
    yPos += 20;

    // Notes
    doc.fillColor(COLORS.yellow);
    doc.fontSize(10).font('Helvetica-Bold').text('IMPORTANT NOTES', 50, yPos);
    yPos += 20;

    doc.fillColor(COLORS.textPrimary);
    doc.fontSize(9).text(
      'This is a preliminary budget estimate. Actual project costs may vary based on final design specifications, material selections, labor rates, and project complexity. We recommend consulting with our team for a detailed cost analysis.',
      50, yPos, { width: 500 }
    );

    // Footer
    addFooter(doc, email);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="proyectual-budget-estimate.pdf"');
    doc.pipe(res);
    doc.end();

  } catch (error) {
    console.error('Budget PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  }
});

// Solar Design Email (secure - credentials in environment variables)
app.post('/send-solar-design-email', async (req, res) => {
  try {
    if (!process.env.EMAILJS_PUBLIC_KEY || !process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID) {
      return res.status(500).json({
        success: false,
        error: 'Email service not configured on server'
      });
    }

    const { emailParams } = req.body;

    if (!emailParams || !emailParams.from_email || !emailParams.from_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required email parameters'
      });
    }

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      emailParams
    );

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: response.status
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'PDF Generator Service Running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ PDF Generator running on http://localhost:${PORT}`);
});
