'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
const fetcher = (url) => fetch(url).then((r) => { if (!r.ok) throw new Error('Search failed'); return r.json(); });
export default function SearchMenu({ initialDishes }) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => { const timer = setTimeout(() => setQuery(input.trim()), 300); return () => clearTimeout(timer); }, [input]);
  const key = query ? `/api/menu-search?q=${encodeURIComponent(query)}` : null;
  const { data, error, isLoading } = useSWR(key, fetcher, { keepPreviousData: true });
  const dishes = query ? (data?.dishes || []) : initialDishes;
  return <><label className="search-label">Search the menu<input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Try doro, tibs, buna…" /></label>{query && isLoading && <p className="muted">Searching…</p>}{error && <p role="alert">Could not search right now.</p>}<div className="dish-grid">{dishes.map((dish) => <article className="dish-card" key={dish.id}><div className="dish-photo"><Image src={dish.image} alt={dish.alt} width={640} height={420} sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="dish-content"><h2>{dish.name}</h2><p>{dish.summary}</p><div className="dish-bottom"><strong>{dish.price} ETB</strong><Link href={`/menu/${dish.id}`}>Details →</Link></div></div></article>)}</div>{dishes.length === 0 && <p>No dishes match that search.</p>}</>;
}
