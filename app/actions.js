'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME, createSession, requireKitchen, requireUser } from '../lib/auth';
import { cancelOrderForUser, createOrder, findUserByEmail, registerUser, updateOrderStatus, verifyPassword } from '../lib/store';

export async function signUpAction(formData) {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  if (name.length < 2 || name.length > 80) throw new Error('Name must be 2–80 characters.');
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) throw new Error('Enter a valid email address.');
  if (password.length < 10 || password.length > 128) throw new Error('Password must be 10–128 characters.');
  const user = registerUser({ name, email, password });
  await createSession(user);
  redirect('/orders');
}

export async function signInAction(formData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const user = findUserByEmail(email);
  if (!user || !verifyPassword(email, password)) throw new Error('Email or password is incorrect.');
  await createSession(user);
  // Intentionally do not honor arbitrary `next` query parameters: avoids open redirects.
  redirect(user.role === 'kitchen' ? '/kitchen' : '/orders');
}

export async function signOutAction() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect('/');
}

export async function placeOrderAction(formData) {
  const user = await requireUser();
  let items;
  try { items = JSON.parse(String(formData.get('items') || '[]')); } catch { throw new Error('Invalid cart data.'); }
  createOrder(user.id, items);
  redirect('/orders');
}

export async function updateOrderStatusAction(formData) {
  await requireKitchen();
  const orderId = String(formData.get('orderId') || '');
  const status = String(formData.get('status') || '');
  updateOrderStatus(orderId, status);
  redirect('/kitchen');
}

export async function cancelOrder(orderId) {
  const user = await requireUser();
  const safeOrderId = String(orderId || '');
  cancelOrderForUser(safeOrderId, user.id);
  return { ok: true };
}

export async function cancelOrderAction(formData) {
  const orderId = String(formData.get('orderId') || '');
  await cancelOrder(orderId);
  redirect('/orders');
}
