import { useEffect } from 'react';
import { Moon, Sun, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useThemeStore } from '../../store/themeStore';
import { useTaskStore } from '../../store/taskStore';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { getCompletedTasksCount, getTotalTasksCount } = useTaskStore();
  
  const completedTasks = getCompletedTasksCount();
  const totalTasks = getTotalTasksCount();
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-secondary-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-6 w-6 text-primary-500" />
            <h1 className="text-xl font-bold text-secondary-900 dark:text-white">
              NeoTask
            </h1>
          </div>
          
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <ProgressBar 
              value={completedTasks} 
              max={totalTasks || 1} 
              size="sm" 
              className="w-full"
              barClassName="bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <div className="flex justify-between mt-1 text-xs text-secondary-600 dark:text-secondary-400">
              <span>Progress</span>
              <span>{completedTasks} of {totalTasks} tasks ({Math.round(completionPercentage)}%)</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-300" />
              ) : (
                <Moon className="h-5 w-5 text-secondary-700" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}