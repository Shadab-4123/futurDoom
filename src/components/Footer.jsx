import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Globe, ArrowRight } from 'lucide-react';

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

const footerColumns = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'feedback@qmee.app', href: 'mailto:feedback@qmee.app' },
      { label: 'www.qmee.app', href: '#' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'AI Chat', href: '/chat' },
      { label: 'Share', href: '/share' },
      { label: 'Community', href: '#' },
      { label: 'Explore', href: '#' },
    ],
  },
];

const socials = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'X (Twitter)', href: '#', Icon: XIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { label: 'GitHub', href: '#', Icon: GitHubIcon },
];

const badges = [
  { label: 'AI-Powered', Icon: Sparkles },
  { label: 'SSL Secure', Icon: Shield },
  { label: 'Global', Icon: Globe },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-surface-2 border-t border-ink-50">

      {/* ── Top banner ── */}
      <div className="border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* Brand + tagline + badges */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-md shadow-brand-500/20">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-ink-900">
                QMee
              </span>
            </Link>
            <p className="text-sm text-ink-500 leading-relaxed mb-4">
              Where curiosity meets AI — ask freely, explore deeply, feel empowered.
            </p>
            <div className="flex flex-wrap gap-2">
              {badges.map(({ label, Icon }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-ink-100 text-[11px] font-semibold text-ink-500 shadow-sm">
                  <Icon className="w-3 h-3 text-brand-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-auto lg:min-w-[340px]">
            <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.15em] mb-1.5">Stay in the loop</p>
            <p className="text-sm text-ink-600 mb-3">Get updates on new features &amp; AI releases.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium py-2">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">✓</span>
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 px-4 text-sm rounded-xl border border-ink-200 bg-white text-ink-900 placeholder:text-ink-300 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15 transition-all"
                />
                <button
                  type="submit"
                  className="h-10 px-5 rounded-xl gradient-brand text-white text-sm font-semibold shadow-md shadow-brand-500/25 hover:brightness-110 hover:shadow-brand-500/40 transition-all duration-150 flex items-center gap-1.5 flex-shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Link columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {footerColumns.map(col => (
            <div key={col.heading}>
              <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.15em] mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-500 hover:text-brand-600 transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us */}
          <div>
            <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.15em] mb-4">Follow Us</p>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white border border-ink-100 flex items-center justify-center text-ink-400 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50 transition-all duration-150 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} QMee. All rights reserved.
          </p>
          <a href="/chat" className="text-xs text-ink-400 hover:text-brand-600 transition-colors flex items-center gap-1 font-medium">
            Built with QMee AI
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

    </footer>
  );
}
