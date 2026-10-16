import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDish, getDishes } from '../../../lib/dishes';
export function generateStaticParams() { return getDishes().map((dish) => ({ id: dish.id })); }
export async function generateMetadata({ params }) { const { id } = await params; const dish = getDish(id); return dish ? { title: dish.name, description: dish.summary, openGraph: { title: dish.name, description: dish.summary, images: ['/opengraph-image'] } } : {}; }
export default async function DishPage({ params }) { const { id } = await params; const dish = getDish(id); if (!dish) notFound(); return <section className="page-wrap"><Link href="/menu">← Back to menu</Link><div className="detail-panel"><Image className="detail-image" src={dish.image} alt={dish.alt} width={900} height={600} sizes="(max-width: 760px) 100vw, 760px" /><p className="eyebrow">Addis Eats favorite</p><h1>{dish.name}</h1><p>{dish.description}</p><strong>{dish.price} ETB</strong><p><Link className="button" href="/checkout">Continue to checkout</Link></p></div></section>; }
