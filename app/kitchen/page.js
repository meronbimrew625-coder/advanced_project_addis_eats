import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { listAllOrdersForKitchen } from '../../lib/store';
import { updateOrderStatusAction } from '../actions';
export const metadata = { title: 'Kitchen dashboard', robots: { index: false, follow: false } };
export default async function KitchenPage() { await connection();
  const user = await getSession(); if (!user) redirect('/signin'); if (user.role !== 'kitchen') redirect('/orders'); const orders = listAllOrdersForKitchen(); return <section className="page-wrap"><p className="eyebrow">Staff only</p><h1>Kitchen dashboard</h1><p className="intro">Update order status. The server action independently checks your role.</p>{orders.length ? <div className="stack">{orders.map((order) => <article className="order-card" key={order.id}><div><strong>{order.id}</strong><span className="status">{order.status}</span></div><p>{order.items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}</p><form action={updateOrderStatusAction} className="status-form"><input type="hidden" name="orderId" value={order.id} /><select name="status" defaultValue={order.status}><option>Received</option><option>Preparing</option><option>Ready</option><option>Completed</option><option>Cancelled</option></select><button className="button" type="submit">Update status</button></form></article>)}</div> : <p>No orders yet.</p>}</section>; }
