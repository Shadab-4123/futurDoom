import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const promptExamples = [
  'Summarise this research paper for me',
  'Write a Python script to sort a list',
  'What causes northern lights?',
  'Help me draft a professional email',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-400 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-accent-400 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-300 blur-[100px]"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(var(--color-ink-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-400) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="default" className="gap-1.5 py-1.5">
              <Sparkles className="w-3 h-3 text-brand-500" />
              Powered by advanced AI
              <span className="w-1 h-1 rounded-full bg-brand-400 inline-block" />
              Free to try
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink-900 max-w-4xl"
          >
            Ask anything.{' '}
            <span className="gradient-brand-text">
              Get clarity.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-ink-400 max-w-2xl leading-relaxed"
          >
            QMee is your intelligent AI assistant — ready to answer questions, analyse content, write code, and help you think through anything, instantly.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 items-center">
            <Link to="/chat">
              <Button size="lg" className="group min-w-48">
                Start chatting free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
            </Link>
            <a href="#how-it-works" onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Button variant="secondary" size="lg" className="min-w-48">
                See how it works
              </Button>
            </a>
          </motion.div>

          {/* Trust note */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-xs text-ink-400"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            <span>No account required · Free tier available · Verify important responses</span>
          </motion.div>

          {/* Chat preview card */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl mt-4"
          >
            <div className="card p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-ink-300 ml-2 font-medium">QMee Chat</span>
              </div>

              {/* Mock message thread */}
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-xs bg-brand-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                    What is quantum entanglement, in simple terms?
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full gradient-brand flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">Q</span>
                  </div>
                  <div className="max-w-sm bg-surface-2 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-ink-700 leading-relaxed">
                    Quantum entanglement is when two particles become linked — measuring one instantly affects the other, no matter the distance. Einstein called it "spooky action at a distance." ✨
                  </div>
                </div>
              </div>

              {/* Prompt input mock */}
              <div className="mt-5 flex items-center gap-3 bg-ink-50/60 rounded-xl px-4 py-3 border border-ink-100">
                <span className="text-sm text-ink-300 flex-1">Ask QMee anything…</span>
                <div className="w-7 h-7 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prompt examples */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 max-w-2xl"
          >
            {promptExamples.map((p) => (
              <Link
                to="/chat"
                key={p}
                className="text-xs text-ink-500 bg-white border border-ink-100 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 rounded-full px-3 py-1.5 transition-all duration-150 cursor-pointer"
              >
                {p}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
