# PDF Generator Service for Proyectual Studio

A Node.js backend service that generates professional PDFs for the three calculators using your neo-brutalist design and color scheme.

## Features

✅ **Solar Calculator PDF** - System details, financial analysis, production estimates
✅ **Carbon Calculator PDF** - Emissions breakdown, material analysis, environmental data
✅ **Budget Calculator PDF** - Project information, cost breakdown, financial summary
✅ **Branded Design** - Uses Proyectual Studio colors (yellow #FFD500, black, dark theme)
✅ **Professional Layout** - Tables, sections, footers with timestamp and user email
✅ **Reliable Generation** - Server-side PDF generation using pdfkit library

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start the Service

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The service will run on `http://localhost:3001`

## API Endpoints

### 1. Solar Calculator PDF
**POST** `/generate-solar-pdf`

```json
{
  "email": "user@example.com",
  "data": {
    "summary": {
      "location": "Cuenca, Ecuador",
      "roofArea": "50 m²",
      "systemCost": "$150,000",
      "annualSavings": "$1,800",
      "paybackPeriod": "8.3 years"
    },
    "full": {
      "location": "Cuenca, Ecuador",
      "latitude": "2.9°",
      "roofArea": "50 m²",
      "panelType": "Standard (18%)",
      "orientation": "0°",
      "lossFactors": "15%",
      "electricityPrice": "$0.12/kWh",
      "costPerKw": "$3,000/kW",
      "systemCost": "$150,000",
      "annualProduction": "7,250 kWh/year",
      "annualSavings": "$1,800/year",
      "paybackPeriod": "8.3 years",
      "thirtyYearSavings": "$32,400"
    }
  }
}
```

### 2. Carbon Calculator PDF
**POST** `/generate-carbon-pdf`

```json
{
  "email": "user@example.com",
  "data": {
    "summary": {
      "totalEmissions": "450 kgCO₂e/m²",
      "scope1": "50 kgCO₂e/m²",
      "scope2": "80 kgCO₂e/m²",
      "scope3": "320 kgCO₂e/m²",
      "projectSize": "5000 m²",
      "location": "Quito, Ecuador",
      "buildingType": "Mixed Use"
    },
    "full": {
      "totalEmissions": "450 kgCO₂e/m²",
      "scope1Emissions": "50 kgCO₂e/m²",
      "scope2Emissions": "80 kgCO₂e/m²",
      "scope3Emissions": "320 kgCO₂e/m²",
      "projectSize": "5000 m²",
      "location": "Quito, Ecuador",
      "buildingType": "Mixed Use",
      "concreteAmount": "1200 m³",
      "steelAmount": "150000 kg",
      "timberAmount": "300 m³"
    }
  }
}
```

### 3. Budget Calculator PDF
**POST** `/generate-budget-pdf`

```json
{
  "email": "user@example.com",
  "data": {
    "summary": {
      "discipline": "Architecture",
      "location": "Cuenca, Ecuador",
      "size": "5000 m²",
      "estimatedCost": "$2,500,000"
    },
    "full": {
      "projectDiscipline": "Architecture",
      "projectLocation": "Cuenca, Ecuador",
      "projectSize": "5000 m²",
      "estimatedTotalCost": "$2,500,000"
    }
  }
}
```

## Response

All endpoints return a PDF file with:
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename="proyectual-*.pdf"`

The PDF will automatically download to the user's computer.

## Design Details

### Colors Used
- **Primary Yellow:** #FFD500 (headings, accents, borders)
- **Background:** #1a1a1a (dark gray, matches site theme)
- **Text Primary:** #e0e0e0 (light gray, readable on dark background)
- **Accent Light:** rgba(255, 213, 0, 0.2) (subtle background highlights)

### PDF Structure
1. **Header** - Proyectual Studio branding, document title, yellow border
2. **Sections** - Grouped information with section titles and dividers
3. **Data Rows** - Key-value pairs with alternating background colors
4. **Disclaimer** - Important information about calculations
5. **Footer** - Email, generation timestamp, user email address

## Deployment

### Local Development
```bash
npm run dev
```

### Production Options

**1. Heroku**
```bash
heroku create proyectual-pdf-generator
git push heroku main
```

**2. AWS EC2**
Deploy to EC2 instance and use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js
pm2 save
```

**3. Google Cloud Run**
```bash
gcloud run deploy proyectual-pdf-generator --source .
```

**4. DigitalOcean App Platform**
Connect GitHub repo and auto-deploy

## Updating the Calculators

Update each calculator HTML file to call the backend instead of html2pdf.js:

```javascript
// Replace the generateCalculatorPDF function with:
window.generateCalculatorPDF = async function(email) {
  try {
    const leadData = {
      calculatorType: 'Solar Design',
      data: { /* calculator data */ }
    };

    const response = await fetch('http://localhost:3001/generate-solar-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, data: leadData.data })
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proyectual-solar-design.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('Error generating PDF. Please try again.');
  }
};
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in server.js or kill process on port 3001 |
| CORS errors | Ensure cors() middleware is enabled (it is by default) |
| PDF is blank | Check that data object structure matches expected format |
| Node modules not installing | Delete package-lock.json and node_modules, run npm install again |

## Future Enhancements

- [ ] Email PDFs directly instead of downloading
- [ ] Store PDFs in cloud storage (AWS S3, Google Cloud)
- [ ] Add charts/graphs to PDFs (using chart libraries)
- [ ] Support multiple languages
- [ ] Add watermarks/digital signatures
- [ ] Generate multi-page reports with detailed analysis

## Support

For issues or questions, contact: proyectualstudio@gmail.com
