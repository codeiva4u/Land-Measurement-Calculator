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
    <main className="min-h-screen text-white p-2 md:p-4 relative"
      style={{ paddingTop: 'max(8px, env(safe-area-inset-top))', paddingBottom: 'env(safe-area-inset-bottom)' }}>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <header className="mb-1 animate-fade-in">
          {/* Developer Photo - Top Center */}
          <div className="flex flex-col items-center mb-0.5 mt-2">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-2 ring-blue-500/20">
              <img src="/developer.png" alt="Sunil Arya" className="w-full h-full object-cover" />
            </div>
            <p className="text-[7px] text-gray-500 uppercase tracking-wider mt-0.5">Developed By</p>
            <p className="text-[9px] font-semibold text-blue-400">Sunil Arya</p>
          </div>

          {/* Title + Language Row - Below photo */}
          <div className="flex items-center justify-between">
            <h1 className="text-[10px] md:text-xs font-bold bg-gradient-to-r from-blue-400 to-green-400
                         bg-clip-text text-transparent leading-tight">
              {t('appTitle', language)}
            </h1>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Main Content Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.15] rounded-2xl
                      shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)]
                      overflow-hidden animate-slide-up flex flex-col
                      transition-all duration-500
                      max-h-[calc(100vh-110px)] md:max-h-[calc(100vh-140px)]">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-lg flex-shrink-0" role="tablist" aria-label={t('appTitle', language)}>
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
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-2 md:p-4 flex-1 overflow-y-auto custom-scrollbar" role="tabpanel" id={`tabpanel-${activeTab}`} aria-label={activeTab}>
            {activeTab === 'calculator' && <Calculator />}
            {activeTab === 'bulk' && <BulkConversion />}
            {activeTab === 'history' && <History />}
            {activeTab === 'print' && <PrintView />}
          </div>

          {/* Formulas Footer - Inside card */}
          <div className="px-3 md:px-4 py-2 border-t border-white/[0.08] flex-shrink-0">
            <details className="group" aria-label={t('formulas.title', language)}>
              <summary className="cursor-pointer text-sm font-medium text-blue-300 hover:text-blue-200 
                               transition-colors list-none flex items-center justify-between">
                <span>{t('formulas.title', language)}</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
                <div>• {t('formulas.biswaToSwansi', language)}</div>
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
