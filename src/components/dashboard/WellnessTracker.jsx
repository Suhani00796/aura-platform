import React from 'react';
import { Moon, Droplet, Coffee, Sparkles } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import Card from '../common/Card';

/**
 * WellnessTracker Component
 * Tracks physiological recovery buffer metrics.
 * Integrates directly with the shared telemetry state inside ThemeModeContext.
 */
const WellnessTracker = ({ activeMode = 'default' }) => {
  const {
    sleepHours,
    setSleepHours,
    hydration,
    setHydration,
    breaksTaken,
    setBreaksTaken,
    recoveryScore
  } = useThemeMode();

  return (
    <Card 
      title="Physiological Wellness Buffer" 
      subtitle="Tracks biological recovery assets offsetting current SCLI loads"
      variant={activeMode}
    >
      <div className="space-y-5">
        
        {/* Recovery Score Radial Metric Showcase */}
        <div 
          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg" aria-hidden="true">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recovery Index</p>
              <p className="text-xs text-slate-400">Higher scores mitigate burnout windows</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {recoveryScore}%
            </span>
          </div>
        </div>

        {/* Core Sliders and Counters Grid */}
        <div className="space-y-4">
          {/* Sleep Tracking Module */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="sleep-slider" className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
                <Moon className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Sleep Duration
              </label>
              <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">{sleepHours} hrs</span>
            </div>
            <input 
              id="sleep-slider"
              type="range" 
              min="4" 
              max="10" 
              step="0.5"
              value={sleepHours} 
              aria-valuemin="4"
              aria-valuemax="10"
              aria-valuenow={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Hydration Grid Control */}
          <div className="flex items-center justify-between pt-1">
            <span id="hydration-label" className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Droplet className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" /> Water Intake
            </span>
            <div 
              className="flex items-center gap-1"
              role="group"
              aria-labelledby="hydration-label"
            >
              {[...Array(8)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHydration(i + 1)}
                  aria-label={`Water glass ${i + 1} of 8`}
                  aria-pressed={i < hydration}
                  className={`w-5 h-7 rounded-sm border transition-all duration-200 dynamic-glass focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    i < hydration 
                      ? 'bg-blue-500 border-blue-600 text-white scale-105' 
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[9px] block text-center font-bold">~</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cognitive Decompression Module */}
          <div className="flex items-center justify-between pt-1">
            <span id="breaks-label" className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Coffee className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" /> Decompression Breaks
            </span>
            <div className="flex items-center gap-2" role="group" aria-labelledby="breaks-label">
              <button 
                type="button"
                onClick={() => setBreaksTaken(Math.max(0, breaksTaken - 1))}
                aria-label="Decrease breaks taken"
                className="w-7 h-7 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                -
              </button>
              <span className="font-mono text-sm font-bold w-6 text-center text-slate-800 dark:text-slate-200" aria-live="polite">
                {breaksTaken}
              </span>
              <button 
                type="button"
                onClick={() => setBreaksTaken(Math.min(6, breaksTaken + 1))}
                aria-label="Increase breaks taken"
                className="w-7 h-7 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Contextual Feedback Banner */}
        <div aria-live="polite">
          {recoveryScore < 60 ? (
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/10 rounded-xl border border-rose-100 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 text-xs">
              ⚠️ <strong>Biometric Deficit:</strong> Low recovery threshold detected. AURA engine is optimizing adaptive interfaces toward high-empathy configurations.
            </div>
          ) : (
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/10 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              🌿 <strong>Stable Buffer:</strong> High biological resilience active. SCLI calculations safely insulated against micro-stress overloads.
            </div>
          )}
        </div>

      </div>
    </Card>
  );
};

export default WellnessTracker;