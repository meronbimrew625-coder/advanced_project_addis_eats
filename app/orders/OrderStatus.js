'use client';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => { if (!r.ok) throw new Error('Unable to refresh'); return r.json(); });
export default function OrderStatus({ order }) {
  const { data } = useSWR(`/api/orders/${encodeURIComponent(order.id)}`, fetcher, { fallbackData: { order }, refreshInterval: 5000, revalidateOnFocus: true });
  const current = data?.order || order;
  return <article className="order-card"><div><strong>Order {current.id}</strong><span className="status">{current.status}</span></div><p>{current.items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}</p><p className="muted">{current.total} ETB · {new Date(current.createdAt).toLocaleString()}</p></article>;
}
