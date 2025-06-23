import { useState } from 'react';
import { Timer, Play, Clock } from 'lucide-react';
import { useTimerStore } from '../../store/timerStore';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function TimerControls() {
  const { 
    isActive, 
    timerType, 
    startTimer, 
    setDuration, 
    setTimerType 
  } = useTimerStore();
  
  const [customMinutes, setCustomMinutes] = useState('25');
  
  const handleCustomDuration = () => {
    const minutes = parseInt(customMinutes, 10);
    if (!isNaN(minutes) && minutes > 0) {
      setDuration(minutes * 60);
      setTimerType('custom');
      startTimer();
    }
  };
  
  const handleTimerStart = (type: 'pomodoro' | 'short-break' | 'long-break') => {
    setTimerType(type);
    startTimer();
  };
  
  if (isActive) return null;
  
  return (
    <Card className="mb-6" glass>
      <CardHeader>
        <div className="flex items-center">
          <Timer className="h-5 w-5 mr-2 text-primary-500" />
          <h2 className="text-lg font-medium text-secondary-900 dark:text-white">
            Focus Timer
          </h2>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="glass"
              className="flex flex-col items-center py-3 h-auto"
              onClick={() => handleTimerStart('pomodoro')}
            >
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-sm">Pomodoro</span>
              <span className="text-xs text-secondary-500 dark:text-secondary-400">25:00</span>
            </Button>
            
            <Button
              variant="glass"
              className="flex flex-col items-center py-3 h-auto"
              onClick={() => handleTimerStart('short-break')}
            >
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-sm">Short Break</span>
              <span className="text-xs text-secondary-500 dark:text-secondary-400">05:00</span>
            </Button>
            
            <Button
              variant="glass"
              className="flex flex-col items-center py-3 h-auto"
              onClick={() => handleTimerStart('long-break')}
            >
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-sm">Long Break</span>
              <span className="text-xs text-secondary-500 dark:text-secondary-400">15:00</span>
            </Button>
          </div>
          
          <div className="flex space-x-2 items-center">
            <div className="flex-1">
              <label htmlFor="customTime" className="block text-xs text-secondary-600 dark:text-secondary-400 mb-1">
                Custom Duration (minutes)
              </label>
              <Input
                id="customTime"
                type="number"
                min="1"
                max="120"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="h-9"
              />
            </div>
            
            <Button
              variant="primary"
              className="mt-6"
              onClick={handleCustomDuration}
            >
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}