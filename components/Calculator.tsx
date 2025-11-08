'use client';

import { useState } from 'react';
import type { LandUnit } from '@/types';
import { convertValue, isValidNumber, formatNumber } from '@/lib/conversions';
import { getUnitName } from '@/lib/translations';
import { useStore } from '@/store/useStore';

/**
 * Calculator component with real-time unit conversion
 */
export default function Calculator() {
  const { language, addToHistory } = useStore();
  const [values, setValues] = useState<Record<LandUnit, string>>({
    biswa: '',
    bigha: '',
    hectare: '',
    squareMeter: '',
    squareFeet: '',
  });

  /**
   * Handles input change for any unit
   * Converts the value to all other units in real-time
   */
  const handleChange = (unit: LandUnit, inputValue: string) => {
    // Validate input
    if (!isValidNumber(inputValue)) return;

    // If empty, clear all fields
    if (inputValue === '' || inputValue === '-') {
      setValues({
        biswa: '',
        bigha: '',
        hectare: '',
        squareMeter: '',
        squareFeet: '',
      });
      return;
    }

    // Convert to number and calculate all values
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && isFinite(numValue)) {
      const converted = convertValue(numValue, unit);

      // Update all fields except the one being edited
      const updatedValues: Record<LandUnit, string> = {
        biswa: unit === 'biswa' ? inputValue : formatNumber(converted.biswa, 'biswa'),
        bigha: unit === 'bigha' ? inputValue : formatNumber(converted.bigha, 'bigha'),
        hectare: unit === 'hectare' ? inputValue : formatNumber(converted.hectare, 'hectare'),
        squareMeter: unit === 'squareMeter' ? inputValue : formatNumber(converted.squareMeter, 'squareMeter'),
        squareFeet: unit === 'squareFeet' ? inputValue : formatNumber(converted.squareFeet, 'squareFeet'),
      };

      setValues(updatedValues);

      // Add to history
      addToHistory(converted);
    }
  };

  const units: LandUnit[] = ['biswa', 'squareFeet', 'squareMeter', 'bigha', 'hectare'];

  return (
    <div className="space-y-2.5">
      {units.map((unit) => (
        <div key={unit} className="animate-slide-up group">
          <label
            htmlFor={unit}
            className="block text-sm font-semibold text-blue-300 mb-1 transition-colors
                     group-focus-within:text-blue-400">
            {getUnitName(unit, language)}
          </label>
          <div className="relative">
            <input
              id={unit}
              type="text"
              inputMode="decimal"
              value={values[unit]}
              onChange={(e) => handleChange(unit, e.target.value)}
              placeholder="0"
              className="w-full px-5 py-3 bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150
                       border border-white/[0.12] rounded-xl text-white text-xl font-semibold
                       placeholder-gray-600 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]
                       focus:outline-none focus:ring-2 focus:ring-blue-400/40 
                       focus:border-blue-400/30 focus:bg-white/[0.06]
                       focus:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.5)]
                       hover:bg-white/[0.06] hover:border-white/[0.18]
                       transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0
                          group-focus-within:from-blue-400/5 group-focus-within:to-purple-400/5
                          pointer-events-none transition-all duration-500"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
