import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { listOrdersForUser } from '../../lib/store';
import OrderStatus from './OrderStatus';
export const metadata = { title: 'My orders', robots: { index: false, follow: false } };
export default async function OrdersPage() { await connection();
  const user = await getSession(); if (!user) redirect('/signin'); const orders = listOrdersForUser(user.id); return <section className="page-wrap"><p className="eyebrow">Your account</p><h1>My orders</h1><p className="intro">Order status refreshes automatically every five seconds.</p>{orders.length ? <div className="stack">{orders.map((order) => <OrderStatus key={order.id} order={order} />)}</div> : <div className="empty-state"><p>You have no orders yet.</p><a className="button" href="/menu">Browse the menu</a></div>}</section>; }
