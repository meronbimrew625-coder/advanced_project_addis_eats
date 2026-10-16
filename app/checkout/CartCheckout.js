'use client';
import { useState } from 'react';
import { placeOrderAction } from '../actions';
// Dish data is passed by the server; cart contents are client-side only.
export default function CartCheckout({ dishes }) {
  const [quantities, setQuantities] = useState({});
  const selected = dishes.filter((d) => Number(quantities[d.id]) > 0).map((d) => ({ dishId: d.id, quantity: Number(quantities[d.id]) }));
  const total = dishes.reduce((sum, d) => sum + d.price * Math.max(0, Number(quantities[d.id]) || 0), 0);
  return <form action={placeOrderAction} className="checkout-form"><input type="hidden" name="items" value={JSON.stringify(selected)} /><div className="stack">{dishes.map((dish) => <label className="quantity-row" key={dish.id}><span><strong>{dish.name}</strong><small>{dish.price} ETB each</small></span><input type="number" min="0" max="20" value={quantities[dish.id] || ''} onChange={(e) => setQuantities((old) => ({ ...old, [dish.id]: e.target.value }))} aria-label={`Quantity of ${dish.name}`} /></label>)}</div><div className="checkout-total"><span>Total</span><strong>{total} ETB</strong></div><button className="button" disabled={!selected.length} type="submit">Place order</button><p className="muted">Prices and totals are recalculated on the server.</p></form>;
}
