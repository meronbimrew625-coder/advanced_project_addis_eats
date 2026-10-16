const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function robots() { return { rules: [{ userAgent: '*', allow: '/', disallow: ['/signin', '/signup', '/orders', '/checkout', '/kitchen'] }], sitemap: `${base}/sitemap.xml` }; }
