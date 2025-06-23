import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskPriority, TaskCategory } from '../types';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  getTasksByCategory: (category: TaskCategory) => Task[];
  getTasksByPriority: (priority: TaskPriority) => Task[];
  getCompletedTasksCount: () => number;
  getTotalTasksCount: () => number;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (taskData) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          completed: false,
          ...taskData,
        };
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) => 
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      toggleTaskCompletion: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => 
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      
      reorderTasks: (tasks) => {
        set({ tasks });
      },
      
      getTasksByCategory: (category) => {
        return get().tasks.filter((task) => task.category === category);
      },
      
      getTasksByPriority: (priority) => {
        return get().tasks.filter((task) => task.priority === priority);
      },
      
      getCompletedTasksCount: () => {
        return get().tasks.filter((task) => task.completed).length;
      },
      
      getTotalTasksCount: () => {
        return get().tasks.length;
      },
    }),
    {
      name: 'task-storage',
    }
  )
);