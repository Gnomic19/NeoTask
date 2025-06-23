import { create } from 'zustand';
import { TimerState } from '../types';

interface TimerStore extends TimerState {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
  tick: () => void;
  setDuration: (seconds: number) => void;
  setTimerType: (type: TimerState['timerType']) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  isActive: false,
  isPaused: false,
  duration: 25 * 60, // 25 minutes in seconds (default Pomodoro)
  timeLeft: 25 * 60,
  timerType: 'pomodoro',
  
  startTimer: () => set((state) => ({ 
    isActive: true, 
    isPaused: false,
    timeLeft: state.timeLeft > 0 ? state.timeLeft : state.duration 
  })),
  
  pauseTimer: () => set({ isPaused: true }),
  
  resetTimer: () => set((state) => ({ 
    isActive: false,
    isPaused: false,
    timeLeft: state.duration 
  })),
  
  stopTimer: () => set((state) => ({ 
    isActive: false,
    isPaused: false,
    timeLeft: state.duration 
  })),
  
  tick: () => set((state) => {
    if (!state.isActive || state.isPaused || state.timeLeft <= 0) {
      return state;
    }
    
    const newTimeLeft = state.timeLeft - 1;
    
    if (newTimeLeft <= 0) {
      return { 
        ...state,
        isActive: false,
        timeLeft: 0 
      };
    }
    
    return { 
      ...state,
      timeLeft: newTimeLeft 
    };
  }),
  
  setDuration: (seconds) => set({
    duration: seconds,
    timeLeft: seconds
  }),
  
  setTimerType: (type) => {
    const durations = {
      pomodoro: 25 * 60, // 25 minutes
      'short-break': 5 * 60, // 5 minutes
      'long-break': 15 * 60, // 15 minutes
      custom: 0 // Will be set separately
    };
    
    set({
      timerType: type,
      duration: type !== 'custom' ? durations[type] : 0,
      timeLeft: type !== 'custom' ? durations[type] : 0,
      isActive: false,
      isPaused: false
    });
  }
}));