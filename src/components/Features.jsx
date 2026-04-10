import { Zap, Search, Brain, LayoutTemplate, ShieldCheck, Clock } from 'lucide-react';
import { features } from '../data/features';
import { StaggerContainer, StaggerItem, FadeUp } from './ui/AnimatedSection';

const iconMap = { Zap, Search, Brain, LayoutTemplate, ShieldCheck, Clock };

const colorMap = {
  brand: {
    bg: 'bg-brand-100',
    icon: 'text-brand-600',
    dot: 'bg-brand-400',
  },
  cyan: {
    bg: 'bg-cyan-50',
    icon: 'text-cyan-600',
    dot: 'bg-cyan-400',
  },
  violet: {
    bg: 'bg-violet-50',
    icon: 'text-violet-600',
    dot: 'bg-violet-400',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    dot: 'bg-rose-400',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    dot: 'bg-green-400',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    dot: 'bg-amber-400',
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white relative overflow-hidden scroll-mt-16">
      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-400 inline-block" />
            What QMee can do
            <span className="w-8 h-px bg-brand-400 inline-block" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            Everything you need,{' '}
            <span className="gradient-brand-text">built in</span>
          </h2>
          <p className="text-ink-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From quick lookups to deep analysis, QMee adapts to whatever you bring to the conversation.
          </p>
        </FadeUp>

        {/* Feature grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.09}
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            const colors = colorMap[feature.color];
            return (
              <StaggerItem key={feature.id}>
                <div className="card p-6 h-full group cursor-default">
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="font-semibold text-ink-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
