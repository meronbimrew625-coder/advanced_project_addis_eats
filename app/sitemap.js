import { getDishes } from '../lib/dishes';
const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function sitemap() { return [{ url: base, changeFrequency: 'weekly', priority: 1 }, { url: `${base}/menu`, changeFrequency: 'weekly', priority: 0.9 }, ...getDishes().map((dish) => ({ url: `${base}/menu/${dish.id}`, changeFrequency: 'monthly', priority: 0.7 }))]; }
