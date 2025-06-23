// Task Types
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'work' | 'personal' | 'health' | 'learning' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate?: Date;
  createdAt: Date;
}

// Timer Types
export interface TimerState {
  isActive: boolean;
  isPaused: boolean;
  duration: number; // in seconds
  timeLeft: number; // in seconds
  timerType: 'pomodoro' | 'short-break' | 'long-break' | 'custom';
}