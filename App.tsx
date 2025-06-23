import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { DailyQuote } from './components/quote/DailyQuote';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskList } from './components/tasks/TaskList';
import { TimerControls } from './components/timer/TimerControls';
import { TimerWidget } from './components/timer/TimerWidget';
import { useThemeStore } from './store/themeStore';

function App() {
  const { theme } = useThemeStore();
  
  // Apply theme class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary-50 dark:from-secondary-900 dark:to-secondary-800 text-secondary-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <DailyQuote />
        
        <TimerControls />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <TaskForm />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          <TaskList />
        </div>
      </main>
      
      <TimerWidget />
    </div>
  );
}

export default App;