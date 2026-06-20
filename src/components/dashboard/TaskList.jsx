import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Plus, Flame, Sparkles } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * TaskList Component
 * Tracks active student workloads and weights deadlines.
 * Synchronized with the centralized tasks stack in ThemeModeContext.
 */
const TaskList = ({ activeMode = 'default' }) => {
  const { tasks, setTasks } = useThemeMode();
  const [newTask, setNewTask] = useState('');
  const [newWeight, setNewWeight] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const taskObject = {
      id: Date.now(),
      title: newTask,
      course: 'General Academic',
      weight: newWeight,
      completed: false,
      due: 'Pending Evaluation'
    };

    setTasks([taskObject, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, due: !task.completed ? 'Completed' : 'Pending' } : task
    ));
  };

  // Maps task severity weights to visual alerts inside the SCLI engine
  const getWeightBadge = (weight) => {
    const styles = {
      High: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800',
      Medium: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800',
      Low: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800'
    };
    return `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles[weight] || styles.Medium}`;
  };

  return (
    <Card 
      title="Dynamic Task Density Orchestration" 
      subtitle="Pending academic velocity & target load weights"
      variant={activeMode}
    >
      {/* Task Input Node */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Log a new assignment or item..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          aria-label="New assignment title"
          className="flex-1 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-slate-100"
        />
        
        <select
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          aria-label="New assignment workload load weight"
          className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-slate-300"
        >
          <option value="Low">Low Load</option>
          <option value="Medium">Mid Load</option>
          <option value="High">High Load</option>
        </select>

        <Button 
          type="submit" 
          variant={activeMode === 'default' ? 'primary' : activeMode} 
          className="!p-2.5"
          aria-label="Add task to workload"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      {/* Task Stack Render */}
      <div 
        className="space-y-2 max-h-[260px] overflow-y-auto pr-1"
        role="list"
        aria-label="Current student assignments and tasks list"
      >
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleTask(task.id);
                e.preventDefault();
              }
            }}
            tabIndex="0"
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Task: ${task.title}. Workload: ${task.weight}. Status: ${task.completed ? 'completed' : 'not completed'}.`}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              task.completed 
                ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-60' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-slate-400 hover:text-indigo-600 transition-colors flex-shrink-0" aria-hidden="true">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {task.title}
                </p>
                <span className="text-[11px] text-slate-400 block truncate">{task.course}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={getWeightBadge(task.weight)}>{task.weight}</span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {task.due}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contextual Suggestion Banner based on Mode */}
      <div aria-live="polite">
        {activeMode === 'pushMode' && (
          <div className="mt-4 p-2.5 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900 flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
            <Flame className="w-4 h-4 text-rose-500 animate-bounce" aria-hidden="true" />
            <span><strong>High Load warning:</strong> Overlap detected. Complete High Load items immediately!</span>
          </div>
        )}
        {activeMode === 'focusCoach' && (
          <div className="mt-4 p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900 flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span>Pomodoro sequence initiated. Focus exclusively on one task.</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskList;