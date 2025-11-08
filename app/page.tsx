'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { t } from '@/lib/translations';
import Calculator from '@/components/Calculator';
import BulkConversion from '@/components/BulkConversion';
import History from '@/components/History';
import PrintView from '@/components/PrintView';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { CalculatorIcon, FileText, History as HistoryIcon, Printer } from 'lucide-react';

type Tab = 'calculator' | 'bulk' | 'history' | 'print';

/**
 * Main application page with tabbed interface
 */
export default function Home() {
  const { language } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const tabs: { id: Tab; label: string; icon: typeof CalculatorIcon }[] = [
    { id: 'calculator', label: t('calculator', language), icon: CalculatorIcon },
    { id: 'bulk', label: t('bulkConversion', language), icon: FileText },
    { id: 'history', label: t('history', language), icon: HistoryIcon },
    { id: 'print', label: t('print', language), icon: Printer },
  ];

  return (
    <main className="h-screen text-white p-2 md:p-4 relative flex items-start overflow-hidden">
      {/* Title - Top Left */}
      <div className="absolute top-3 left-3 z-20">
        <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg 
                      px-4 py-2 transition-all duration-200 shadow-lg">
          <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-400 to-green-400 
                       bg-clip-text text-transparent leading-tight">
            {t('appTitle', language)}
          </h1>
        </div>
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-3 right-3 z-20">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 w-full pt-2">
        {/* Header */}
        <header className="mb-2 animate-fade-in">
          {/* Developer Info - Top Center */}
          <div className="flex flex-col items-center justify-center mb-3">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400/70 shadow-2xl ring-4 ring-blue-500/40 mb-2">
              <img 
                src="/developer.png" 
                alt="Developer" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-light mb-0.5">Developed By</p>
              <p className="text-sm font-bold text-blue-400 tracking-wide">Sunil Arya</p>
            </div>
          </div>
        </header>

        {/* Main Content Card */}
        <div className="bg-white/[0.03] backdrop-blur-3xl backdrop-saturate-150
                      border border-white/[0.15] rounded-2xl 
                      shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)_inset]
                      overflow-hidden animate-slide-up flex flex-col
                      hover:shadow-[0_20px_100px_-10px_rgba(59,130,246,0.4),0_0_0_1px_rgba(255,255,255,0.15)_inset]
                      transition-all duration-500 max-h-[calc(100vh-180px)]">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-lg flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300
                           whitespace-nowrap flex-shrink-0 relative
                           ${activeTab === tab.id
                             ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border-b-2 border-blue-400 shadow-lg'
                             : 'text-gray-300 hover:bg-white/10 hover:text-white'
                           }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-3 md:p-4 flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'calculator' && <Calculator />}
            {activeTab === 'bulk' && <BulkConversion />}
            {activeTab === 'history' && <History />}
            {activeTab === 'print' && <PrintView />}
          </div>

          {/* Formulas Footer - Inside card */}
          <div className="px-3 md:px-4 py-2 border-t border-white/[0.08] flex-shrink-0">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-blue-300 hover:text-blue-200 
                               transition-colors list-none flex items-center justify-between">
                <span>{t('formulas.title', language)}</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
                <div>• {t('formulas.biswaToSqM', language)}</div>
                <div>• {t('formulas.biswaToSqFt', language)}</div>
                <div>• {t('formulas.biswaToHectare', language)}</div>
                <div>• {t('formulas.bighaToBiswa', language)}</div>
                <div>• {t('formulas.hectareToSqM', language)}</div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}
