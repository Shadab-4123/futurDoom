import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp } from './ui/AnimatedSection';
import Button from './ui/Button';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="relative rounded-3xl gradient-dark overflow-hidden p-12 sm:p-16 text-center">
            {/* Background glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full bg-brand-500/20 blur-[80px]" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-500/10 blur-[60px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-600/10 blur-[60px]" />
              {/* Dots pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"
              >
                <Sparkles className="w-7 h-7 text-brand-300" />
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
                Ready to think{' '}
                <span className="gradient-brand-text">smarter?</span>
              </h2>

              <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                Join thousands of users who get instant, accurate answers every day. Start for free — no sign-up required.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link to="/chat">
                  <Button size="lg" className="min-w-52 group">
                    Start chatting now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://www.linkedin.com/in/dipankar-porey-403320259/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="min-w-52 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                    Learn more
                  </Button>
                </a>
              </div>

              <p className="text-white/30 text-xs mt-2">
                QMee can generate inaccurate responses. Always verify important information through independent sources.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
