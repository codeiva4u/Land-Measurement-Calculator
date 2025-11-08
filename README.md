# 🏞️ भूमि मापन कैलकुलेटर - Land Measurement Calculator

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/land-calculator)

**एक पेशेवर भूमि मापन कैलकुलेटर** जो लखनऊ, उत्तर प्रदेश की स्थानीय इकाइयों के बीच रियल-टाइम रूपांतरण प्रदान करता है।

**A professional land measurement calculator** providing real-time conversions between local units used in Lucknow, Uttar Pradesh.

## ✨ Features

### मुख्य विशेषताएँ (Core Features)

- ⚡ **Real-time Conversion** - किसी भी इकाई में मान टाइप करें और सभी अन्य इकाइयों में तुरंत रूपांतरण देखें
- 🌍 **Bilingual Support** - हिंदी और अंग्रेजी दोनों भाषाओं में उपलब्ध
- 📊 **Bulk Conversion** - एक साथ कई मानों का रूपांतरण करें
- 📜 **Conversion History** - पिछले सभी रूपांतरणों का इतिहास देखें
- 🖨️ **Print Reports** - प्रिंट-फ्रेंडली रिपोर्ट बनाएं
- 📱 **PWA Support** - ऑफलाइन काम करने वाला Progressive Web App
- 🎨 **Beautiful UI** - डार्क थीम के साथ ग्लास-ब्लर इफेक्ट
- 📱 **Fully Responsive** - मोबाइल, टैबलेट और डेस्कटॉप पर बेहतरीन अनुभव

### Supported Units (समर्थित इकाइयाँ)

- **बिस्वा (Biswa)**
- **बीघा (Bigha)**
- **हैक्टेयर (Hectare)**
- **वर्ग मीटर (Square Meter)**
- **वर्ग फीट (Square Feet)**

## 📐 Conversion Formulas

### Base Formulas (मूल सूत्र)

```
1 बिस्वा (Biswa) = 126.486 वर्ग मीटर (Square Meter)
1 बिस्वा (Biswa) = 1361 वर्ग फीट (Square Feet)
1 बिस्वा (Biswa) = 0.0126486 हैक्टेयर (Hectare)
1 बीघा (Bigha) = 20 बिस्वा (Biswa)
1 हैक्टेयर (Hectare) = 10,000 वर्ग मीटर (Square Meter)
```

### Derived Formulas (व्युत्पन्न सूत्र)

```
1 बीघा (Bigha) = 2529.72 वर्ग मीटर (Square Meter)
1 बीघा (Bigha) = 27,220 वर्ग फीट (Square Feet)
1 बीघा (Bigha) = 0.252972 हैक्टेयर (Hectare)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 या उससे ऊपर
- **npm** 9.0.0 या उससे ऊपर

### Installation Steps

1. **Clone या Download करें:**
   ```bash
   # If using git
   git clone <your-repo-url>
   cd property-calculator
   
   # Or simply extract the folder if downloaded as ZIP
   ```

2. **Dependencies Install करें:**
   ```bash
   npm install
   ```

3. **Development Server Start करें:**
   ```bash
   npm run dev
   ```

4. **Browser में खोलें:**
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15+** | React फ्रेमवर्क (App Router के साथ) |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first CSS framework |
| **Zustand** | State management |
| **Lucide React** | Beautiful icons |

## 📁 Project Structure

```
property-calculator/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Calculator.tsx     # Real-time calculator
│   ├── BulkConversion.tsx # Bulk conversion feature
│   ├── History.tsx        # Conversion history
│   ├── PrintView.tsx      # Print-friendly view
│   └── LanguageSwitcher.tsx # Language toggle
├── lib/                   # Utility functions
│   ├── conversions.ts     # Conversion logic
│   └── translations.ts    # Translation utilities
├── store/                 # State management
│   └── useStore.ts        # Zustand store
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
├── next.config.js         # Next.js config
└── vercel.json            # Vercel deployment config
```

## 🌐 Deployment

### Deploy to Vercel (One-Click)

1. **GitHub पर Push करें** (optional):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercel पर Deploy करें**:
   - [Vercel](https://vercel.com) पर जाएं और Sign In करें
   - "New Project" क्लिक करें
   - Repository select करें या drag & drop करें
   - "Deploy" बटन क्लिक करें
   - ✅ Done! आपका ऐप live है

### Alternative: Manual Deploy

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 PWA Installation

यह ऐप Progressive Web App है, इसे install किया जा सकता है:

1. **Mobile (Android/iOS)**:
   - Browser में खोलें
   - "Add to Home Screen" या "Install App" option देखें
   - Install करें

2. **Desktop (Chrome/Edge)**:
   - Address bar में Install icon देखें
   - या Settings → Install app

## 🎨 Customization

### Colors बदलें

`tailwind.config.ts` में colors customize करें:
```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Formulas बदलें

`lib/conversions.ts` में conversion constants update करें:
```typescript
const BISWA_TO_SQUARE_METER = 126.486; // अपना मान डालें
```

### Translations बदलें

`lib/translations.ts` में text update करें।

## 🧪 Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🐛 Troubleshooting

### Issue: Dependencies install नहीं हो रहे
```bash
# Cache clear करें
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fail हो रही है
```bash
# Type errors check करें
npm run type-check

# ESLint errors check करें
npm run lint
```

### Issue: PWA काम नहीं कर रहा
- HTTPS पर host करें (Vercel automatically करता है)
- Browser cache clear करें
- Icons add करें (देखें `public/ICONS_README.txt`)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for the people of Lucknow, Uttar Pradesh

## 🙏 Acknowledgments

- भारतीय स्थानीय भूमि मापन प्रणाली पर आधारित
- Based on Indian local land measurement systems
- लखनऊ, उत्तर प्रदेश के मानक (Lucknow, UP standards)

---

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

**Made with Next.js 15+ • TypeScript • Tailwind CSS • Vercel**
