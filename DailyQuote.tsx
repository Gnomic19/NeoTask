import { useEffect } from 'react';
import { Quote } from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

export function DailyQuote() {
  const { quote, updateQuote } = useQuoteStore();
  
  useEffect(() => {
    // Update quote when component mounts
    updateQuote();
  }, [updateQuote]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card glass className="mb-6">
        <div className="flex items-start p-4">
          <Quote className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm italic text-secondary-800 dark:text-secondary-200">
              "{quote.text}"
            </p>
            <p className="text-xs mt-1 text-secondary-600 dark:text-secondary-400">
              — {quote.author}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}