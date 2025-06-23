import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Quote {
  text: string;
  author: string;
}

interface QuoteState {
  quote: Quote;
  lastUpdated: string;
  updateQuote: () => void;
}

// Predefined quotes for productivity
const quotes: Quote[] = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Your focus determines your reality.", author: "Qui-Gon Jinn" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Anonymous" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Productivity is never an accident. It is always the result of a commitment to excellence.", author: "Paul J. Meyer" },
  { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey" },
  { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie" },
  { text: "It's not knowing what to do, it's doing what you know.", author: "Tony Robbins" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Time is the scarcest resource and unless it is managed nothing else can be managed.", author: "Peter Drucker" },
  { text: "Either you run the day or the day runs you.", author: "Jim Rohn" }
];

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      quote: quotes[0],
      lastUpdated: new Date().toDateString(),
      
      updateQuote: () => {
        const today = new Date().toDateString();
        
        set((state) => {
          // If the quote was updated today, don't update it again
          if (state.lastUpdated === today) {
            return state;
          }
          
          // Generate a random index that's different from the current quote
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * quotes.length);
          } while (quotes[randomIndex].text === state.quote.text);
          
          return {
            quote: quotes[randomIndex],
            lastUpdated: today
          };
        });
      },
    }),
    {
      name: 'quote-storage',
    }
  )
);