import { cookies } from 'next/headers';
import SiteShell from '../components/SiteShell';
import '../index.css';
import '../showcase.css';
import '../process.css';
import '../inner-pages.css';
import '../case-study.css';
import '../toolkit.css';
import '../interface-lab.css';
import '../motion.css';

export const metadata = {
  metadataBase: new URL('https://ordonselli.info'),
  title: { default: 'Federico Ordonselli — Web Developer', template: '%s · Federico Ordonselli' },
  description: 'Thoughtful websites, web apps and custom tools. Federico Ordonselli, web developer in Rome: React, Next.js, TypeScript and real projects.',
  authors: [{ name: 'Federico Ordonselli' }],
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website', locale: 'en_US', alternateLocale: 'it_IT', siteName: 'Federico Ordonselli', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};
export const viewport = { themeColor: '#f6f5f0' };
export default async function RootLayout({ children }) {
  const lang = (await cookies()).get('lang')?.value === 'it' ? 'it' : 'en';
  return <html lang={lang}><body><SiteShell initialLang={lang}>{children}</SiteShell></body></html>;
}
