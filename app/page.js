import Link from 'next/link';
import Image from 'next/image';
export const metadata = { title: 'Home', description: 'Discover Ethiopian favorites at Addis Eats.' };
export default function HomePage() { return <section className="hero"><div className="hero-copy"><p className="eyebrow">A taste of Ethiopia</p><h1>Good food brings us together.</h1><p>Explore comforting Ethiopian favorites, from rich Doro Wot to freshly brewed buna.</p><Link className="button" href="/menu">Explore the menu</Link></div><div className="hero-image"><Image src="/images/addis-eats.png" alt="Addis Eats restaurant food" width={900} height={700} priority sizes="(max-width: 700px) 100vw, 50vw" /></div></section>; }
