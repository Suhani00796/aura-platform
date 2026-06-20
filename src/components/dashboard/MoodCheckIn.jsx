import React, { useState } from 'react';
import { Meh, Frown, Brain, BatteryCharging, AlertCircle } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * MoodCheckIn Component
 * Captures user emotional state and subjective stress metrics.
 * Feeds values directly into the centralized global state context.
 */
const MoodCheckIn = ({ onMoodSubmit, activeMode = 'default' }) => {
  const {
    selectedMood,
    setSelectedMood,
    stressLevel,
    setStressLevel,
    energyLevel,
    setEnergyLevel
  } = useThemeMode();

  const [submitted, setSubmitted] = useState(false);

  const moods = [
    { id: 'overwhelmed', label: 'Overwhelmed', icon: Frown, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' },
    { id: 'anxious', label: 'Anxious', icon: AlertCircle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
    { id: 'neutral', label: 'Balanced', icon: Meh, color: 'text-slate-500 bg-slate-50 dark:bg-slate-800/50' },
    { id: 'focused', label: 'In Flow', icon: Brain, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
    { id: 'energized', label: 'Energized', icon: BatteryCharging, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    // Trigger local animation check/acknowledgment
    if (onMoodSubmit) {
      onMoodSubmit({
        mood: selectedMood,
        stress: Number(stressLevel),
        energy: Number(energyLevel),
        timestamp: new Date().toISOString()
      });
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset toast/state feedback
  };

  return (
    <Card 
      title="Real-time Mood & Affect Check-In" 
      subtitle="Feeds qualitative emotional telemetry into the SCLI Engine"
      variant={activeMode}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Mood Selector Node */}
        <div>
          <span id="mood-label" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Current Cognitive/Emotional State
          </span>
          <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-labelledby="mood-label">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedMood(m.id)}
                  aria-label={`Mood: ${m.label}`}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    isSelected 
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 scale-105 bg-indigo-50/30 dark:bg-indigo-950/20' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 bg-slate-50/20 dark:bg-slate-900/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg mb-1.5 ${m.color}`} aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 text-center truncate w-full">
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Biometric Slider Matrix */}
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="stress-slider" className="font-medium text-slate-600 dark:text-slate-400">
                Subjective Stress Index
              </label>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{stressLevel}/10</span>
            </div>
            <input 
              id="stress-slider"
              type="range" 
              min="1" 
              max="10" 
              value={stressLevel} 
              aria-valuemin="1"
              aria-valuemax="10"
              aria-valuenow={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="energy-slider" className="font-medium text-slate-600 dark:text-slate-400">
                Mental Energy Bandwidth
              </label>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{energyLevel}/10</span>
            </div>
            <input 
              id="energy-slider"
              type="range" 
              min="1" 
              max="10" 
              value={energyLevel} 
              aria-valuemin="1"
              aria-valuemax="10"
              aria-valuenow={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Action Dispatch Node */}
        <div className="pt-2">
          <Button 
            type="submit" 
            variant={activeMode === 'default' ? 'primary' : activeMode} 
            className="w-full"
            disabled={!selectedMood}
            aria-label="Synchronize mood telemetry to SCLI engine"
          >
            {submitted ? 'Telemetry Calibrated ✓' : 'Sync to SCLI Engine'}
          </Button>
        </div>

      </form>
    </Card>
  );
};

export default MoodCheckIn;