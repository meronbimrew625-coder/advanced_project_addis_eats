import './globals.css';
import Link from 'next/link';
import AuthNav from './AuthNav';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Addis Eats | Ethiopian Food', template: '%s | Addis Eats' },
  description: 'Discover Ethiopian favorites and order from Addis Eats.',
  openGraph: { type: 'website', siteName: 'Addis Eats', title: 'Addis Eats', description: 'Ethiopian favorites, made with care.', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: 'Addis Eats', description: 'Ethiopian favorites, made with care.' }
};
export default async function RootLayout({ children }) {
  return <html lang="en"><body><header className="site-header"><Link className="brand" href="/">Addis Eats</Link><nav><Link href="/menu">Menu</Link><AuthNav /></nav></header><main>{children}</main><footer>© Addis Eats · Ethiopian food, shared with care.</footer></body></html>;
}
