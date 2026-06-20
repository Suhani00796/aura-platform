import React, { useState } from 'react';
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';
import Sidebar from './components/common/Sidebar';
import MoodCheckIn from './components/dashboard/MoodCheckIn';
import TaskList from './components/dashboard/TaskList';
import WellnessTracker from './components/dashboard/WellnessTracker';
import Sclimeter from './components/intelligence/Sclimeter';
import BurnoutForecastChart from './components/intelligence/BurnoutForecastChart';
import AICopilotModal from './components/common/AICopilotModal';
import LandingScreen from './components/landing/LandingScreen';
import mockStudentData from './data/mockStudentData';
import { Database, Cpu, User, Menu, Sparkles, Brain } from 'lucide-react';

/**
 * Inner Application Router
 * Pulls current mode configurations directly from the Theme Context layer.
 */
const AppContent = () => {
  const { currentMode, setMode, activeProfile, scliScore } = useThemeMode();
  const [currentView, setView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // First-time visitors land on an orientation screen with one clear CTA,
  // instead of being dropped straight into a dense data console.
  if (!hasEntered) {
    return (
      <LandingScreen
        onEnter={(mode) => {
          if (mode) setMode(mode);
          setView('dashboard');
          setHasEntered(true);
        }}
        onViewArchitecture={() => {
          setView('showcases');
          setHasEntered(true);
        }}
      />
    );
  }

  return (
    <div className="flex w-full min-h-screen relative overflow-x-hidden md:overflow-visible">
      {/* Accessibility Skip Nav Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-3 focus:bg-indigo-600 focus:text-white focus:rounded-xl"
      >
        Skip to main content
      </a>

      {/* Structural Sidebar Control Panel */}
      <Sidebar 
        currentMode={currentMode} 
        setMode={setMode} 
        currentView={currentView} 
        setView={setView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Overlay Backdrop for Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main View Port Window Frame Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Persistent top header with branding, real-time SCLI state, and CTA button */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              aria-label="Open navigation menu"
              aria-expanded={isSidebarOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-500 rounded-lg hidden sm:flex">
                <Brain className="w-4 h-4 text-indigo-500" />
              </span>
              <div>
                <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  AURA System Console
                </h1>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider hidden sm:block">
                  Empathy-Adaptive Student Copilot
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live SCLI Status Badge */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-medium"
              aria-live="polite"
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  scliScore >= 75 ? 'bg-rose-500' : scliScore >= 45 ? 'bg-indigo-500' : 'bg-emerald-500'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  scliScore >= 75 ? 'bg-rose-500' : scliScore >= 45 ? 'bg-indigo-500' : 'bg-emerald-500'
                }`}></span>
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-300">
                SCLI Score: <strong className="text-slate-900 dark:text-white">{scliScore}</strong>
              </span>
            </div>

            {/* AI Recommendation primary CTA */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="relative px-4 py-2 text-xs font-bold text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-600/20 overflow-hidden group flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-100 transition-all duration-300 group-hover:opacity-90" />
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <Sparkles className="w-3.5 h-3.5 relative z-10 animate-pulse text-indigo-200" />
              <span className="relative z-10 uppercase tracking-wider hidden sm:inline">Ask AI Copilot</span>
              <span className="relative z-10 uppercase tracking-wider sm:hidden">Ask AI</span>
            </button>
          </div>
        </header>

        {/* Main View Port Window Frame */}
        <main 
          id="main-content"
          className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full focus:outline-none"
          tabIndex="-1"
        >
          
          {/* Dynamic Mode Notification Bar (AURA State Indicator) */}
          <div className="mb-6 p-4 rounded-xl border bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                Active Engine State Profile
              </span>
              <h2 className="text-md font-bold text-slate-800 dark:text-slate-100">
                {activeProfile.name} Mode Active
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md text-right hidden md:block">
              {activeProfile.description}
            </p>
          </div>

          {/* 1. DATA DASHBOARD VIEW */}
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold tracking-tight">Data Input Dashboard</h2>
                <p className="text-xs text-slate-500">Simulating real-time student workload, notification, and behavioral parameters.</p>
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MoodCheckIn activeMode={activeProfile.cardVariant} />
                <WellnessTracker activeMode={activeProfile.cardVariant} />
                <div className="lg:col-span-2">
                  <TaskList activeMode={activeProfile.cardVariant} />
                </div>
              </div>
            </div>
          )}

          {/* 2. SCLI ENGINE CORE VIEW */}
          {currentView === 'intelligence' && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold tracking-tight">Cognitive Analytics Engine</h2>
                <p className="text-xs text-slate-500">Live calculating the customized Student Cognitive Load Index.</p>
              </header>
              <Sclimeter activeMode={activeProfile.cardVariant} />
            </div>
          )}

          {/* 3. BURNOUT ANALYTICS VIEW */}
          {currentView === 'forecasts' && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold tracking-tight">Predictive Metrics Portal</h2>
                <p className="text-xs text-slate-500">Machine learning estimations forecasting scheduling risk horizons.</p>
              </header>
              <BurnoutForecastChart activeMode={activeProfile.cardVariant} />
            </div>
          )}

          {/* 4. NOVELTY SHOWCASE VIEW (PPT Requirements) */}
          {currentView === 'showcases' && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold tracking-tight">Novelty & Architecture Blueprints</h2>
                <p className="text-xs text-slate-500">Deep-dive structural mapping of the SheCoders AURA prototype layout.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tech Stack & Models Card */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-3 text-indigo-500">
                    <Cpu className="w-5 h-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">Core Intelligence Layer Models</h3>
                  </div>
                  <ul className="space-y-3 text-xs">
                    <li className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <strong>BERT/RoBERTa Fine-Tuned NLP Pipeline:</strong> Extracts granular sentiment weights from subjective daily daily chat prompts.
                    </li>
                    <li className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <strong>LLaMA & Gemini API Layers:</strong> Orchestrates dynamic dialogue generation adapting tones immediately to student bandwidth.
                    </li>
                  </ul>
                </div>

                {/* Open Datasets Card */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-3 text-emerald-500">
                    <Database className="w-5 h-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">Open Academic Training Datasets</h3>
                  </div>
                  <div className="space-y-2">
                    {mockStudentData.openDatasetReferences.map((set, idx) => (
                      <div key={idx} className="p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg">
                        <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{set.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{set.utilizedFor}</p>
                        <span className="text-[9px] font-mono font-bold text-indigo-500 mt-1 block">{set.appliedWeight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Node Card */}
                <div className="md:col-span-2 p-4 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>Project Created By Team <strong>SheCoders</strong> (Manisha Kumari &amp; Sandali Snigdha)</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded">SRMIST KTR • CSE 2028</span>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* AI Recommendation Diagnostic Modal */}
      <AICopilotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

/**
 * Root Component initializing global Provider contexts safely
 */
export default function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}