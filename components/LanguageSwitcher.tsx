'use client';

import { useStore } from '@/store/useStore';
import { Languages } from 'lucide-react';

/**
 * Language switcher component for Hindi/English toggle
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useStore();

  return (
    <button
      onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 
               backdrop-blur-sm border border-white/20 rounded-lg 
               text-white text-xs transition-all duration-200"
      aria-label="Switch language"
    >
      <Languages size={14} />
      <span className="font-medium">{language === 'hi' ? 'English' : 'हिंदी'}</span>
    </button>
  );
}
