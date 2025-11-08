import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, ConversionHistory, ConversionValues } from '@/types';

/**
 * Application state interface
 */
interface AppState {
  // Language preference
  language: Language;
  setLanguage: (lang: Language) => void;

  // Conversion history
  history: ConversionHistory[];
  addToHistory: (values: ConversionValues) => void;
  clearHistory: () => void;

  // Current conversion values
  currentValues: ConversionValues;
  setCurrentValues: (values: ConversionValues) => void;
}

/**
 * Global application store using Zustand
 * Persists language and history to localStorage
 */
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Language state
      language: 'hi',
      setLanguage: (lang) => set({ language: lang }),

      // History state
      history: [],
      addToHistory: (values) =>
        set((state) => ({
          history: [
            {
              id: Date.now().toString(),
              timestamp: Date.now(),
              values,
            },
            ...state.history,
          ].slice(0, 50), // Keep only last 50 entries
        })),
      clearHistory: () => set({ history: [] }),

      // Current values state
      currentValues: {
        biswa: 0,
        bigha: 0,
        hectare: 0,
        squareMeter: 0,
        squareFeet: 0,
      },
      setCurrentValues: (values) => set({ currentValues: values }),
    }),
    {
      name: 'land-calculator-storage',
      partialize: (state) => ({
        language: state.language,
        history: state.history,
      }),
    }
  )
);
