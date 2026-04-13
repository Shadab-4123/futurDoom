import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import Button from './ui/Button';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Share', href: '/share', isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm shadow-ink-900/5' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow duration-200">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-ink-900">
              QMee
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-ink-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all duration-150"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-ink-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all duration-150"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/chat">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/chat">
              <Button size="sm">
                <Sparkles className="w-3.5 h-3.5" />
                Try QMee
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-ink-50 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink-900/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-ink-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
                    <span className="text-white font-bold text-xs">Q</span>
                  </div>
                  <span className="font-bold text-lg tracking-tight">QMee</span>
                </div>
                <button
                  className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navLinks.map(link => (
                  link.isRoute ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-3 text-sm font-medium text-ink-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="block px-4 py-3 text-sm font-medium text-ink-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>

              <div className="p-5 border-t border-ink-50 flex flex-col gap-3">
                <Link to="/chat" className="w-full">
                  <Button variant="secondary" size="md" className="w-full">Sign in</Button>
                </Link>
                <Link to="/chat" className="w-full">
                  <Button size="md" className="w-full">
                    <Sparkles className="w-4 h-4" />
                    Try QMee free
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
