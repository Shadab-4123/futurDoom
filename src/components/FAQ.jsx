import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../data/faq';
import { FadeUp, StaggerContainer, StaggerItem } from './ui/AnimatedSection';

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <StaggerItem>
      <div className="border border-ink-100 rounded-2xl overflow-hidden bg-white hover:border-brand-200 transition-colors duration-200">
        <button
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          <span className="font-medium text-ink-900 text-sm leading-relaxed group-hover:text-brand-600 transition-colors">
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <ChevronDown className={`w-4 h-4 transition-colors ${open ? 'text-brand-500' : 'text-ink-300'}`} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-ink-50 mb-4" />
                <p className="text-ink-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StaggerItem>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 gradient-hero relative overflow-hidden scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-400 inline-block" />
            Got questions
            <span className="w-8 h-px bg-brand-400 inline-block" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            Frequently asked
          </h2>
          <p className="text-ink-400 text-lg">
            Everything you need to know about QMee.
          </p>
        </FadeUp>

        <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.08}>
          {faqs.map(faq => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
