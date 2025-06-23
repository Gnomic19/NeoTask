import { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove,
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';

import { Task } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { TaskItem } from './TaskItem';
import { SortableTaskItem } from './SortableTaskItem';
import { TaskForm } from './TaskForm';

export function TaskList() {
  const { tasks, reorderTasks } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      reorderTasks(newTasks);
    }
  };
  
  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };
  
  return (
    <div>
      {editingTask && (
        <div className="mb-6">
          <TaskForm 
            initialTask={editingTask} 
            onCancel={() => setEditingTask(null)}
            onSubmit={() => setEditingTask(null)}
          />
        </div>
      )}
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-secondary-500 dark:text-secondary-400">
                <p>No tasks yet. Create one to get started!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <SortableTaskItem 
                  key={task.id} 
                  task={task}
                  onEditClick={handleEditClick}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}