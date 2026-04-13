import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, RotateCcw, Copy, ThumbsUp, ThumbsDown,
  Paperclip, X, FileText, Image, File, ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { threads, threadToMessages } from '../data/sharePage';

const ACCEPTED_TYPES = 'image/*,text/*,.pdf,.doc,.docx,.csv,.json,.md';
const MAX_FILE_MB = 10;

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

/* ─── helpers ─────────────────────────────────────────────────── */

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ type, className }) {
  if (type?.startsWith('image/')) return <Image className={className} />;
  if (type?.startsWith('text/') || /pdf|doc|csv|json/.test(type)) return <FileText className={className} />;
  return <File className={className} />;
}

function buildAttachmentReply(files) {
  const names = files.map(f => `"${f.name}"`).join(', ');
  const hasImage = files.some(f => f.type?.startsWith('image/'));
  const hasDoc   = files.some(f => !f.type?.startsWith('image/'));
  if (hasImage && hasDoc)
    return `I can see you've attached ${names}. I've received both image(s) and document(s). In the full version I would analyse the image content and read the document to give you a contextual response. What would you like to know?`;
  if (hasImage)
    return `I can see you've shared the image${files.length > 1 ? 's' : ''} — ${names}. In the full version I would describe, analyse, or answer questions about the visual content. What would you like to know?`;
  return `I've received ${names}. In the full version I would read and analyse the file content to help you summarise, query, or transform it. What would you like me to do with it?`;
}

/* ─── AttachmentChip ─────────────────────────────────────────── */

function AttachmentChip({ file, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.18 }}
      className="relative flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-xl px-3 py-2 max-w-[180px] group/chip flex-shrink-0"
    >
      {file.type?.startsWith('image/') && file.preview ? (
        <img src={file.preview} alt={file.name}
          className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
      ) : (
        <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
          <FileIcon type={file.type} className="w-4 h-4 text-brand-600" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-ink-700 truncate leading-tight">{file.name}</p>
        <p className="text-[10px] text-ink-400">{formatBytes(file.size)}</p>
      </div>
      <button
        onClick={() => onRemove(file.id)}
        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-ink-700 text-white flex items-center justify-center opacity-0 group-hover/chip:opacity-100 transition-opacity hover:bg-red-500 focus:outline-none"
        aria-label={`Remove ${file.name}`}
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </motion.div>
  );
}

/* ─── MessageBubble ──────────────────────────────────────────── */

function MessageBubble({ message }) {
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
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[75%] sm:max-w-[65%] flex flex-col gap-2 items-end">
          {/* Attachment previews in bubble */}
          {message.attachments?.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end">
              {message.attachments.map(file => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 bg-brand-600 border border-brand-400/40 rounded-2xl px-3 py-2"
                >
                  {file.type?.startsWith('image/') && file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <FileIcon type={file.type} className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white truncate max-w-[120px]">{file.name}</p>
                        <p className="text-[10px] text-white/60">{formatBytes(file.size)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {message.content && (
            <div className="bg-brand-500 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm leading-relaxed shadow-md shadow-brand-500/20">
              {message.content}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  /* assistant bubble */
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
            if (line.startsWith('**') && line.endsWith('**'))
              return <p key={i} className="font-semibold text-ink-900 mt-2 first:mt-0">{line.slice(2, -2)}</p>;
            if (line.startsWith('- '))
              return <li key={i} className="ml-4 list-disc text-ink-600 mt-1">{line.slice(2)}</li>;
            if (line === '') return <div key={i} className="h-2" />;
            return <p key={i}>{line}</p>;
          })}
          {message.loading && (
            <span className="inline-flex gap-1 ml-1">
              {[0, 1, 2].map(i => (
                <motion.span key={i}
                  className="w-1.5 h-1.5 bg-brand-400 rounded-full inline-block"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                />
              ))}
            </span>
          )}
        </div>

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

/* ─── ChatInterface ──────────────────────────────────────────── */

export default function ChatInterface() {
  const [searchParams] = useSearchParams();

  /* If ?thread=<id> is in the URL, pre-seed with that thread's messages */
  const threadId = searchParams.get('thread');
  const seedThread = useMemo(() => {
    if (!threadId) return null;
    return threads.find(t => String(t.id) === threadId) ?? null;
  }, [threadId]);

  const initialMessages = useMemo(() => {
    if (seedThread) return threadToMessages(seedThread);
    return [{
      id: 0,
      role: 'assistant',
      content: "Hi! I'm QMee, your intelligent AI assistant. Ask me anything — from quick facts to in-depth analysis, I'm here to help. 👋",
    }];
  }, [seedThread]);

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [dragOver, setDragOver]     = useState(false);
  const [fileError, setFileError]   = useState('');
  const [isLoading, setIsLoading]   = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const fileInputRef   = useRef(null);

  /* scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* revoke object URLs when attachments change or component unmounts */
  useEffect(() => {
    return () => {
      attachments.forEach(f => { if (f.preview) URL.revokeObjectURL(f.preview); });
    };
  }, [attachments]);

  /* process File[] from picker or drag-drop */
  const processFiles = useCallback((rawList) => {
    setFileError('');
    const toAdd = [];
    for (const raw of Array.from(rawList)) {
      if (raw.size > MAX_FILE_MB * 1024 * 1024) {
        setFileError(`"${raw.name}" is over the ${MAX_FILE_MB} MB limit.`);
        continue;
      }
      toAdd.push({
        id:      `${raw.name}-${Date.now()}-${Math.random()}`,
        name:    raw.name,
        size:    raw.size,
        type:    raw.type,
        preview: raw.type.startsWith('image/') ? URL.createObjectURL(raw) : null,
      });
    }
    if (toAdd.length) setAttachments(prev => [...prev, ...toAdd]);
  }, []);

  const removeAttachment = (id) => {
    setAttachments(prev => {
      const f = prev.find(x => x.id === id);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return prev.filter(x => x.id !== id);
    });
  };

  /* drag-and-drop handlers */
  const handleDragOver  = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = ()    => setDragOver(false);
  const handleDrop      = (e)   => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  };

  /* file input change */
  const handleFileInputChange = (e) => {
    if (e.target.files?.length) processFiles(e.target.files);
    e.target.value = '';   // allow re-selecting same file
  };

  /* send */
  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content && attachments.length === 0) return;
    if (isLoading) return;

    const snapshot = [...attachments];
    setInput('');
    setAttachments([]);
    setFileError('');

    const userMsg    = { id: Date.now(),     role: 'user',      content, attachments: snapshot };
    const loadingMsg = { id: Date.now() + 1, role: 'assistant', content: '', loading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const reply = snapshot.length > 0
      ? buildAttachmentReply(snapshot)
      : (mockResponses[content] || mockResponses.default);

    setMessages(prev => prev.map(m =>
      m.id === loadingMsg.id ? { ...m, content: reply, loading: false } : m
    ));
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleReset = () => {
    attachments.forEach(f => { if (f.preview) URL.revokeObjectURL(f.preview); });
    setAttachments([]);
    setFileError('');
    setMessages([{ id: 0, role: 'assistant', content: "Chat cleared. I'm ready for your next question! 🙂" }]);
  };

  const canSend = (input.trim().length > 0 || attachments.length > 0) && !isLoading;

  return (
    <div
      className={`relative flex flex-col h-full transition-colors duration-200 ${dragOver ? 'bg-brand-50' : 'bg-surface'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Drag-over overlay */}
      <AnimatePresence>
        {dragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-3 z-20 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-400 bg-brand-50/90 backdrop-blur-sm pointer-events-none"
          >
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mb-3 shadow-lg shadow-brand-500/20">
              <Paperclip className="w-6 h-6 text-white" />
            </div>
            <p className="text-brand-700 font-semibold text-sm">Drop files to attach</p>
            <p className="text-brand-400 text-xs mt-1">Images, PDFs, text — up to {MAX_FILE_MB} MB each</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b border-ink-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-sm shadow-brand-500/20">
            <Sparkles className="w-4 h-4 text-white" />
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
          title="New conversation"
          className="p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ── Thread context banner (shown when opened from /share) ── */}
      {seedThread && (
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 bg-brand-50 border-b border-brand-100">
          <div className="flex items-center gap-2 text-xs text-brand-700">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="font-medium">Continuing thread:</span>
            <span className="text-brand-600 truncate max-w-[240px]">{seedThread.question}</span>
          </div>
          <Link
            to="/share"
            className="flex items-center gap-1 text-xs font-medium text-brand-500 hover:text-brand-700 transition-colors flex-shrink-0 ml-3"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Share
          </Link>
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
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
                <button key={p} onClick={() => sendMessage(p)}
                  className="text-xs text-ink-600 bg-white border border-ink-100 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 rounded-full px-3.5 py-1.5 transition-all duration-150"
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* ── Disclaimer ── */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-2 text-center">
        <p className="text-xs text-ink-300">
          QMee can generate inaccurate responses. Verify responses through independent sources.
        </p>
      </div>

      {/* ── Input ── */}
      <div className="flex-shrink-0 px-4 sm:px-6 pb-5 pt-1">
        {/* File error */}
        <AnimatePresence>
          {fileError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-xs text-red-500 mb-2"
            >
              <X className="w-3 h-3 flex-shrink-0" /> {fileError}
            </motion.p>
          )}
        </AnimatePresence>

        <div className={`relative bg-white rounded-2xl shadow-sm transition-all duration-200 border ${
          dragOver
            ? 'border-brand-400 ring-2 ring-brand-400/20'
            : 'border-ink-200 hover:border-brand-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20'
        }`}>
          {/* Pending attachment chips */}
          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 px-4 pt-3 pb-1"
              >
                {attachments.map(file => (
                  <AttachmentChip key={file.id} file={file} onRemove={removeAttachment} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={attachments.length > 0 ? 'Add a message or send the file…' : 'Ask QMee anything…'}
            rows={1}
            className="w-full px-5 pt-4 pb-12 text-sm text-ink-900 placeholder:text-ink-300 bg-transparent resize-none outline-none leading-relaxed max-h-36 overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
          />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            {/* Paperclip — opens file picker */}
            <div className="relative">
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Attach file (or drag & drop)"
                className={`p-1.5 rounded-lg transition-colors ${
                  attachments.length > 0
                    ? 'text-brand-500 bg-brand-50'
                    : 'text-ink-300 hover:text-brand-500 hover:bg-brand-50'
                }`}
              >
                <Paperclip className="w-4 h-4" />
              </button>
              {attachments.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full gradient-brand text-white text-[9px] font-bold flex items-center justify-center pointer-events-none">
                  {attachments.length}
                </span>
              )}
            </div>

            <Button
              onClick={() => sendMessage()}
              disabled={!canSend}
              size="sm"
              className="h-8 px-4 rounded-xl"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </Button>
          </div>
        </div>

        <p className="text-[10px] text-ink-300 mt-1.5 px-1">
          Click <Paperclip className="w-2.5 h-2.5 inline relative -top-px" /> or drag &amp; drop files · Images, PDFs, text · Max {MAX_FILE_MB} MB each
        </p>
      </div>
    </div>
  );
}
