import React from 'react';

/**
 * A reusable, flexible Button component designed to adapt to 
 * AURA's dynamic UI modes and states.
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  
  // Base classes applied to all buttons
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  // SCLI/Theme-aware style variants
  const variants = {
    // Shifting styles matching the current platform mode
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md shadow-indigo-500/20',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
    outline: 'border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 focus:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
    
    // Custom variations corresponding to specific AURA engine modes
    focusCoach: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 font-mono tracking-tight',
    supportiveMentor: 'bg-amber-100 text-amber-900 border border-amber-200 hover:bg-amber-200 focus:ring-amber-400 rounded-xl',
    pushMode: 'bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold uppercase tracking-wider hover:from-rose-700 hover:to-orange-600 focus:ring-rose-500 shadow-lg shadow-rose-500/30 animate-pulse-subtle',
    minimal: 'text-slate-900 underline hover:text-slate-600 focus:ring-slate-900 rounded-none p-0 bg-transparent'
  };

  // Size variations
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;