import type { ConversionValues, LandUnit } from '@/types';

/**
 * Conversion constants based on Lucknow, Uttar Pradesh standards
 * 
 * BASE FORMULAS:
 * 1 बिस्वा (Biswa) = 126.486 वर्ग मीटर (Square Meter)
 * 1 बिस्वा (Biswa) = 1361 वर्ग फीट (Square Feet)
 * 1 बिस्वा (Biswa) = 0.0126486 हैक्टेयर (Hectare)
 * 1 बीघा (Bigha) = 20 बिस्वा (Biswa)
 * 1 हैक्टेयर (Hectare) = 10,000 वर्ग मीटर (Square Meter)
 */

// Base conversion values (in terms of square meters)
const BISWA_TO_SQUARE_METER = 126.486;
const BISWA_TO_SQUARE_FEET = 1361;
const BIGHA_TO_BISWA = 20;
const HECTARE_TO_SQUARE_METER = 10000;

// Derived conversions
const BIGHA_TO_SQUARE_METER = BIGHA_TO_BISWA * BISWA_TO_SQUARE_METER; // 2529.72

/**
 * Converts a value from one unit to all supported units
 * @param value - The numeric value to convert
 * @param fromUnit - The unit of the input value
 * @returns Object containing converted values in all units
 */
export function convertValue(value: number, fromUnit: LandUnit): ConversionValues {
  // First convert to square meters as the base unit
  let squareMeter: number;

  switch (fromUnit) {
    case 'squareMeter':
      squareMeter = value;
      break;
    case 'biswa':
      squareMeter = value * BISWA_TO_SQUARE_METER;
      break;
    case 'bigha':
      squareMeter = value * BIGHA_TO_SQUARE_METER;
      break;
    case 'hectare':
      squareMeter = value * HECTARE_TO_SQUARE_METER;
      break;
    case 'squareFeet':
      squareMeter = value / (BISWA_TO_SQUARE_FEET / BISWA_TO_SQUARE_METER);
      break;
    default:
      squareMeter = 0;
  }

  // Convert from square meters to all other units
  return {
    squareMeter: squareMeter,
    biswa: squareMeter / BISWA_TO_SQUARE_METER,
    bigha: squareMeter / BIGHA_TO_SQUARE_METER,
    hectare: squareMeter / HECTARE_TO_SQUARE_METER,
    squareFeet: squareMeter * (BISWA_TO_SQUARE_FEET / BISWA_TO_SQUARE_METER),
  };
}

/**
 * Validates if a string can be converted to a valid number
 * @param value - The string value to validate
 * @returns True if valid, false otherwise
 */
export function isValidNumber(value: string): boolean {
  if (value === '' || value === '-') return true; // Allow empty and minus sign
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num) && num >= 0;
}

/**
 * Formats a number for display with appropriate decimal places
 * @param value - The number to format
 * @param unit - The unit type for specific formatting
 * @returns Formatted string
 */
export function formatNumber(value: number, unit?: LandUnit): string {
  if (value === 0) return '0';
  
  // For very small numbers, use scientific notation
  if (Math.abs(value) < 0.000001) {
    return value.toExponential(2);
  }
  
  // Set decimal places based on unit
  let maxDecimals = 2;
  let keepDecimals = false; // For units that must always show decimals
  
  if (unit === 'squareMeter') {
    maxDecimals = 3;
    keepDecimals = true; // Always show 3 decimals for square meter
  } else if (unit === 'hectare') {
    maxDecimals = 7;
  } else if (unit === 'squareFeet') {
    maxDecimals = 0;
  }
  
  // Round to maxDecimals places
  const rounded = Math.round(value * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
  
  // Format with commas for thousands
  const formatted = rounded.toFixed(maxDecimals);
  const [integer, decimal] = formatted.split('.');
  const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // For squareMeter, always keep 3 decimals
  if (keepDecimals && decimal) {
    return `${integerWithCommas}.${decimal}`;
  }
  
  // Remove trailing zeros from decimal part for other units
  if (decimal) {
    const trimmedDecimal = decimal.replace(/0+$/, '');
    return trimmedDecimal ? `${integerWithCommas}.${trimmedDecimal}` : integerWithCommas;
  }
  
  return integerWithCommas;
}
