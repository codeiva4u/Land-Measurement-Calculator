'use client';

import { useStore } from '@/store/useStore';
import { getUnitName, t } from '@/lib/translations';
import { formatNumber } from '@/lib/conversions';
import type { LandUnit } from '@/types';
import { Printer } from 'lucide-react';

/**
 * Print view component for generating printable conversion reports
 */
export default function PrintView() {
  const { language, history } = useStore();

  const handlePrint = () => {
    window.print();
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        {language === 'hi' 
          ? 'प्रिंट करने के लिए कोई डेटा नहीं' 
          : 'No data to print'}
      </div>
    );
  }

  const units: LandUnit[] = ['biswa', 'squareFeet', 'squareMeter', 'bigha', 'hectare'];

  return (
    <div>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-6 py-2.5 mb-6 bg-green-600 hover:bg-green-700 
                 text-white font-medium rounded-lg transition-colors print:hidden"
      >
        <Printer size={18} />
        {language === 'hi' ? 'प्रिंट करें' : 'Print'}
      </button>

      {/* Print-only content */}
      <div className="print:block">
        <div className="print-header mb-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            {t('appTitle', language)}
          </h1>
          <p className="text-center text-gray-600">
            {t('subtitle', language)}
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            {new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
          </p>
        </div>

        <div className="space-y-6">
          {history.slice(0, 20).map((entry, index) => (
            <div key={entry.id} className="border border-gray-300 rounded-lg p-4 break-inside-avoid">
              <div className="flex justify-between items-center mb-3 pb-2 border-b">
                <span className="font-semibold">
                  {language === 'hi' ? 'रूपांतरण' : 'Conversion'} #{index + 1}
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(entry.timestamp).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {units.map((unit) => (
                  <div key={unit} className="flex justify-between py-1">
                    <span className="font-medium">{getUnitName(unit, language)}:</span>
                    <span>{formatNumber(entry.values[unit], unit)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Formulas Section */}
        <div className="mt-8 pt-8 border-t border-gray-300 break-inside-avoid">
          <h2 className="text-xl font-bold mb-4">{t('formulas.title', language)}</h2>
          <ul className="space-y-2 text-sm">
            <li>• {t('formulas.biswaToSqM', language)}</li>
            <li>• {t('formulas.biswaToSqFt', language)}</li>
            <li>• {t('formulas.biswaToHectare', language)}</li>
            <li>• {t('formulas.bighaToBiswa', language)}</li>
            <li>• {t('formulas.hectareToSqM', language)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
