import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { FadeUp, StaggerContainer, StaggerItem } from './ui/AnimatedSection';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white relative overflow-hidden scroll-mt-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-400 inline-block" />
            What people say
            <span className="w-8 h-px bg-brand-400 inline-block" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            Loved by <span className="gradient-brand-text">curious minds</span>
          </h2>
          <p className="text-ink-400 text-lg max-w-xl mx-auto">
            Students, developers, researchers — they all found their answers with QMee.
          </p>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.12}
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="card p-7 h-full flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-ink-600 text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-ink-50">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Social proof bar */}
        <FadeUp delay={0.2} className="mt-16 text-center">
          <p className="text-sm text-ink-400 mb-6">Trusted by thousands of curious people every day</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {['Students', 'Developers', 'Researchers', 'Writers', 'Analysts'].map(label => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full gradient-brand" />
                <span className="text-xs font-medium text-ink-500">{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
