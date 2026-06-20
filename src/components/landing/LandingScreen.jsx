import React from 'react';
import { Brain, Sparkles, HeartHandshake, Eye, Zap, ArrowRight, Gauge, Activity } from 'lucide-react';
import logo from '../../assets/logo.svg';
import Button from '../common/Button';

/**
 * LandingScreen Component
 * The first thing a visitor sees. Explains what AURA does and gives a single,
 * unambiguous primary action ("Enter Dashboard") so people aren't dropped
 * straight into a dense data console with no orientation.
 */
const modePreviews = [
  { id: 'focusCoach', label: 'Focus Coach', icon: Sparkles, accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', copy: 'Strips distractions during deep-work blocks.' },
  { id: 'supportiveMentor', label: 'Supportive Mentor', icon: HeartHandshake, accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20', copy: 'Leans warmer and slows the pace when stress is high.' },
  { id: 'minimal', label: 'Minimal Mode', icon: Eye, accent: 'text-slate-300 bg-slate-500/10 border-slate-500/20', copy: 'Plain text, zero clutter, nothing competing for attention.' },
  { id: 'pushMode', label: 'Push Mode', icon: Zap, accent: 'text-rose-400 bg-rose-500/10 border-rose-500/20', copy: 'Gamifies the final sprint before a hard deadline.' },
];

const LandingScreen = ({ onEnter, onViewArchitecture }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <a
        href="#landing-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-3 focus:bg-indigo-600 focus:text-white focus:rounded-xl"
      >
        Skip to main content
      </a>

      {/* Ambient background glow, decorative only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[420px] h-[420px] bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center gap-3 px-6 py-5 md:px-10">
        <img src={logo} alt="AURA logo" className="w-9 h-9" />
        <span className="font-bold text-lg tracking-wider">AURA</span>
      </header>

      <main id="landing-main" tabIndex="-1" className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-16 text-center">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">
          Team SheCoders &middot; SRMIST KTR &middot; CSE 2028
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
          An interface that adapts to how overloaded you actually are
        </h1>

        <p className="mt-5 max-w-xl text-sm md:text-base text-slate-400 leading-relaxed">
          AURA is an interactive prototype that turns simulated student workload, mood,
          and recovery signals into a single Cognitive Load Index — then reshapes its own
          layout and tone in response, instead of showing every student the same screen.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onEnter()}
            className="gap-2 shadow-glow-indigo"
          >
            Enter the Dashboard
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onViewArchitecture}
          >
            See the architecture &amp; datasets
          </Button>
        </div>

        {/* Mode Preview Grid — orients visitors to the 4 adaptive states before they arrive */}
        <div className="mt-14 w-full max-w-4xl">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Four ways the engine can respond
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            {modePreviews.map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.id}
                  className={`p-4 rounded-2xl border ${mode.accent} bg-slate-900/60 backdrop-blur-sm`}
                >
                  <Icon className="w-5 h-5 mb-2" aria-hidden="true" />
                  <p className="text-sm font-bold text-slate-100">{mode.label}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{mode.copy}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick stat strip — sets expectations about what's inside */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Live SCLI scoring
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" /> 7-day burnout forecast
          </span>
          <span className="flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> AI Copilot recommendations
          </span>
        </div>
      </main>

      <footer className="relative z-10 text-center text-[11px] text-slate-600 pb-6">
        Prototype build &middot; data shown is simulated for demonstration
      </footer>
    </div>
  );
};

export default LandingScreen;
