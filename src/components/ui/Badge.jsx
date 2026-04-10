export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-brand-100 text-brand-700 border border-brand-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    neutral: 'bg-ink-50 text-ink-600 border border-ink-100',
    dark: 'bg-ink-900 text-white border border-ink-800',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
