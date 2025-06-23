import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) {
    return `Today at ${format(parsedDate, 'h:mm a')}`;
  } else if (isTomorrow(parsedDate)) {
    return `Tomorrow at ${format(parsedDate, 'h:mm a')}`;
  } else if (isYesterday(parsedDate)) {
    return `Yesterday at ${format(parsedDate, 'h:mm a')}`;
  }
  
  return format(parsedDate, 'MMM d, yyyy - h:mm a');
};

export const formatDueDate = (date: Date | string | undefined): string => {
  if (!date) return 'No due date';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) {
    return `Today, ${format(parsedDate, 'h:mm a')}`;
  } else if (isTomorrow(parsedDate)) {
    return `Tomorrow, ${format(parsedDate, 'h:mm a')}`;
  }
  
  return format(parsedDate, 'EEE, MMM d - h:mm a');
};

export const formatTimeLeft = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};