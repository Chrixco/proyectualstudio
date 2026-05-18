# Universal Lead Capture System - Complete Setup Guide

## Overview

A universal lead capture system has been implemented across all three calculators:
1. **Solar Calculator** (`/pages/solar-calculator.html`)
2. **Carbon Calculator** (`/pages/carbon-calculator.html`) 
3. **Budget Calculator** (`/pages/calculator.html`)

When users click the action buttons, a modal appears with:
- **Pre-populated calculator results** (automatic)
- **Contact form** (name, email, phone, company, message)
- **Email submission** via EmailJS

## What's Already Done

✅ Created universal lead capture JavaScript system (`/js/lead-capture.js`)
✅ Added lead capture modal to all three calculators
✅ Added data collectors for each calculator type
✅ Integrated EmailJS email sending
✅ Bilingual support (English/Spanish)
✅ Responsive design matching site aesthetic

## Setup Required - 4 Steps

### Step 1: Create EmailJS Account (2 minutes)

1. Go to: https://www.emailjs.com
2. Click **Sign Up Free**
3. Create an account (no credit card required)
4. Log in to dashboard

### Step 2: Connect Email Service (3 minutes)

1. In EmailJS dashboard, click **Email Services** (left menu)
2. Click **Add Service**
3. Choose **Gmail**
4. Click **Connect with Gmail**
5. Authenticate with the email you want to send TO
   - Use: `proyectualstudio@gmail.com` (or your preferred email)
6. Authorize and wait for confirmation
7. **Copy the Service ID** (format: `service_xxxxx`)
   - Keep this safe!

### Step 3: Create Email Template (5 minutes)

1. In EmailJS dashboard, click **Email Templates** (left menu)
2. Click **Create New Template**

**Template Settings:**
- Template Name: `Calculator Lead Notification`
- Template ID: `template_calculator_lead` (IMPORTANT: Use this exact ID)

**Email Subject:**
```
New Calculator Lead: {{from_name}} ({{calculator_type}})
```

**Email Body:**
```
📊 NEW CALCULATOR LEAD REQUEST

=== CUSTOMER INFORMATION ===
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Submission Date: {{submission_date}}

=== CALCULATOR TYPE ===
{{calculator_type}}

=== CALCULATOR RESULTS ===
{{location}}
{{roofArea}}
{{systemCost}}
{{annualSavings}}
{{paybackPeriod}}
{{buildingType}}
{{totalEmissions}}
{{discipline}}

=== CUSTOMER MESSAGE ===
{{message}}

---
This is an automated message from Proyectual Studio's Calculator Lead Capture System.
Contact the customer directly at: {{from_email}}
```

3. Click **Save Template**

### Step 4: Update Calculator Code (2 minutes)

Replace `YOUR_PUBLIC_KEY` in all three calculator files:

**File 1: `/pages/solar-calculator.html` (line ~1112)**
```javascript
// Change this:
emailjs.init('YOUR_PUBLIC_KEY');

// To your actual Public Key:
emailjs.init('pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
```

**File 2: `/pages/carbon-calculator.html` (line ~1348)**
```javascript
// Change this:
emailjs.init('YOUR_PUBLIC_KEY');

// To your actual Public Key:
emailjs.init('pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
```

**File 3: `/pages/calculator.html` (line ~1406)**
```javascript
// Change this:
emailjs.init('YOUR_PUBLIC_KEY');

// To your actual Public Key:
emailjs.init('pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
```

**Where to find your Public Key:**
1. In EmailJS dashboard
2. Click **Account** (top menu)
3. Copy the **Public Key**
4. Paste it in the `emailjs.init()` lines above

## How It Works

### Solar Calculator Flow
```
User adjusts sliders → Clicks "Get Solar Design"
                    ↓
Modal appears with pre-filled:
- Location, Roof Area, System Cost, Annual Savings, Payback Period
                    ↓
User fills name + email (required) + optional fields
                    ↓
Clicks "Send Request"
                    ↓
Email sent to proyectualstudio@gmail.com with ALL data
```

### Carbon Calculator Flow
```
User adjusts sliders → Clicks "Request Custom Analysis"
                    ↓
Modal appears with pre-filled:
- Total Emissions, Scope 1/2/3, Project Size, Location, Building Type
                    ↓
User fills name + email (required) + optional fields
                    ↓
Clicks "Send Request"
                    ↓
Email sent to proyectualstudio@gmail.com with ALL data
```

### Budget Calculator Flow
```
User sets parameters → Clicks "Get Detailed Quote"
                    ↓
Modal appears with pre-filled:
- Project Discipline, Location, Size, Estimated Cost
                    ↓
User fills name + email (required) + optional fields
                    ↓
Clicks "Send Request"
                    ↓
Email sent to proyectualstudio@gmail.com with ALL data
```

## What You'll Receive

Example email you'll get:

```
To: proyectualstudio@gmail.com
Subject: New Calculator Lead: Maria Garcia (Solar Design)

📊 NEW CALCULATOR LEAD REQUEST

=== CUSTOMER INFORMATION ===
Name: Maria Garcia
Email: maria@example.com
Phone: +34 912 345 678
Company: García Architecture Studio
Submission Date: 5/18/2026

=== CALCULATOR TYPE ===
Solar Design

=== CALCULATOR RESULTS ===
Location: Cuenca, Ecuador
Roof Area: 50 m²
System Cost: $150,000
Annual Savings: $1,800
Payback Period: 8.3 years

=== CUSTOMER MESSAGE ===
Interested in solar design for our office building. 
Can you provide a site visit quote?

---
Reply to: maria@example.com
```

## Testing

1. **Test Solar Calculator:**
   - Go to: http://localhost:8000/pages/solar-calculator.html
   - Adjust some sliders
   - Click **"Get Solar Design"**
   - Fill form with test data
   - Click **"Send Request"**
   - Check email inbox

2. **Test Carbon Calculator:**
   - Go to: http://localhost:8000/pages/carbon-calculator.html
   - Click **"Request Custom Analysis"**
   - Fill form
   - Check email

3. **Test Budget Calculator:**
   - Go to: http://localhost:8000/pages/calculator.html
   - Set some values
   - Click **"Get Detailed Quote"**
   - Check email

## Features

✅ **Automatic Data Population**
- Each calculator automatically extracts its specific data
- No manual entry needed for calculator results

✅ **Form Validation**
- Name required
- Email required and validated
- Phone/Company optional

✅ **Bilingual**
- Modal supports English & Spanish
- Uses site's language setting

✅ **Professional Design**
- Matches neo-brutalist site aesthetic
- Responsive on mobile
- Smooth animations

✅ **Lead Tracking**
- All customer contact info captured
- All calculator parameters saved
- Timestamp included
- Easy to follow up

## Customization

### Change Email Recipient
If you want leads sent to a different email:

1. In EmailJS, create a new email service or update existing
2. Update the `emailRecipient` in each calculator's initialization
3. Example for solar calculator (line ~1584):
```javascript
emailRecipient: 'your-email@example.com',
```

### Modify Email Content
Edit the template in EmailJS dashboard:
1. Email Templates → template_calculator_lead
2. Edit subject and body
3. Save

### Add More Data Fields
To capture additional data:
1. Add input field to modal HTML
2. Update the `dataCollector` function
3. Add field to email template

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Email service not configured" | Verify Public Key is correct |
| Email not received | Check spam folder, verify recipient email in service settings |
| Modal doesn't open | Verify `lead-capture.js` is imported before closing </body> |
| Template fields show as {{variable}} in email | Verify variable names in JavaScript match template exactly |
| Service ID error | Check Service ID starts with `service_` |

## Limits & Costs

- **EmailJS Free Tier**: 200 emails/month
- **No setup fee**
- **No per-email cost**
- Upgrade to paid plan if you exceed 200/month

## Next Steps

1. ✅ Follow the 4 setup steps above
2. ✅ Test each calculator
3. ✅ Start receiving leads!
4. Optional: Set up email automation/CRM integration
5. Optional: Track lead conversion metrics

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- JavaScript Console errors: Press F12 → Console tab
- Template Help: EmailJS Template Editor has helpful guides

---

**Summary**: You now have a professional lead capture system across all calculators that automatically collects user data and sends it to your email. Setup takes ~15 minutes and requires no coding knowledge beyond copying the Public Key.
