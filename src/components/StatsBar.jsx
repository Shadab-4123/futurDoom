import { FadeUp } from './ui/AnimatedSection';

const stats = [
  { value: '10K+', label: 'Active users' },
  { value: '1M+', label: 'Questions answered' },
  { value: '98%', label: 'Satisfaction rate' },
  { value: '<1s', label: 'Avg. response time' },
];

export default function StatsBar() {
  return (
    <div className="bg-white border-y border-ink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold gradient-brand-text mb-1">{s.value}</p>
                <p className="text-sm text-ink-400">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
