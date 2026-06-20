import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import Card from '../common/Card';

/**
 * BurnoutForecastChart Component
 * Renders predictive timeline metrics mapping out upcoming cognitive overload thresholds.
 * Connected to global context to scale timeline dynamically.
 */
const BurnoutForecastChart = ({ activeMode = 'default' }) => {
  const { taskWeight } = useThemeMode();

  // Simulated timeline data points for weekly forecasting mapping [Day, StressScore (0-100)]
  // Scaled dynamically by taskWeight to show real-time changes
  const baseScale = Math.max(0.3, taskWeight / 70);
  const forecastData = [
    { day: 'Mon', score: Math.min(100, Math.round(35 * baseScale)), note: 'Baseline lectures' },
    { day: 'Tue', score: Math.min(100, Math.round(48 * baseScale)), note: 'Lab evaluation window' },
    { day: 'Wed', score: Math.min(100, Math.round(82 * baseScale)), note: 'OS Assignment Deadline Crisis', critical: Math.round(82 * baseScale) >= 75 },
    { day: 'Thu', score: Math.min(100, Math.round(70 * baseScale)), note: 'Post-deadline decay stage', critical: Math.round(70 * baseScale) >= 75 },
    { day: 'Fri', score: Math.min(100, Math.round(40 * baseScale)), note: 'Weekend decompression phase' },
    { day: 'Sat', score: Math.min(100, Math.round(30 * baseScale)), note: 'Stable recovery baseline' },
    { day: 'Sun', score: Math.min(100, Math.round(55 * baseScale)), note: 'Weekly re-orchestration pipeline setup' }
  ];

  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG dimensions for structural layouts
  const width = 500;
  const height = 180;
  const padding = 30;

  // Compute standard linear coordinate projections mapping scores onto the SVG coordinate system
  const points = forecastData.map((d, index) => {
    const x = padding + (index * (width - 2 * padding)) / (forecastData.length - 1);
    const y = height - padding - (d.score * (height - 2 * padding)) / 100;
    return { ...d, x, y };
  });

  // Construct standard SVG path strings using line commands
  const pathD = points.reduce((acc, p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, 
    ''
  );

  // Gradient area boundary box path string definition
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <Card 
      title="Predictive Burnout Forecasting Matrix" 
      subtitle="7-Day machine-learning forecast anticipating cognitive overload spikes"
      variant={activeMode}
    >
      <div className="space-y-4">
        
        {/* Native Inline SVG Render Node */}
        <div className="p-3 bg-slate-50/70 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 relative">
          <svg 
            className="w-full h-auto overflow-visible" 
            viewBox={`0 0 ${width} ${height}`}
            role="graphics-document"
            aria-label="Line chart showing a 7-day burnout risk forecast. Select chart dots to view day telemetry details."
          >
            <defs>
              {/* Fade area style definition */}
              <linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
              {/* Overload Alert Gradient definition */}
              <linearGradient id="alertFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background Grid Accent Lines */}
            {[25, 50, 75].map((level) => {
              const yPos = height - padding - (level * (height - 2 * padding)) / 100;
              return (
                <line 
                  key={level} x1={padding} y1={yPos} x2={width - padding} y2={yPos} 
                  stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800"
                  aria-hidden="true"
                />
              );
            })}

            {/* Critical Risk Area Backdrop Marker */}
            <rect 
              x={padding} y={padding} width={width - 2 * padding} height={(height - 2 * padding) * 0.3} 
              fill="url(#alertFade)" opacity="0.4"
              aria-hidden="true"
            />

            {/* Shaded Area Geometry */}
            <path d={areaD} fill="url(#chartFade)" className="transition-all duration-300" aria-hidden="true" />

            {/* The Predictive Vector Path Core Line */}
            <path 
              d={pathD} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              className="transition-all duration-300 dark:stroke-indigo-400" 
              aria-hidden="true"
            />

            {/* Node Scatter plot Coordinates mapped over vectors */}
            {points.map((p, i) => (
              <g 
                key={i} 
                className="cursor-pointer focus:outline-none"
                tabIndex="0"
                role="button"
                aria-label={`Forecast for ${p.day}: SCLI score ${p.score}%. ${p.note}.`}
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
                onFocus={() => setHoveredPoint(p)}
                onBlur={() => setHoveredPoint(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setHoveredPoint(p);
                    e.preventDefault();
                  }
                }}
              >
                <circle 
                  cx={p.x} cy={p.y} r={p.critical ? "6" : "4"}
                  fill={p.critical ? "#f43f5e" : "#6366f1"}
                  stroke="#ffffff" strokeWidth="2"
                  className="transition-all duration-200 hover:scale-125 dark:stroke-slate-900 focus:stroke-indigo-300 focus:scale-125"
                />
              </g>
            ))}

            {/* Text Labels Axis nodes */}
            {points.map((p, i) => (
              <text 
                key={i} x={p.x} y={height - 10} textAnchor="middle" 
                className="text-[10px] font-semibold fill-slate-400 font-mono"
                aria-hidden="true"
              >
                {p.day}
              </text>
            ))}
          </svg>

          {/* Critical Risk Floating Indicator Overlay */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
            <AlertTriangle className="w-3 h-3" aria-hidden="true" /> Overload Threshold (&gt;75%)
          </div>
        </div>

        {/* Dynamic Contextual Telemetry Breakdown Card Readout */}
        <div className="min-h-[56px] bg-slate-950 text-slate-300 p-3 rounded-xl border border-slate-800 text-xs flex items-center gap-3 transition-all duration-300">
          {hoveredPoint ? (
            <>
              <div className={`p-1.5 rounded-lg ${hoveredPoint.critical ? 'bg-rose-950 text-rose-400' : 'bg-slate-800 text-indigo-400'}`}>
                <Calendar className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="truncate">
                <p className="font-bold text-white font-mono uppercase tracking-wide">
                  Forecast for {hoveredPoint.day} — SCLI Intensity: <span className={hoveredPoint.critical ? 'text-rose-400' : 'text-indigo-400'}>{hoveredPoint.score}%</span>
                </p>
                <p className="text-slate-400 text-[11px] truncate">{hoveredPoint.note}</p>
              </div>
            </>
          ) : (
            <>
              <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 animate-pulse">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-slate-400">Hover or keyboard tab over forecast coordinates for telemetry updates...</p>
                <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">AURA ML Engine Active</p>
              </div>
            </>
          )}
        </div>

      </div>
    </Card>
  );
};

export default BurnoutForecastChart;