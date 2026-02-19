'use client';

import { useState, useRef, useCallback } from 'react';
import type { LandUnit, ConversionValues } from '@/types';
import { convertValue, isValidNumber, formatNumber } from '@/lib/conversions';
import { getUnitName } from '@/lib/translations';
import { useStore } from '@/store/useStore';

const ALL_UNITS: LandUnit[] = ['biswa', 'squareFeet', 'biswansi', 'squareMeter', 'bigha', 'hectare'];

export default function Calculator() {
  const { language, addToHistory } = useStore();
  const [values, setValues] = useState<Record<LandUnit, string>>({
    biswansi: '',
    biswa: '',
    bigha: '',
    hectare: '',
    squareMeter: '',
    squareFeet: '',
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedAddToHistory = useCallback((converted: ConversionValues) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => addToHistory(converted), 800);
  }, [addToHistory]);

  const handleChange = (unit: LandUnit, inputValue: string) => {
    if (!isValidNumber(inputValue)) return;
    if (inputValue === '') {
      setValues({ biswansi: '', biswa: '', bigha: '', hectare: '', squareMeter: '', squareFeet: '' });
      return;
    }
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && isFinite(numValue)) {
      const converted = convertValue(numValue, unit);
      setValues({
        biswansi: unit === 'biswansi' ? inputValue : formatNumber(converted.biswansi, 'biswansi'),
        biswa: unit === 'biswa' ? inputValue : formatNumber(converted.biswa, 'biswa'),
        bigha: unit === 'bigha' ? inputValue : formatNumber(converted.bigha, 'bigha'),
        hectare: unit === 'hectare' ? inputValue : formatNumber(converted.hectare, 'hectare'),
        squareMeter: unit === 'squareMeter' ? inputValue : formatNumber(converted.squareMeter, 'squareMeter'),
        squareFeet: unit === 'squareFeet' ? inputValue : formatNumber(converted.squareFeet, 'squareFeet'),
      });
      debouncedAddToHistory(converted);
    }
  };

  const labelColor: Record<LandUnit, string> = {
    biswa: 'text-blue-300',
    squareFeet: 'text-blue-200',
    biswansi: 'text-purple-300',
    squareMeter: 'text-green-300',
    bigha: 'text-yellow-300',
    hectare: 'text-pink-300',
  };

  const focusRing: Record<LandUnit, string> = {
    biswa: 'focus:ring-blue-400/40 focus:border-blue-400/30',
    squareFeet: 'focus:ring-blue-300/40 focus:border-blue-300/30',
    biswansi: 'focus:ring-purple-400/40 focus:border-purple-400/30',
    squareMeter: 'focus:ring-green-400/40 focus:border-green-400/30',
    bigha: 'focus:ring-yellow-400/40 focus:border-yellow-400/30',
    hectare: 'focus:ring-pink-400/40 focus:border-pink-400/30',
  };

  return (
    <div className="space-y-1.5">
      {ALL_UNITS.map((unit) => (
        <div key={unit}>
          {unit === 'biswansi' && <div className="h-px bg-white/10 my-1" />}
          {unit === 'squareMeter' && <div className="h-px bg-white/10 my-1" />}

          <div className="group">
            <label
              htmlFor={unit}
              className={`block text-[10px] font-semibold mb-0.5 ${labelColor[unit]}`}
            >
              {getUnitName(unit, language)}
            </label>
            <input
              id={unit}
              type="text"
              inputMode="decimal"
              value={values[unit]}
              onChange={(e) => handleChange(unit, e.target.value)}
              placeholder="0"
              autoComplete="off"
              className={`w-full px-3 py-1.5 bg-white/[0.05] border border-white/[0.12] rounded-lg
                         text-white text-sm font-semibold placeholder-gray-600
                         focus:outline-none focus:ring-2 focus:bg-white/[0.08]
                         active:bg-white/[0.08] transition-all duration-200 ${focusRing[unit]}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
