import { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimerStore } from '../../store/timerStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { formatTimeLeft } from '../../utils/dateUtils';

export function TimerWidget() {
  const { 
    isActive, 
    isPaused, 
    timeLeft, 
    timerType,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    stopTimer,
    tick 
  } = useTimerStore();
  
  const intervalRef = useRef<number | null>(null);
  
  // Handle timer countdown
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        tick();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, tick]);
  
  // Handle timer completion
  useEffect(() => {
    if (isActive && timeLeft <= 0) {
      // Play sound when timer completes
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3');
      audio.play().catch(err => console.error('Error playing sound:', err));
      
      // Show notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Complete!', {
          body: `Your ${timerType} timer has ended.`,
          icon: '/vite.svg'
        });
      }
    }
  }, [isActive, timeLeft, timerType]);
  
  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);
  
  if (!isActive) return null;
  
  const timerLabels = {
    pomodoro: 'Pomodoro',
    'short-break': 'Short Break',
    'long-break': 'Long Break',
    custom: 'Custom Timer'
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Card glass className="shadow-lg w-64">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-primary-500" />
                <h3 className="text-sm font-medium text-secondary-900 dark:text-white">
                  {timerLabels[timerType]}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={stopTimer}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center py-3">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">
                {formatTimeLeft(timeLeft)}
              </span>
            </div>
            
            <div className="flex justify-center space-x-2">
              {isPaused || timeLeft === 0 ? (
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={startTimer} 
                  disabled={timeLeft === 0}
                >
                  <Play className="h-4 w-4 mr-1" />
                  {timeLeft === 0 ? 'Finished' : 'Resume'}
                </Button>
              ) : (
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={pauseTimer}
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTimer}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}