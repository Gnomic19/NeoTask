import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { TaskItem } from './TaskItem';

interface SortableTaskItemProps {
  task: Task;
  onEditClick?: (task: Task) => void;
}

export function SortableTaskItem({ task, onEditClick }: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskItem 
        task={task} 
        onEditClick={onEditClick}
      />
    </div>
  );
}