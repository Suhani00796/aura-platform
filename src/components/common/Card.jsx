import React from 'react';

/**
 * A highly adaptive Card container component that structures dashboard widgets
 * and seamlessly morphs styles based on AURA's active engine variants.
 */
const Card = ({ 
  children, 
  title, 
  subtitle, 
  action, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  
  // Base structural layout for all dashboard cards
  const baseStyles = 'p-5 rounded-2xl border transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-sm';

  // Dynamic theme-matching borders and background aesthetics
  const variants = {
    default: 'border-slate-200 dark:border-slate-800',
    
    // AURA Engine specific adaptations
    focusCoach: 'border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/5 font-mono shadow-emerald-500/5',
    supportiveMentor: 'border-amber-200 bg-amber-50/40 dark:bg-amber-950/10 rounded-3xl shadow-amber-500/5',
    pushMode: 'border-rose-500/40 bg-gradient-to-br from-white to-rose-50/20 dark:from-slate-900 dark:to-rose-950/10 shadow-md shadow-rose-500/5',
    minimal: 'border-slate-900 dark:border-slate-100 rounded-none bg-transparent shadow-none p-4 border-t-2 border-b-2 border-l-0 border-r-0'
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Header section rendering conditionally if title or action exists */}
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100/50 dark:border-slate-800/50">
          <div>
            {title && (
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}

      {/* Main Container Content */}
      <div className="text-slate-700 dark:text-slate-300 text-sm">
        {children}
      </div>
    </div>
  );
};

export default Card;