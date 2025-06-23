import { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskCategory } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PlusCircle, Save } from 'lucide-react';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const { addTask, updateTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const isEditing = !!initialTask;
  
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setPriority(initialTask.priority);
      setCategory(initialTask.category);
      
      if (initialTask.dueDate) {
        const date = new Date(initialTask.dueDate);
        setDueDate(date.toISOString().split('T')[0]);
        setDueTime(date.toTimeString().slice(0, 5));
      }
    }
  }, [initialTask]);
  
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    let dueDateObj: Date | undefined;
    
    if (dueDate) {
      dueDateObj = new Date(`${dueDate}T${dueTime || '00:00'}`);
    }
    
    if (isEditing && initialTask) {
      updateTask(initialTask.id, {
        title,
        description: description || undefined,
        priority,
        category,
        dueDate: dueDateObj,
      });
    } else {
      addTask({
        title,
        description: description || undefined,
        priority,
        category,
        dueDate: dueDateObj,
        completed: false,
      });
      
      // Reset form after adding
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('personal');
      setDueDate('');
      setDueTime('');
    }
    
    onSubmit?.();
  };
  
  return (
    <Card className="overflow-visible">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Task Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              error={errors.title}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details (optional)"
              className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-700 dark:text-white"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-700 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-700 dark:text-white"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="learning">Learning</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Due Date
              </label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="dueTime" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Due Time
              </label>
              <Input
                id="dueTime"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            
            <Button type="submit" className="flex items-center">
              {isEditing ? (
                <>
                  <Save className="mr-1 h-4 w-4" />
                  Update Task
                </>
              ) : (
                <>
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}