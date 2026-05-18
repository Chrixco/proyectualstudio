# EmailJS Setup Guide for Solar Calculator Lead Capture

## Overview
The solar calculator has a built-in lead capture system that sends customer inquiries to your email with all their solar design parameters pre-filled. This guide will help you set it up.

## Step-by-Step Setup

### 1. Create EmailJS Account
- Visit: https://www.emailjs.com
- Click **Sign Up**
- Create a free account (no credit card required)

### 2. Get Your Public Key
- Log in to EmailJS dashboard
- Click **Account** (top menu)
- Copy your **Public Key** (visible in the Account section)
- You'll use this in Step 5

### 3. Set Up Email Service (Gmail Example)
- In EmailJS dashboard, go to **Email Services** (left menu)
- Click **Add Service**
- Choose **Gmail**
- Click **Connect with Gmail**
- Follow the OAuth flow to connect your Gmail account
- **Important**: This should be your Proyectual Studio email (proyectualstudio@gmail.com)
- Copy the **Service ID** (e.g., `service_xxxxx`)

### 4. Create Email Template
- Go to **Email Templates** (left menu)
- Click **Create New Template**
- Set **Template Name**: `Solar Lead Notification`
- Set **Template ID**: `template_solar_lead`
- Configure the template:

**Email Subject:**
```
New Solar Design Request from {{from_name}}
```

**Email Body:**
```
A new customer has requested a solar design!

=== CUSTOMER INFORMATION ===
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Date: {{submission_date}}

=== SOLAR DESIGN PARAMETERS ===
Location: {{location}}
Roof Area: {{roof_area}}
Panel Type: {{panel_type}}
Annual Production: {{annual_production}}

=== FINANCIAL ANALYSIS ===
System Cost: {{system_cost}}
Annual Savings: {{annual_savings}}
Payback Period: {{payback_period}}
30-Year Savings: {{thirty_year_savings}}

=== MESSAGE FROM CUSTOMER ===
{{message}}

---
This is an automated message from your Solar Calculator tool.
Reply to {{from_email}} to follow up with the customer.
```

- Click **Save**

### 5. Update Solar Calculator Code

Open `/pages/solar-calculator.html` and find these lines (around line 1111):

**Replace this:**
```javascript
// TODO: Replace with your EmailJS Public Key from https://dashboard.emailjs.com/admin/account
emailjs.init('YOUR_PUBLIC_KEY');
```

**With your actual Public Key:**
```javascript
emailjs.init('pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); // Your actual public key
```

**And replace these lines (around line 1546):**
```javascript
emailjs.send(
  'service_solar_design', // Your EmailJS Service ID
  'template_solar_lead', // Your EmailJS Template ID
```

**With your actual credentials:**
```javascript
emailjs.send(
  'service_xxxxx', // Your actual Service ID from EmailJS
  'template_solar_lead', // Keep this as the template ID
```

### 6. Update Recipient Email (Optional)

If you want to send to a different email address, find line 1521:

**Current:**
```javascript
to_email: 'proyectualstudio@gmail.com',
```

**Change to:**
```javascript
to_email: 'your-email@example.com',
```

### 7. Test It Out!

1. Go to http://localhost:8000/pages/solar-calculator.html
2. Adjust some slider values
3. Click **"Get Solar Design"** button
4. Fill in the form with test data
5. Click **"Send Solar Design Request"**
6. Check your email - you should receive the lead notification

## What the User Sees

When a visitor clicks **"Obtener Diseño Solar"** (Get Solar Design):

1. ✅ A floating modal appears
2. ✅ Pre-filled with their calculator values:
   - Location
   - Roof area
   - System cost estimate
   - Annual savings estimate
   - Payback period
3. ✅ They fill in their contact info:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Company (optional)
   - Message (optional)
4. ✅ They click "Send Solar Design Request"
5. ✅ Email is sent to your inbox with all the information

## What You Receive

You'll get emails with:
- Customer contact information
- All their solar design parameters
- Financial analysis results
- Any additional message they provided
- Date/time of submission

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Email service not configured" | Make sure you've added your Public Key in Step 5 |
| Email not received | Check spam folder, verify email service is connected in EmailJS |
| Template variables not filling in | Verify template variable names match exactly (case-sensitive) |
| Service ID error | Copy the exact Service ID from EmailJS (starts with `service_`) |

## Security Notes

- The Public Key is safe to expose in frontend code (it's meant to be public)
- Never share your Service ID or Template ID in repositories
- The email gets sent through EmailJS servers, not directly from your site
- Each free EmailJS account allows 200 emails/month

## Next Steps

1. Set up automated responses to customers
2. Track which design parameters are most popular
3. Follow up with leads and convert to customers
4. Integrate with CRM (optional)

---

**Questions?** Check EmailJS documentation: https://www.emailjs.com/docs/
