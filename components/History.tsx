'use client';

import { useStore } from '@/store/useStore';
import { getUnitName } from '@/lib/translations';
import { formatNumber } from '@/lib/conversions';
import { Trash2 } from 'lucide-react';
import type { LandUnit } from '@/types';

/**
 * History component showing past conversions
 */
export default function History() {
  const { language, history, clearHistory } = useStore();

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        {language === 'hi' ? 'अभी तक कोई रूपांतरण इतिहास नहीं' : 'No conversion history yet'}
      </div>
    );
  }

  const units: LandUnit[] = ['biswa', 'biswansi', 'squareFeet', 'squareMeter', 'bigha', 'hectare'];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          {language === 'hi' ? 'इतिहास' : 'History'}
        </h3>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 
                   hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
          {language === 'hi' ? 'साफ़ करें' : 'Clear'}
        </button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg 
                     border border-white/20 rounded-xl p-5 shadow-lg
                     hover:from-white/15 hover:to-white/10 hover:border-white/30
                     hover:shadow-xl transition-all duration-300">
            <div className="text-xs text-gray-400 mb-2">
              {new Date(entry.timestamp).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {units.map((unit) => (
                <div key={unit} className="flex justify-between items-center py-1">
                  <span className="text-blue-300 font-medium">{getUnitName(unit, language)}:</span>
                  <span className="text-white font-bold text-base">
                    {formatNumber(entry.values[unit], unit)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
