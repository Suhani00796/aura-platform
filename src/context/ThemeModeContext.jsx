import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context layer
const ThemeModeContext = createContext();

/**
 * System Profiles mapping AURA's AI Engine states to specific 
 * Tailwind configurations, theme accents, and systemic personality traits.
 */
export const modeProfiles = {
  focusCoach: {
    id: 'focusCoach',
    name: 'Focus Coach',
    accentColor: 'emerald',
    bgClass: 'bg-slate-50 text-slate-900 dark:bg-emerald-950/10 dark:text-slate-100',
    cardVariant: 'focusCoach',
    description: 'High-contrast minimalist layout optimizing deep work retention intervals.'
  },
  supportiveMentor: {
    id: 'supportiveMentor',
    name: 'Supportive Mentor',
    accentColor: 'amber',
    bgClass: 'bg-amber-50/30 text-slate-900 dark:bg-slate-950 dark:text-slate-100',
    cardVariant: 'supportiveMentor',
    description: 'Warm tone distribution with active empathetic wellness tracking alerts.'
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Mode',
    accentColor: 'slate',
    bgClass: 'bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans',
    cardVariant: 'minimal',
    description: 'Ultra-stripped, text-only layout eliminating distraction density.'
  },
  pushMode: {
    id: 'pushMode',
    name: 'Push Mode',
    accentColor: 'rose',
    bgClass: 'bg-gradient-to-br from-slate-50 to-rose-50/30 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100',
    cardVariant: 'pushMode',
    description: 'Gamified urgency profile optimizing pending deadline velocities.'
  }
};

/**
 * Global Provider wrapping the main view layout stack and holding student telemetry state
 */
export const ThemeModeProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('focusCoach'); // Default active engine node
  const [activeProfile, setActiveProfile] = useState(modeProfiles.focusCoach);

  // --- Dark / Light Mode ---
  // Honors a saved preference first, then falls back to the visitor's OS-level setting.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('aura-dark-mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Applies the 'dark' class to <html> so every dark: utility class across
  // the app (already written everywhere) actually takes effect.
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('aura-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // --- Centralized Telemetry & Task States ---
  const [sleepHours, setSleepHours] = useState(6.5);
  const [hydration, setHydration] = useState(4);
  const [breaksTaken, setBreaksTaken] = useState(2);
  
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [stressLevel, setStressLevel] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);

  const [taskWeight, setTaskWeight] = useState(70);
  const [interruptionDensity, setInterruptionDensity] = useState(40);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'OS Lab: Semaphores Implementation', course: 'Operating Systems', weight: 'High', completed: false, due: '2h remaining' },
    { id: 2, title: 'Linear Algebra Quiz Revision', course: 'Mathematics', weight: 'Medium', completed: false, due: 'Tomorrow' },
    { id: 3, title: 'Submit IEEE Conference Abstract', course: 'Research', weight: 'High', completed: true, due: 'Completed' },
  ]);

  // Sync profile settings automatically whenever the engine shifts modes
  useEffect(() => {
    setActiveProfile(modeProfiles[currentMode] || modeProfiles.focusCoach);
  }, [currentMode]);

  // Dynamic calculated scores
  const recoveryScore = Math.min(
    100,
    Math.round((sleepHours / 8) * 50 + (hydration / 8) * 25 + (breaksTaken / 4) * 25)
  );

  const sleepDeficit = Math.max(0, Math.min(100, Math.round(100 - (sleepHours / 8) * 100)));
  
  // Calculate SCLI index dynamically
  const scliScore = Math.max(0, Math.min(100, Math.round(
    (taskWeight * 0.4) + 
    (interruptionDensity * 0.2) + 
    (stressLevel * 10 * 0.2) + 
    ((10 - energyLevel) * 10 * 0.2)
  )));

  const value = {
    // Styling & Theme
    currentMode,
    setMode: setCurrentMode,
    activeProfile,
    isDarkMode,
    toggleDarkMode,

    // Sleep, Hydration, Breaks (Wellness)
    sleepHours,
    setSleepHours,
    hydration,
    setHydration,
    breaksTaken,
    setBreaksTaken,

    // Affective Telemetry (Mood)
    selectedMood,
    setSelectedMood,
    stressLevel,
    setStressLevel,
    energyLevel,
    setEnergyLevel,

    // Task density variables (Intelligence)
    taskWeight,
    setTaskWeight,
    interruptionDensity,
    setInterruptionDensity,

    // Task Items Stack
    tasks,
    setTasks,

    // Calculated readouts
    recoveryScore,
    sleepDeficit,
    scliScore
  };

  return (
    <ThemeModeContext.Provider value={value}>
      <div className={`min-h-screen transition-all duration-500 ease-in-out ${activeProfile.bgClass}`}>
        {children}
      </div>
    </ThemeModeContext.Provider>
  );
};

/**
 * Custom Hook enabling any deeply nested widget component to check or update 
 * AURA's active engine state and telemetry variables directly.
 */
export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be executed within an explicit ThemeModeProvider element container.');
  }
  return context;
};