import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Activity, 
  FolderGit2,
  Sparkles,
  HeartHandshake,
  Eye,
  Zap,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import logo from '../../assets/logo.svg';

/**
 * Sidebar component that acts as the control center for navigation 
 * and empathy-adaptive engine mode manipulation.
 * Now fully responsive and keyboard accessible.
 */
const Sidebar = ({ 
  currentMode, 
  setMode, 
  currentView, 
  setView,
  isOpen,
  setIsOpen
}) => {
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  
  // Navigation links mapping directly to PPT Requirements
  const navItems = [
    { id: 'dashboard', label: 'Data Dashboard', icon: LayoutDashboard },
    { id: 'intelligence', label: 'SCLI Core Engine', icon: BrainCircuit },
    { id: 'forecasts', label: 'Burnout Analytics', icon: Activity },
    { id: 'showcases', label: 'Novelty & Architecture', icon: FolderGit2 },
  ];

  // The 4 Empathy-Adaptive UI Modes
  const modeToggles = [
    { id: 'focusCoach', label: 'Focus Coach', icon: Sparkles, color: 'hover:bg-emerald-500/10 hover:text-emerald-500 text-emerald-400' },
    { id: 'supportiveMentor', label: 'Supportive Mentor', icon: HeartHandshake, color: 'hover:bg-amber-500/10 hover:text-amber-500 text-amber-400' },
    { id: 'minimal', label: 'Minimal Mode', icon: Eye, color: 'hover:bg-slate-500/10 hover:text-slate-400 text-slate-400' },
    { id: 'pushMode', label: 'Push Mode', icon: Zap, color: 'hover:bg-rose-500/10 hover:text-rose-500 text-rose-400' },
  ];

  return (
    <aside 
      role="complementary"
      aria-label="Sidebar control deck"
      className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-slate-950 text-slate-200 flex flex-col justify-between border-r border-slate-800 p-4 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      
      {/* Top Half: Branding & Core Navigation */}
      <div>
        {/* Brand Header using logo.svg & Close button for mobile */}
        <div className="flex items-center justify-between px-2 py-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AURA Logo" className="w-9 h-9 animate-pulse" />
            <div>
              <h1 className="font-bold text-lg tracking-wider text-white">AURA</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">SheCoders Core</p>
            </div>
          </div>
          
          {/* Mobile drawer close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-200 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            aria-label="Close navigation sidebar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Selection Menu */}
        <nav className="space-y-1" aria-label="Core Navigation Links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false); // Close mobile drawer when view selected
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Half: Empathy-Adaptive Engine Toggles */}
      <div className="border-t border-slate-800 pt-4 bg-slate-950/40">
        {/* Light / Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          role="switch"
          aria-checked={isDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-full flex items-center justify-between px-3 py-2.5 mb-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <span className="flex items-center gap-3">
            {isDarkMode ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-[18px]' : 'translate-x-1'
              }`}
            />
          </span>
        </button>

        <div className="px-3 mb-2 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Engine Adaptation Mode
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping motion-reduce:animate-none" aria-hidden="true" />
        </div>
        
        <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Adaptive UI Engine Modes">
          {modeToggles.map((mode) => {
            const Icon = mode.icon;
            const isSelected = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setMode(mode.id)}
                title={mode.label}
                aria-label={`Switch to ${mode.label} Mode`}
                aria-pressed={isSelected}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isSelected 
                    ? 'bg-slate-900 border-indigo-500 text-white shadow-inner scale-[0.98]' 
                    : `border-slate-900 bg-slate-900/30 ${mode.color}`
                }`}
              >
                <Icon className="w-4 h-4 mb-1" aria-hidden="true" />
                <span className="text-[10px] tracking-tight truncate w-full text-center">
                  {mode.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;