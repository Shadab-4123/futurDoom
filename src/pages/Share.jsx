import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  MapPin,
  Share2,
  Copy,
  Check,
  ChevronDown,
  MessageCircle,
  Heart,
  Trash2,
  Sparkles,
  ExternalLink,
  Calendar,
  Users,
} from 'lucide-react';

function IconInstagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconX({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function IconLinkedIn({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function IconGitHub({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { profile, stats, threads, cssSnippet, tsxSnippet } from '../data/sharePage';

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('typescript', typescript);

const ease = [0.22, 1, 0.36, 1];

/* ── Code block ───────────────────────────────────────────────────── */
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-brand-500/20 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0D0D1A] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] font-mono text-white/35 uppercase tracking-widest ml-1">
            {language === 'css' ? 'styles.css' : 'useDebounce.tsx'}
          </span>
        </div>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1 text-[10px] text-white/35 hover:text-white/70 transition-colors px-2 py-0.5 rounded hover:bg-white/5"
        >
          {copied
            ? <><Check className="w-3 h-3 text-green-400" /><span className="text-green-400">Copied!</span></>
            : <><Copy className="w-3 h-3" /><span>Copy</span></>}
        </motion.button>
      </div>
      <SyntaxHighlighter
        language={language === 'css' ? 'css' : 'typescript'}
        style={atomOneDark}
        customStyle={{ margin: 0, padding: '1rem 1.25rem', background: '#12121E', fontSize: '0.75rem', lineHeight: '1.7', maxHeight: '220px', overflowY: 'auto' }}
        showLineNumbers
        lineNumberStyle={{ color: '#353550', minWidth: '2em' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/* ── Like button with toggle ───────────────────────────────────────── */
function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <motion.button
      onClick={() => setLiked(v => !v)}
      whileTap={{ scale: 0.85 }}
      className={`p-1.5 rounded-md transition-colors ${liked ? 'text-rose-500' : 'text-ink-300 hover:text-rose-400 hover:bg-rose-50'}`}
    >
      <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
    </motion.button>
  );
}

/* ── Thread card ──────────────────────────────────────────────────── */
function ThreadCard({ thread }) {
  const [expanded, setExpanded] = useState(false);
  const [shared, setShared] = useState(false);
  const navigate = useNavigate();
  const codeSnippet = thread.followUp?.codeLanguage === 'css' ? cssSnippet : tsxSnippet;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + '#thread-' + thread.id);
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  return (
    <motion.article
      id={`thread-${thread.id}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="bg-white rounded-2xl border border-ink-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 overflow-hidden"
    >
      {/* ── Date strip ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-50 bg-surface/50">
        <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium">
          <Calendar className="w-3.5 h-3.5 text-brand-400" />
          {thread.date}
        </div>
        <div className="flex items-center gap-0.5">
          <motion.button whileTap={{ scale: 0.88 }} onClick={handleShare}
            className="p-1.5 rounded-md text-ink-300 hover:text-brand-500 hover:bg-brand-50 transition-colors">
            {shared ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
          </motion.button>
          <LikeButton />
          <motion.button whileTap={{ scale: 0.88 }}
            className="p-1.5 rounded-md text-ink-300 hover:text-red-400 hover:bg-red-50 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* ── Chat bubbles ── */}
      <div className="px-5 py-4 space-y-4">
        {/* User question — left aligned */}
        <div className="flex items-end gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-200 to-ink-300 flex items-center justify-center flex-shrink-0 self-start mt-0.5">
            <span className="text-[10px] font-bold text-ink-600">
              {thread.asker.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="max-w-[80%]">
            <p className="text-[10px] font-semibold text-ink-400 mb-1">
              <span className="text-ink-700">{thread.asker}</span>
              <span className="font-normal ml-1 text-ink-300">asked</span>
            </p>
            <div className="bg-white border border-ink-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
              <p className="text-sm text-ink-800 leading-relaxed">{thread.question}</p>
            </div>
            <p className="text-[10px] text-ink-300 mt-1 ml-1">10:30 AM</p>
          </div>
        </div>

        {/* AI response — right aligned */}
        <div className="flex items-end gap-2.5 justify-end">
          <div className="max-w-[80%] flex flex-col items-end">
            <p className="text-[10px] font-semibold text-brand-400 mb-1 mr-1">
              replied <span className="gradient-brand-text font-bold">QMee</span>
              <Sparkles className="w-2.5 h-2.5 inline ml-0.5 text-brand-400" />
            </p>
            <div className="gradient-brand rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md shadow-brand-500/25">
              <p className="text-sm text-white leading-relaxed line-clamp-3">{thread.aiPreview}</p>
            </div>
            <p className="text-[10px] text-ink-300 mt-1 mr-1">10:32 AM</p>
          </div>
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 self-start mt-5 shadow-md shadow-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* ── Continue reading ── */}
      {thread.followUp && (
        <>
          <button
            onClick={() => setExpanded(v => !v)}
            className="w-full flex items-center justify-between px-5 py-2.5 border-t border-ink-50 text-xs font-medium hover:bg-brand-50/40 transition-colors group"
          >
            <div className="flex items-center gap-2 text-brand-500">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Continue reading…</span>
            </div>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22 }}>
              <ChevronDown className="w-4 h-4 text-ink-300 group-hover:text-brand-400" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="followup"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
              >
                <div className="px-5 pt-3 pb-4 space-y-3 bg-surface/40 border-t border-ink-50">
                  {/* Next question — same style as user bubble but smaller */}
                  <div>
                    <p className="text-[9px] font-bold text-ink-300 uppercase tracking-widest mb-1.5">Next question</p>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ink-200 to-ink-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[8px] font-bold text-ink-600">U</span>
                      </div>
                      <div className="bg-white border border-ink-100 rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
                        <p className="text-xs text-ink-800 leading-relaxed">{thread.followUp.user}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI response — same style as AI bubble but smaller */}
                  <div>
                    <p className="text-[9px] font-bold text-ink-300 uppercase tracking-widest mb-1.5 text-right">AI response</p>
                    <div className="flex items-start justify-end gap-2">
                      <div className="gradient-brand rounded-xl rounded-tr-sm px-3 py-2 shadow-sm shadow-brand-500/20 max-w-[85%]">
                        <p className="text-xs text-white leading-relaxed">{thread.followUp.ai}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-brand-500/30">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Code block */}
                  <CodeBlock language={thread.followUp.codeLanguage} code={codeSnippet} />

                  <button className="w-full text-center text-[11px] text-ink-300 hover:text-brand-500 transition-colors py-1 border-t border-ink-50 pt-2">
                    Click to view full conversation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Card footer ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-ink-50 bg-surface/40">
        <motion.button
          onClick={handleShare}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-xl text-ink-500 hover:text-brand-600 hover:bg-brand-50 border border-ink-100 hover:border-brand-200 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          {shared ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
          {shared ? 'Copied link' : 'Share'}
        </motion.button>

        <motion.button
          onClick={() => navigate(`/chat?thread=${thread.id}`)}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-xl gradient-brand text-white shadow-md shadow-brand-500/25 hover:shadow-brand-500/40 hover:brightness-110 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          View Thread
          <ExternalLink className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.article>
  );
}

/* ── Profile sidebar ──────────────────────────────────────────────── */
function ProfileSidebar() {
  const [interested, setInterested] = useState(false);
  const [interesting, setInteresting] = useState(false);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease }}
      className="w-full lg:w-[260px] flex-shrink-0"
    >
      <div className="bg-white rounded-2xl border border-ink-100 shadow-[var(--shadow-card)] overflow-hidden sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto">
        {/* Gradient banner */}
        <div className="relative h-20 gradient-brand">
          <div
            className="absolute inset-0 opacity-25"
            style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.5) 0%, transparent 65%)' }}
          />
        </div>

        <div className="px-5 pb-5">
          {/* Avatar floating over the banner — relative wrapper fixes the dot */}
          <div className="relative -mt-9 mb-3 w-fit">
            <div className="w-[72px] h-[72px] rounded-full gradient-brand flex items-center justify-center border-4 border-white shadow-lg shadow-brand-500/30">
              <span className="text-white text-xl font-bold tracking-tight">{profile.avatarInitials}</span>
            </div>
            {/* Online dot — positioned relative to the avatar circle */}
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white shadow-sm" />
          </div>

          <h2 className="text-[15px] font-bold text-ink-900 leading-tight">{profile.name}</h2>

          <div className="flex items-center gap-1 mt-1 mb-3">
            <MapPin className="w-3 h-3 text-brand-400 flex-shrink-0" />
            <span className="text-xs text-ink-500">{profile.location}</span>
          </div>

          {/* Role badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 mb-4">
            <Sparkles className="w-3 h-3 text-brand-500" />
            <span className="text-xs font-semibold text-brand-700">{profile.role}</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { Icon: IconInstagram, label: 'Instagram' },
              { Icon: IconX, label: 'X (Twitter)' },
              { Icon: IconLinkedIn, label: 'LinkedIn' },
              { Icon: IconGitHub, label: 'GitHub' },
            ].map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ scale: 1.12, y: -1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-ink-50 border border-ink-100 flex items-center justify-center text-ink-400 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* About */}
          <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-1.5">About</p>
          <p className="text-xs text-ink-600 leading-relaxed mb-5">{profile.bio}</p>

          {/* Interested / Interesting — stacked to avoid overflow */}
          <div className="flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setInterested(v => !v)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                interested
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Heart className={`w-3.5 h-3.5 ${interested ? 'fill-current' : ''}`} />
                Interested
              </span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${interested ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-500'}`}>
                {stats[1].value}
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setInteresting(v => !v)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                interesting
                  ? 'gradient-brand border-transparent text-white shadow-md shadow-brand-500/25'
                  : 'bg-brand-50 border-brand-200 text-brand-600 hover:bg-brand-100'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Interesting
              </span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${interesting ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-600'}`}>
                {stats[2].value}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

/* ── Community header ─────────────────────────────────────────────── */
function CommunityHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="rounded-2xl overflow-hidden mb-5 shadow-lg shadow-brand-500/15"
    >
      <div className="relative px-6 py-5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 55%)' }} />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.15em] mb-1.5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/40 inline-block" />
              Community
            </p>
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-xl font-bold text-white leading-tight">Share &amp; Connect</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
            <p className="text-sm text-white/60">Latest discussions and replies</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-xl px-3 py-2 backdrop-blur-sm">
            <MessageCircle className="w-3.5 h-3.5 text-white/80" />
            <span className="text-xs font-semibold text-white">{threads.length} conversations</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function Share() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: profile sidebar */}
            <ProfileSidebar />

            {/* Right: community + threads */}
            <div className="flex-1 min-w-0">
              <CommunityHeader />

              <div className="space-y-4">
                {threads.map(thread => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease }}
                className="mt-8 rounded-2xl gradient-brand p-px shadow-lg shadow-brand-500/20"
              >
                <div className="rounded-2xl bg-gradient-to-br from-brand-500/95 to-accent-500/90 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">Powered by QMee</p>
                    <p className="text-base font-bold text-white leading-snug">
                      Share your AI conversations globally
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Save, share, and discuss your conversations with the community.
                    </p>
                  </div>
                  <motion.a
                    href="/chat"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-600 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-150"
                  >
                    Log in &amp; explore
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
