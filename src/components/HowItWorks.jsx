import { steps } from '../data/howItWorks';
import { FadeUp, StaggerContainer, StaggerItem } from './ui/AnimatedSection';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 gradient-hero relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-400/6 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-400 inline-block" />
            The process
            <span className="w-8 h-px bg-brand-400 inline-block" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            Simple as{' '}
            <span className="gradient-brand-text">1, 2, 3</span>
          </h2>
          <p className="text-ink-400 text-lg max-w-xl mx-auto">
            No learning curve. No setup. Just type and get answers.
          </p>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          staggerDelay={0.15}
        >
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

          {steps.map((s, i) => (
            <StaggerItem key={s.step}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                {/* Step number bubble */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/25 mb-6 z-10"
                >
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </motion.div>

                <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">
                  Step {s.step}
                </span>
                <h3 className="text-xl font-semibold text-ink-900 mb-3">{s.title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{s.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
