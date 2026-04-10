import { motion } from 'framer-motion';

const variants = {
  primary: 'gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:brightness-110',
  secondary: 'bg-white text-ink-900 border border-ink-100 hover:border-brand-300 hover:bg-brand-50',
  ghost: 'bg-transparent text-ink-600 hover:text-brand-500 hover:bg-brand-50',
  outline: 'bg-transparent border border-brand-500 text-brand-500 hover:bg-brand-50',
};

const sizes = {
  sm: 'h-9 px-4 text-sm rounded-xl',
  md: 'h-11 px-6 text-sm rounded-xl',
  lg: 'h-13 px-8 text-base rounded-2xl',
  xl: 'h-15 px-10 text-base rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
