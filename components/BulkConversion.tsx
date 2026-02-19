'use client';

import { useState } from 'react';
import type { LandUnit, BulkConversionResult } from '@/types';
import { convertValue, formatNumber } from '@/lib/conversions';
import { getUnitName } from '@/lib/translations';
import { useStore } from '@/store/useStore';
import { Calculator, X, AlertCircle } from 'lucide-react';

/**
 * Unit alias mapping — supports user-friendly names
 * Maps various input formats to internal LandUnit keys
 */
const UNIT_ALIASES: Record<string, LandUnit> = {
  // Biswansi aliases
  biswansi: 'biswansi',
  'biswasi': 'biswansi',
  'बिस्वाँसी': 'biswansi',
  'बिस्वांसी': 'biswansi',

  // Biswa aliases
  biswa: 'biswa',
  'bisva': 'biswa',
  'बिस्वा': 'biswa',

  // Bigha aliases
  bigha: 'bigha',
  'बीघा': 'bigha',

  // Hectare aliases
  hectare: 'hectare',
  'हैक्टेयर': 'hectare',
  ha: 'hectare',

  // Square Meter aliases
  squaremeter: 'squareMeter',
  'sq meter': 'squareMeter',
  'sq m': 'squareMeter',
  'square meter': 'squareMeter',
  'square meters': 'squareMeter',
  sqm: 'squareMeter',
  'वर्ग मीटर': 'squareMeter',
  'm2': 'squareMeter',

  // Square Feet aliases
  squarefeet: 'squareFeet',
  'sq ft': 'squareFeet',
  'sq feet': 'squareFeet',
  'square feet': 'squareFeet',
  'square foot': 'squareFeet',
  sqft: 'squareFeet',
  'वर्ग फीट': 'squareFeet',
  'ft2': 'squareFeet',
};

/**
 * Resolves a user-typed unit string to a LandUnit
 */
function resolveUnit(unitStr: string): LandUnit | null {
  const normalized = unitStr.trim().toLowerCase();
  return UNIT_ALIASES[normalized] || null;
}

/**
 * Bulk conversion component for converting multiple values at once
 */
export default function BulkConversion() {
  const { language } = useStore();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<BulkConversionResult[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  /**
   * Parses bulk input and performs conversions
   */
  const handleCalculate = () => {
    const lines = input.trim().split('\n').filter(line => line.trim());
    const newResults: BulkConversionResult[] = [];
    const newErrors: string[] = [];

    for (const line of lines) {
      // Parse format: "100 hectare" or "50 bigha" or "1000 sq meter"
      const match = line.trim().match(/^([\d.]+)\s+(.+)$/);

      if (match) {
        const value = parseFloat(match[1]);
        const unitStr = match[2];
        const unit = resolveUnit(unitStr);

        if (unit && !isNaN(value) && isFinite(value) && value >= 0) {
          const converted = convertValue(value, unit);
          newResults.push({
            input: { value, unit },
            converted,
          });
        } else if (!unit) {
          newErrors.push(
            language === 'hi'
              ? `❌ अज्ञात इकाई: "${unitStr}" (लाइन: "${line.trim()}")`
              : `❌ Unknown unit: "${unitStr}" (line: "${line.trim()}")`
          );
        } else {
          newErrors.push(
            language === 'hi'
              ? `❌ अमान्य मान: "${line.trim()}"`
              : `❌ Invalid value: "${line.trim()}"`
          );
        }
      } else {
        newErrors.push(
          language === 'hi'
            ? `❌ गलत प्रारूप: "${line.trim()}" — सही प्रारूप: "100 hectare"`
            : `❌ Invalid format: "${line.trim()}" — correct format: "100 hectare"`
        );
      }
    }

    setResults(newResults);
    setErrors(newErrors);
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
    setErrors([]);
  };

  const units: LandUnit[] = ['biswa', 'biswansi', 'squareFeet', 'squareMeter', 'bigha', 'hectare'];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label htmlFor="bulk-input" className="block text-sm font-medium text-gray-300 mb-2">
          {language === 'hi'
            ? 'इकाइयों के साथ मान दर्ज करें'
            : 'Enter values with units'}
        </label>
        <textarea
          id="bulk-input"
          aria-label={language === 'hi' ? 'बल्क रूपांतरण मान दर्ज करें' : 'Enter bulk conversion values'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            language === 'hi'
              ? '100 hectare\n50 bigha\n1000 sq meter\n5000 sq ft'
              : '100 hectare\n50 bigha\n1000 sq meter\n5000 sq ft'
          }
          rows={6}
          className="w-full px-5 py-4 bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150
                   border border-white/[0.12] rounded-xl text-white placeholder-gray-600 
                   shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]
                   focus:outline-none focus:ring-2 focus:ring-blue-400/40 
                   focus:border-blue-400/30 focus:bg-white/[0.06]
                   focus:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.5)]
                   hover:bg-white/[0.06] hover:border-white/[0.18]
                   transition-all duration-300 resize-none font-mono text-sm"
        />
        <p className="mt-2 text-xs text-gray-400">
          {language === 'hi'
            ? 'प्रारूप: मान इकाई (उदाहरण: 100 hectare, 50 bigha, 1000 sq meter, 5000 sq ft)'
            : 'Format: value unit (e.g., 100 hectare, 50 bigha, 1000 sq meter, 5000 sq ft)'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCalculate}
          disabled={!input.trim()}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                   disabled:bg-gray-600 disabled:cursor-not-allowed
                   text-white font-medium rounded-lg transition-colors"
        >
          <Calculator size={18} />
          {language === 'hi' ? 'गणना करें' : 'Calculate'}
        </button>

        {(input || results.length > 0) && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 
                     text-white font-medium rounded-lg transition-colors border border-white/20"
          >
            <X size={18} />
            {language === 'hi' ? 'साफ़ करें' : 'Clear'}
          </button>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-red-400 font-medium text-sm mb-2">
            <AlertCircle size={16} />
            {language === 'hi' ? 'कुछ लाइनें पार्स नहीं हो सकीं:' : 'Some lines could not be parsed:'}
          </div>
          {errors.map((error, i) => (
            <p key={i} className="text-xs text-red-300">{error}</p>
          ))}
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {language === 'hi' ? 'परिणाम' : 'Results'}
          </h3>

          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg 
                         border border-white/20 rounded-xl p-5 shadow-lg
                         hover:from-white/15 hover:to-white/10 hover:border-white/30
                         transition-all duration-300">
                <div className="text-sm text-blue-400 font-medium mb-3">
                  {formatNumber(result.input.value, result.input.unit)} {getUnitName(result.input.unit, language)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {units.map((unit) => (
                    <div key={unit} className="flex justify-between">
                      <span className="text-gray-300">{getUnitName(unit, language)}:</span>
                      <span className="text-white font-medium">
                        {formatNumber(result.converted[unit], unit)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
