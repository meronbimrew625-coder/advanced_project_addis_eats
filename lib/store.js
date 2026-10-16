import { randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { getDishes } from './dishes';

// Demo/local JSON-like store. Replace with a durable database before production deployment.
const users = [];
const orders = [
  { id: 'ord_812', userId: 'demo-customer', items: [{ dishId: 'doro-wot', name: 'Doro Wot', quantity: 1, price: 420 }], total: 420, status: 'Preparing', createdAt: '2026-01-01T12:00:00.000Z' }
];
const passwords = new Map();
const hashPassword = (password, salt = randomUUID()) => ({ salt, hash: scryptSync(password, salt, 64).toString('hex') });
const demoCustomer = { id: 'demo-customer', name: 'Demo Customer', email: 'customer@addiseats.test', role: 'customer' };
const demoKitchen = { id: 'demo-kitchen', name: 'Kitchen Staff', email: 'kitchen@addiseats.test', role: 'kitchen' };
users.push(demoCustomer, demoKitchen);
passwords.set(demoCustomer.email, hashPassword('AddisEats123!'));
passwords.set(demoKitchen.email, hashPassword('Kitchen123!'));

export function findUserByEmail(email) { return users.find((u) => u.email === email.toLowerCase()) || null; }
export function verifyPassword(email, password) {
  const record = passwords.get(email.toLowerCase());
  if (!record) return false;
  const actual = scryptSync(password, record.salt, 64);
  return timingSafeEqual(actual, Buffer.from(record.hash, 'hex'));
}
export function registerUser({ name, email, password }) {
  const normalized = email.trim().toLowerCase();
  if (findUserByEmail(normalized)) throw new Error('An account with this email already exists.');
  const user = { id: `usr_${randomUUID()}`, name: name.trim(), email: normalized, role: 'customer' };
  users.push(user);
  passwords.set(normalized, hashPassword(password));
  return user;
}
export function listOrdersForUser(userId) { return orders.filter((order) => order.userId === userId).map(({ userId: _private, ...order }) => order); }
export function getOrderForUser(orderId, userId) {
  const order = orders.find((item) => item.id === orderId && item.userId === userId);
  if (!order) return null;
  const { userId: _private, ...safe } = order;
  return safe;
}
export function listAllOrdersForKitchen() { return orders.map(({ userId: _private, ...order }) => order); }
export function updateOrderStatus(orderId, status) {
  const allowed = ['Received', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
  if (!allowed.includes(status)) throw new Error('Invalid status.');
  const order = orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Order not found.');
  order.status = status;
  return order;
}
export function createOrder(userId, rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length < 1 || rawItems.length > 20) throw new Error('Your cart is empty or invalid.');
  const dishes = getDishes();
  const items = rawItems.map((raw) => {
    const dish = dishes.find((d) => d.id === raw.dishId);
    const quantity = Number(raw.quantity);
    if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new Error('Invalid cart item.');
    return { dishId: dish.id, name: dish.name, quantity, price: dish.price };
  });
  const order = { id: `ord_${randomUUID()}`, userId, items, total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), status: 'Received', createdAt: new Date().toISOString() };
  orders.unshift(order);
  return order;
}

export function cancelOrderForUser(orderId, userId) {
  const order = orders.find((item) => item.id === orderId && item.userId === userId);
  if (!order) throw new Error('Order not found.');
  if (['Ready', 'Completed', 'Cancelled'].includes(order.status)) throw new Error('This order can no longer be cancelled.');
  order.status = 'Cancelled';
  return true;
}
