import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { getDishes } from '../../lib/dishes';
import CartCheckout from './CartCheckout';
export const metadata = { title: 'Checkout', robots: { index: false, follow: false } };
export default async function CheckoutPage() { await connection();
  const user = await getSession(); if (!user) redirect('/signin'); return <section className="page-wrap"><p className="eyebrow">Almost there</p><h1>Checkout</h1><p className="intro">Choose quantities. Your cart stays in the browser until you place your order.</p><CartCheckout dishes={getDishes()} /></section>; }
