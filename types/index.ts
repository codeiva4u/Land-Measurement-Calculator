/**
 * Land measurement units supported by the calculator
 */
export type LandUnit = 
  | 'biswa'
  | 'bigha'
  | 'hectare'
  | 'squareMeter'
  | 'squareFeet';

/**
 * Language options for the application
 */
export type Language = 'hi' | 'en';

/**
 * Conversion values object with all unit values
 */
export interface ConversionValues {
  biswa: number;
  bigha: number;
  hectare: number;
  squareMeter: number;
  squareFeet: number;
}

/**
 * Conversion history entry
 */
export interface ConversionHistory {
  id: string;
  timestamp: number;
  values: ConversionValues;
}

/**
 * Bulk conversion input item
 */
export interface BulkConversionItem {
  value: number;
  unit: LandUnit;
}

/**
 * Bulk conversion result item
 */
export interface BulkConversionResult {
  input: BulkConversionItem;
  converted: ConversionValues;
}
