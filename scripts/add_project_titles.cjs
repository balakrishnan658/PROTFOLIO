const fs = require('fs');
const path = require('path');
const sharp = require('../node_modules/sharp');

const projects = [
  {
    num: 1,
    title: 'Smart Bike Parking & Billing System',
    category: 'AI & IOT AUTOMATION',
    subtitle: 'Automated IoT Slot Allocation & Tariff Calculation Engine',
    tags: 'IoT • Python • Automation • Smart Billing'
  },
  {
    num: 2,
    title: 'SmartMart – AI Expiry & Smart Billing',
    category: 'COMPUTER VISION & RETAIL AI',
    subtitle: 'Vision-Based Expiry Date Recognition & Smart Checkout',
    tags: 'Computer Vision • OCR • Retail AI • Python'
  },
  {
    num: 3,
    title: 'Smart Break Recommendation System',
    category: 'MACHINE LEARNING & ANALYTICS',
    subtitle: 'Adaptive Ergonomic Health & Fatigue Monitoring Engine',
    tags: 'Machine Learning • Analytics • Ergonomics • Python'
  },
  {
    num: 4,
    title: 'BuildTrack AI Pro',
    category: 'SITE INTELLIGENCE & COMPUTER VISION',
    subtitle: 'Hazard Perimeter Tracking & Automated PPE Detection',
    tags: 'Deep Learning • YOLO • Site Safety • Computer Vision'
  },
  {
    num: 5,
    title: 'Smart Customer Behavior Platform',
    category: 'DATA SCIENCE & PREDICTIVE AI',
    subtitle: 'Customer Segmentation, Churn Analysis & KPI Telemetry',
    tags: 'Data Science • ML Clustering • Power BI • Analytics'
  },
  {
    num: 6,
    title: 'Network Intrusion Detection System',
    category: 'CYBERSECURITY & MACHINE LEARNING',
    subtitle: 'Real-Time Network Telemetry & Threat Defense Shield',
    tags: 'Machine Learning • Anomaly Detection • Cyber Defense'
  }
];

function escapeXml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function createTitleSvg(proj, width = 1280, height = 720) {
  const catWidth = Math.max(160, proj.category.length * 9.5 + 44);
  const safeCategory = escapeXml(proj.category);
  const safeTitle = escapeXml(proj.title);
  const safeSubtitle = escapeXml(proj.subtitle);
  const safeTags = escapeXml(proj.tags);

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#090014" stop-opacity="0" />
        <stop offset="25%" stop-color="#090014" stop-opacity="0.65" />
        <stop offset="60%" stop-color="#120B20" stop-opacity="0.94" />
        <stop offset="100%" stop-color="#090014" stop-opacity="0.98" />
      </linearGradient>
      <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#7B2CFF" stop-opacity="0" />
        <stop offset="20%" stop-color="#A855F7" stop-opacity="0.85" />
        <stop offset="80%" stop-color="#C084FC" stop-opacity="0.85" />
        <stop offset="100%" stop-color="#7B2CFF" stop-opacity="0" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.8" />
      </filter>
    </defs>

    <!-- Glass Gradient Backdrop at bottom -->
    <rect x="0" y="440" width="${width}" height="280" fill="url(#glassGrad)" />

    <!-- Neon Purple Top Accent Border -->
    <line x1="36" y1="515" x2="${width - 36}" y2="515" stroke="url(#borderGrad)" stroke-width="2.5" />

    <!-- Category Pill Badge -->
    <g transform="translate(42, 532)">
      <rect x="0" y="0" width="${catWidth}" height="28" rx="14" fill="#1B1035" fill-opacity="0.9" stroke="#A855F7" stroke-width="1.2" stroke-opacity="0.7" />
      <circle cx="16" cy="14" r="4.5" fill="#A855F7" />
      <text x="28" y="19" fill="#C084FC" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">${safeCategory}</text>
    </g>

    <!-- Project Title -->
    <text x="44" y="618" fill="#FFFFFF" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="34" font-weight="900" letter-spacing="0.2" filter="url(#shadow)">${safeTitle}</text>

    <!-- Project Subtitle & Tags -->
    <text x="44" y="658" fill="#B8A9CC" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="18" font-weight="500" letter-spacing="0.3">${safeSubtitle}</text>
    <text x="44" y="688" fill="#A855F7" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1">${safeTags}</text>
  </svg>
  `;
}

async function processAll() {
  const thumbDir = path.join(__dirname, '../public/assets/thumbnails');
  for (const proj of projects) {
    for (const sub of [1, 2, 3]) {
      const file = path.join(thumbDir, `project-${proj.num}-${sub}.jpg`);
      if (fs.existsSync(file)) {
        const fileBuffer = fs.readFileSync(file);
        const svg = Buffer.from(createTitleSvg(proj, 1280, 720));
        const buf = await sharp(fileBuffer)
          .resize(1280, 720, { fit: 'cover' })
          .composite([{ input: svg, top: 0, left: 0 }])
          .jpeg({ quality: 92 })
          .toBuffer();
        fs.writeFileSync(file, buf);
        console.log(`Updated project-${proj.num}-${sub}.jpg with project name & banner`);
      }
    }
  }
  console.log('All thumbnails updated with project titles successfully!');
}

processAll().catch(console.error);
