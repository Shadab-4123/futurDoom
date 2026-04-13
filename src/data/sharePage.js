export const profile = {
  name: 'Shadab Raza',
  role: 'Full-Stack Developer',
  location: 'Delhi, India',
  bio: 'Building thoughtful digital experiences with React, Node, and a deep love for clean UI. Open-source contributor, coffee-driven. ☕',
  avatarInitials: 'SR',
};

export const stats = [
  { label: 'Conversations', value: '12' },
  { label: 'Interested', value: '3' },
  { label: 'Interesting', value: '3' },
];

export const cssSnippet = `/* Responsive card with gradient border */
.card {
  border-radius: 1rem;
  padding: 1.5rem;
  background: #fff;
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, #6C55F5, #06B6D4);
  z-index: -1;
}`;

export const tsxSnippet = `// Custom hook — debounced search
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;`;

/** Convert a thread object to the ChatInterface messages array format */
export function threadToMessages(thread) {
  const msgs = [
    {
      id: 1,
      role: 'user',
      content: thread.question,
      attachments: [],
    },
    {
      id: 2,
      role: 'assistant',
      content: thread.aiPreview,
    },
  ];
  if (thread.followUp) {
    msgs.push({
      id: 3,
      role: 'user',
      content: thread.followUp.user,
      attachments: [],
    });
    msgs.push({
      id: 4,
      role: 'assistant',
      content: thread.followUp.ai,
    });
  }
  return msgs;
}

export const threads = [
  {
    id: 1,
    date: 'Feb 19, 2026',
    asker: 'Dipankar Poreya',
    question: 'Hello, can you tell me about the best practices for React state management in 2026?',
    aiPreview: 'Great question! In 2026, the landscape has matured significantly. For local UI state, `useState` and `useReducer` remain the gold standard. For server state, React Query (TanStack Query) is dominant — it handles caching, revalidation, and loading states beautifully...',
    followUp: {
      user: 'Can you show me a complete example with CSS?',
      ai: "Absolutely! Here's a complete example with responsive design and gradient border styling...",
      codeLanguage: 'css',
      code: null, // uses cssSnippet
    },
    tags: ['React', 'State Management'],
  },
  {
    id: 2,
    date: 'Feb 12, 2026',
    asker: 'Acilok Kolifca',
    question: 'What is the difference between TypeScript generics and any? When should I use each?',
    aiPreview: '`any` is an escape hatch — it disables type checking entirely. Generics are the opposite: they preserve type safety while staying flexible. Think of a generic as a placeholder that gets resolved at compile time...',
    followUp: {
      user: 'Can you show me a reusable hook with TypeScript generics?',
      ai: "Sure! Here's a clean debounce hook using generics — it's fully type-safe and reusable for any value type:",
      codeLanguage: 'tsx',
      code: null, // uses tsxSnippet
    },
    tags: ['TypeScript', 'Generics'],
  },
  {
    id: 3,
    date: 'Feb 5, 2026',
    asker: 'Meera Nair',
    question: 'How does Framer Motion differ from CSS animations for production apps?',
    aiPreview: 'CSS animations are lightweight and GPU-accelerated, perfect for simple transitions. Framer Motion shines when you need gesture-driven motion, layout animations, or shared-element transitions — things that are either impossible or painful in vanilla CSS...',
    followUp: null,
    tags: ['Animation', 'UX'],
  },
];
