import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Clock, Trash2, Edit, Check, X } from 'lucide-react';
import { Task, TaskPriority, TaskCategory } from '../../types';
import { formatDueDate } from '../../utils/dateUtils';
import { useTaskStore } from '../../store/taskStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface TaskItemProps {
  task: Task;
  onDragStart?: () => void;
  onEditClick?: (task: Task) => void;
}

export function TaskItem({ task, onDragStart, onEditClick }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTaskStore();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }
    
    deleteTask(task.id);
  };
  
  const cancelDelete = () => {
    setIsDeleting(false);
  };
  
  const categoryLabels: Record<TaskCategory, string> = {
    work: 'Work',
    personal: 'Personal',
    health: 'Health',
    learning: 'Learning',
    other: 'Other'
  };
  
  const priorityLabels: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-3"
    >
      <Card
        className={cn(
          "transition-all duration-200 hover:shadow-md",
          task.completed && "opacity-70"
        )}
      >
        <div className="p-4">
          <div className="flex items-center">
            <div className="mr-3">
              <Checkbox 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 
                className={cn(
                  "text-base font-medium text-secondary-900 dark:text-secondary-50",
                  task.completed && "line-through text-secondary-500 dark:text-secondary-400"
                )}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p 
                  className={cn(
                    "mt-1 text-sm text-secondary-600 dark:text-secondary-300",
                    task.completed && "line-through text-secondary-500 dark:text-secondary-400"
                  )}
                >
                  {task.description}
                </p>
              )}
              
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge priority={task.priority}>
                  {priorityLabels[task.priority]}
                </Badge>
                
                <Badge category={task.category}>
                  {categoryLabels[task.category]}
                </Badge>
                
                {task.dueDate && (
                  <div className="flex items-center text-xs text-secondary-500 dark:text-secondary-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDueDate(task.dueDate)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-1 ml-2">
              {isDeleting ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleDelete}
                    className="text-error-500"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={cancelDelete}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditClick?.(task)}
                  >
                    <Edit className="h-4 w-4 text-secondary-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 text-secondary-500" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}