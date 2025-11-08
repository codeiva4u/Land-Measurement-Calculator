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
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
               backdrop-blur-sm border border-white/20 rounded-lg 
               text-white transition-all duration-200"
      aria-label="Switch language"
    >
      <Languages size={18} />
      <span className="font-medium">{language === 'hi' ? 'English' : 'हिंदी'}</span>
    </button>
  );
}
