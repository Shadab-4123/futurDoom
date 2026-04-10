import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, RotateCcw, Copy, ThumbsUp, ThumbsDown, Paperclip } from 'lucide-react';
import Button from './ui/Button';

const suggestedPrompts = [
  'What is quantum computing?',
  'Write a haiku about the ocean',
  'Explain React hooks simply',
  'What causes climate change?',
  'Help me write a cover letter',
  'Summarise the Stoic philosophy',
];

const mockResponses = {
  default: "That's a great question! I've thought it through carefully and here's what I can tell you:\n\nThis is a demonstration of QMee's interface — in the live version, I would provide a detailed, accurate response drawing from a broad knowledge base, with citations where helpful.\n\nFeel free to ask anything — I'm designed to help with research, coding, writing, analysis, and much more. ✨",
  'What is quantum computing?': "**Quantum computing** is a type of computation that harnesses quantum mechanical phenomena — like superposition and entanglement — to process information.\n\nUnlike classical bits (0 or 1), quantum bits (qubits) can exist in multiple states simultaneously, allowing quantum computers to solve certain problems exponentially faster than classical computers.\n\n**Key applications include:**\n- Drug discovery and molecular simulation\n- Cryptography and security\n- Optimisation problems\n- AI and machine learning acceleration\n\nWe're still in the early 'NISQ era' — noisy intermediate-scale quantum — but companies like IBM, Google, and IonQ are making rapid progress.",
  'Write a haiku about the ocean': "Waves crash endlessly,\nSalt-kissed breeze carries secrets —\nDepths hold ancient dreams.",
};

function MessageBubble({ message, isLatest }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[75%] sm:max-w-[65%] bg-brand-500 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm leading-relaxed shadow-md shadow-brand-500/20">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3 group"
    >
      <div className="w-8 h-8 rounded-full gradient-brand flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm shadow-brand-500/20">
        <span className="text-white text-xs font-bold">Q</span>
      </div>
      <div className="flex-1 max-w-[75%] sm:max-w-[70%]">
        <div className="bg-white border border-ink-100 rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-ink-700 leading-relaxed shadow-sm">
          {message.content.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="font-semibold text-ink-900 mt-2 first:mt-0">{line.slice(2, -2)}</p>;
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="ml-4 list-disc text-ink-600 mt-1">{line.slice(2)}</li>;
            }
            if (line === '') return <div key={i} className="h-2" />;
            return <p key={i}>{line}</p>;
          })}
          {message.loading && (
            <span className="inline-flex gap-1 ml-1">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-brand-400 rounded-full inline-block"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                />
              ))}
            </span>
          )}
        </div>

        {/* Actions */}
        {!message.loading && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-ink-300 hover:text-ink-600 hover:bg-ink-50 transition-colors text-xs flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? 'Copied!' : ''}
            </button>
            <button className="p-1.5 rounded-lg text-ink-300 hover:text-green-500 hover:bg-green-50 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg text-ink-300 hover:text-red-500 hover:bg-red-50 transition-colors">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'assistant',
      content: "Hi! I'm QMee, your intelligent AI assistant. Ask me anything — from quick facts to in-depth analysis, I'm here to help. 👋",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    setInput('');
    const userMsg = { id: Date.now(), role: 'user', content };
    const loadingMsg = { id: Date.now() + 1, role: 'assistant', content: '', loading: true };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const reply = mockResponses[content] || mockResponses.default;

    setMessages(prev => prev.map(m =>
      m.id === loadingMsg.id ? { ...m, content: reply, loading: false } : m
    ));
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([{
      id: 0,
      role: 'assistant',
      content: "Chat cleared. I'm ready for your next question! 🙂",
    }]);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Chat header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b border-ink-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-sm shadow-brand-500/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-ink-900 text-sm">QMee</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-ink-400">Online · Ready to help</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors"
          title="New conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Suggested prompts when conversation is fresh */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-xs font-medium text-ink-400 mb-3 text-center">Try asking…</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedPrompts.map(p => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs text-ink-600 bg-white border border-ink-100 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 rounded-full px-3.5 py-1.5 transition-all duration-150"
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <MessageBubble key={msg.id} message={msg} isLatest={i === messages.length - 1} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-2 text-center">
        <p className="text-xs text-ink-300">
          QMee can generate inaccurate responses. Verify responses through independent sources.
        </p>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 px-4 sm:px-6 pb-5 pt-2">
        <div className="relative bg-white border border-ink-200 hover:border-brand-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 rounded-2xl transition-all duration-200 shadow-sm">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask QMee anything…"
            rows={1}
            className="w-full px-5 pt-4 pb-12 text-sm text-ink-900 placeholder:text-ink-300 bg-transparent resize-none outline-none leading-relaxed max-h-36 overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <button className="p-1.5 rounded-lg text-ink-300 hover:text-ink-500 hover:bg-ink-50 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="h-8 px-4 rounded-xl"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
