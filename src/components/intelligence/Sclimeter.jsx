import React from 'react';
import { Brain, Sliders, RefreshCw } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * Sclimeter Component
 * Real-time dynamic dashboard readout displaying the Student Cognitive Load Index (SCLI).
 * Integrated directly with the global context state.
 */
const Sclimeter = ({ activeMode = 'default' }) => {
  const {
    taskWeight,
    setTaskWeight,
    interruptionDensity,
    setInterruptionDensity,
    sleepDeficit,
    setSleepHours,
    scliScore
  } = useThemeMode();

  // Dynamic status evaluation based on SCLI boundaries
  const getSCLIStatus = (score) => {
    if (score >= 75) return { label: 'Cognitive Overload Risk', color: 'text-rose-500', bg: 'bg-rose-500', border: 'border-rose-500/20' };
    if (score >= 45) return { label: 'Optimal Load (Flow State)', color: 'text-indigo-500', bg: 'bg-indigo-500', border: 'border-indigo-500/20' };
    return { label: 'Understimulated / Clear', color: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500/20' };
  };

  const status = getSCLIStatus(scliScore);

  // SVG Gauge Geometry Configurations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scliScore / 100) * circumference;

  return (
    <Card 
      title="SCLI Core Orchestration Engine" 
      subtitle="Algorithmic synthesis of task pressure, notification density, and fatigue tracking"
      variant={activeMode}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left Side: Premium SVG Gauge Display */}
        <div 
          className="flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden"
          role="img" 
          aria-label={`SCLI Gauge showing score ${scliScore} out of 100. Status is: ${status.label}.`}
        >
          <div className="relative w-44 h-44 flex items-center justify-center">
            
            {/* SVG Arc Progress Matrix */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Track Background Ring */}
              <circle 
                cx="100" cy="100" r={radius} 
                className="stroke-slate-200 dark:stroke-slate-800" 
                strokeWidth="12" fill="transparent" 
              />
              {/* Dynamic Active Index Track */}
              <circle 
                cx="100" cy="100" r={radius} 
                className="transition-all duration-500 ease-out"
                stroke={scliScore >= 75 ? '#f43f5e' : scliScore >= 45 ? '#6366f1' : '#10b981'}
                strokeWidth="14" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round"
                fill="transparent" 
              />
            </svg>

            {/* Absolute Center Counter Matrix */}
            <div className="absolute text-center flex flex-col items-center" aria-live="polite">
              <Brain className={`w-6 h-6 mb-1 ${status.color}`} aria-hidden="true" />
              <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
                {scliScore}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Index Units</span>
            </div>
          </div>

          <div className={`mt-3 text-xs font-semibold px-3 py-1 rounded-full border bg-white dark:bg-slate-900 shadow-sm ${status.color} ${status.border}`}>
            {status.label}
          </div>
        </div>

        {/* Right Side: Simulated Real-time Parameter Variables */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Telemetry Tweak Matrix</h4>
          </div>

          {/* Controller 1: Task Weight Density */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="task-weight-slider" className="text-slate-600 dark:text-slate-400 font-medium">Task Velocity Metric</label>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{taskWeight}%</span>
            </div>
            <input 
              id="task-weight-slider"
              type="range" 
              min="0" 
              max="100" 
              value={taskWeight} 
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={taskWeight}
              onChange={(e) => setTaskWeight(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Controller 2: Interruption Frequency Density */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="interruption-slider" className="text-slate-600 dark:text-slate-400 font-medium">Notification / App Intrusion</label>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{interruptionDensity}%</span>
            </div>
            <input 
              id="interruption-slider"
              type="range" 
              min="0" 
              max="100" 
              value={interruptionDensity} 
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={interruptionDensity}
              onChange={(e) => setInterruptionDensity(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Controller 3: Sleep Debt Indicator */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="sleep-deficit-slider" className="text-slate-600 dark:text-slate-400 font-medium">Sleep / Wellness Deficit</label>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{sleepDeficit}%</span>
            </div>
            <input 
              id="sleep-deficit-slider"
              type="range" 
              min="0" 
              max="100" 
              value={sleepDeficit} 
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={sleepDeficit}
              onChange={(e) => setSleepHours(Math.max(4, Math.min(10, Number(((100 - Number(e.target.value)) / 100 * 8).toFixed(1)))))}
              className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Interactive Trigger to Simulate Machine Reset */}
          <div className="pt-2 flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => { setTaskWeight(65); setInterruptionDensity(30); setSleepHours(6.4); }}
              className="w-full flex items-center gap-1.5"
              aria-label="Reset telemetry inputs to standard baseline"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" /> Reset Baselining
            </Button>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default Sclimeter;