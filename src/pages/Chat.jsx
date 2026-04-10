import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';

export default function Chat() {
  return (
    <div className="flex flex-col bg-surface overflow-hidden" style={{ height: '100dvh' }}>
      {/* Top bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-ink-100 shadow-sm shadow-ink-900/3">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          Back to home
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shadow-sm shadow-brand-500/20">
            <span className="text-white font-bold text-xs">Q</span>
          </div>
          <span className="font-bold text-base tracking-tight text-ink-900">QMee</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span className="hidden sm:inline">AI Assistant</span>
        </div>
      </header>

      {/* Chat takes remaining height */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
