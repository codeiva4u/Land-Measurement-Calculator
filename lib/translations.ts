import type { Language, LandUnit } from '@/types';

/**
 * Translation dictionary for all UI text
 */
const translations = {
  en: {
    appTitle: 'Land Measurement Calculator',
    subtitle: 'Lucknow, Uttar Pradesh',
    calculator: 'Calculator',
    bulkConversion: 'Bulk Conversion',
    history: 'History',
    clearHistory: 'Clear History',
    print: 'Print',
    language: 'Language',
    enterValue: 'Enter value',
    noHistory: 'No conversion history yet',
    bulkInstructions: 'Enter values with units (e.g., "100 hectare", "50 bigha")',
    calculate: 'Calculate',
    clearResults: 'Clear Results',
    results: 'Results',
    units: {
      biswansi: 'Biswansi',
      biswa: 'Biswa',
      bigha: 'Bigha',
      hectare: 'Hectare',
      squareMeter: 'Square Meter',
      squareFeet: 'Square Feet',
    },
    formulas: {
      title: 'Conversion Formulas',
      biswaToSqM: '1 Biswa = 126.486 Square Meter',
      biswaToSqFt: '1 Biswa = 1361 Square Feet',
      biswaToHectare: '1 Biswa = 0.0126486 Hectare',
      biswaToSwansi: '1 Biswa = 20 Biswansi',
      bighaToBiswa: '1 Bigha = 20 Biswa',
      hectareToSqM: '1 Hectare = 10,000 Square Meter',
    },
  },
  hi: {
    appTitle: 'भूमि माप कैलकुलेटर',
    subtitle: 'लखनऊ, उत्तर प्रदेश',
    calculator: 'कैलकुलेटर',
    bulkConversion: 'बल्क रूपांतरण',
    history: 'इतिहास',
    clearHistory: 'इतिहास साफ़ करें',
    print: 'प्रिंट करें',
    language: 'भाषा',
    enterValue: 'मान दर्ज करें',
    noHistory: 'अभी तक कोई रूपांतरण इतिहास नहीं',
    bulkInstructions: 'इकाइयों के साथ मान दर्ज करें (उदाहरण: "100 hectare", "50 bigha")',
    calculate: 'गणना करें',
    clearResults: 'परिणाम साफ़ करें',
    results: 'परिणाम',
    units: {
      biswansi: 'बिस्वाँसी',
      biswa: 'बिस्वा',
      bigha: 'बीघा',
      hectare: 'हैक्टेयर',
      squareMeter: 'वर्ग मीटर',
      squareFeet: 'वर्ग फीट',
    },
    formulas: {
      title: 'रूपांतरण सूत्र',
      biswaToSqM: '1 बिस्वा = 126.486 वर्ग मीटर',
      biswaToSqFt: '1 बिस्वा = 1361 वर्ग फीट',
      biswaToHectare: '1 बिस्वा = 0.0126486 हैक्टेयर',
      biswaToSwansi: '1 बिस्वा = 20 बिस्वाँसी',
      bighaToBiswa: '1 बीघा = 20 बिस्वा',
      hectareToSqM: '1 हैक्टेयर = 10,000 वर्ग मीटर',
    },
  },
};

/**
 * Gets translation for a key in the specified language
 */
export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

/**
 * Gets unit name in the specified language
 */
export function getUnitName(unit: LandUnit, lang: Language): string {
  return t(`units.${unit}`, lang);
}
