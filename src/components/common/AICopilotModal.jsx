import React, { useEffect, useRef } from 'react';
import { X, Sparkles, HeartHandshake, Zap, Eye, Brain, Check, Coffee, Droplet } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import Button from './Button';

/**
 * AICopilotModal Component
 * Provides real-time AI-simulated diagnostics and interactive action items.
 * Fully accessible with focus trapping, ARIA tags, and keyboard listeners.
 */
const AICopilotModal = ({ isOpen, onClose }) => {
  const {
    currentMode,
    scliScore,
    recoveryScore,
    stressLevel,
    energyLevel,
    selectedMood,
    taskWeight,
    tasks,
    setHydration,
    setBreaksTaken
  } = useThemeMode();

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Focus trap and Escape-key listener
  useEffect(() => {
    if (!isOpen) return;

    // Save active element to return focus later
    const previousActiveElement = document.activeElement;

    // Focus on close button first
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Uncompleted tasks count
  const pendingTasks = tasks.filter(t => !t.completed);
  const highLoadTasks = pendingTasks.filter(t => t.weight === 'High');

  // Dynamic advice generator based on AURA states and telemetry values
  const getCopilotAdvice = () => {
    switch (currentMode) {
      case 'focusCoach':
        return {
          title: "Focus Coach Directives",
          badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          model: "AURA Focus-Engine v2.4",
          icon: Sparkles,
          analysis: `SCLI is currently at ${scliScore} with a Recovery Index of ${recoveryScore}%. Under Focus Mode, we are optimizing for deep memory consolidation.`,
          recommendation: highLoadTasks.length > 0
            ? `You have ${highLoadTasks.length} high-load task(s) pending (specifically: "${highLoadTasks[0].title}"). We suggest blocking out a 25-minute Pomodoro slot. Suppressing social app logs now.`
            : `No high-load items pending. SCLI is stable. Focus on reviewing standard curriculum files or taking an active eye break.`,
          actions: [
            { id: 'pomodoro', text: "Start 25-min OS Semaphores sprint", completed: false },
            { id: 'suppress', text: "Mute background system notifications", completed: true },
            { id: 'water', text: "Hydrate: Drink a glass of water", action: () => setHydration(h => Math.min(8, h + 1)) }
          ]
        };
      case 'supportiveMentor':
        return {
          title: "Supportive Mentor Counsel",
          badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          model: "AURA Empathy-LLaMA Core",
          icon: HeartHandshake,
          analysis: `Subjective stress level is currently ${stressLevel}/10, and mood is "${selectedMood}". Your physiological buffer is at ${recoveryScore}%.`,
          recommendation: stressLevel >= 6 
            ? "Your stress index is elevated. SCLI indicates a high susceptibility to cognitive fatigue. Let's postpone math revisions. It is highly recommended to take a decompression break." 
            : "You are doing well. Maintain this flow state but don't forget to take short walking breaks to prevent muscle tension.",
          actions: [
            { id: 'break', text: "Take a 5-min breathing break", action: () => setBreaksTaken(b => Math.min(6, b + 1)) },
            { id: 'math', text: "Postpone linear algebra to tomorrow morning", completed: false },
            { id: 'water', text: "Drink water (+1 glass)", action: () => setHydration(h => Math.min(8, h + 1)) }
          ]
        };
      case 'pushMode':
        return {
          title: "Push Mode Urgency Protocol",
          badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
          model: "Clutch-Time Prompt Optimizer",
          icon: Zap,
          analysis: `Deadline emergency detected! SCLI score is ${scliScore} (Task weight: ${taskWeight}%) but energy level is at ${energyLevel}/10.`,
          recommendation: pendingTasks.length > 0 
            ? `We need to submit the "${pendingTasks[0].title}" immediately. Gamifying the workspace: clear this task in the next 15 minutes to earn 30 minutes of guaranteed decompression time!`
            : "All immediate deadlines cleared. High velocity maintained. Resetting base parameters to recover biological reserve.",
          actions: [
            { id: 'rush', text: "Draft OS semaphore outline", completed: false },
            { id: 'blocker', text: "Close all irrelevant browser tabs", completed: false },
            { id: 'water', text: "Drink water (+1 glass)", action: () => setHydration(h => Math.min(8, h + 1)) }
          ]
        };
      case 'minimal':
      default:
        return {
          title: "Minimal State Summary",
          badgeColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
          model: "Minimalist Summarizer",
          icon: Eye,
          analysis: `Active tasks: ${pendingTasks.length}. SCLI: ${scliScore}. Recovery: ${recoveryScore}%.`,
          recommendation: "Minimal layout active. Ambient notifications cleared. Work quietly on pending code files.",
          actions: [
            { id: 'screen', text: "Clear workspace layout clutter", completed: true },
            { id: 'water', text: "Drink water (+1 glass)", action: () => setHydration(h => Math.min(8, h + 1)) }
          ]
        };
    }
  };

  const advice = getCopilotAdvice();
  const Icon = advice.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div 
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative transform scale-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Gradients */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-2xl">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                AURA AI Copilot
              </h2>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${advice.badgeColor} mt-1 inline-block`}>
                {advice.model}
              </span>
            </div>
          </div>
          <button
            type="button"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 relative z-10 text-slate-700 dark:text-slate-300">
          {/* Diagnostic Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-100">
              <Icon className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold">{advice.title}</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
              {advice.analysis}
            </p>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              {advice.recommendation}
            </p>
          </div>

          {/* Interactive Actions checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Interactive Micro-Actions
            </h4>
            <div className="space-y-2">
              {advice.actions.map((act, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (act.action) act.action();
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                    act.completed 
                      ? 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 opacity-60 pointer-events-none'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:bg-slate-50/30 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                    act.completed
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850'
                  }`}>
                    {act.completed && <Check className="w-3 h-3" />}
                  </div>
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className={`text-xs truncate ${act.completed ? 'line-through text-slate-400' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
                      {act.text}
                    </span>
                    {act.action && (
                      <span className="text-[9px] font-mono uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-900 flex items-center gap-0.5">
                        {act.id === 'water' ? <Droplet className="w-2.5 h-2.5" /> : <Coffee className="w-2.5 h-2.5" />}
                        Trigger State
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 relative z-10">
          <span className="text-[10px] text-slate-400 font-mono">
            SCLI Status: {scliScore >= 75 ? "🔴 Overload Risk" : scliScore >= 45 ? "🟡 Flow State" : "🟢 Clear"}
          </span>
          <Button 
            variant="primary" 
            size="sm"
            onClick={onClose}
          >
            Acknowledge & Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AICopilotModal;
