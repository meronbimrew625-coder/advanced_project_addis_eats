import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const COOKIE_NAME = 'addis-eats-session';
function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET must be at least 32 characters. Copy .env.example to .env.local and set it.');
  return new TextEncoder().encode(secret);
}

export async function createSession(user) {
  const token = await new SignJWT({ sub: user.id, email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secretKey());
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub || !payload.email || !payload.role) return null;
    return { id: String(payload.sub), email: String(payload.email), name: String(payload.name || ''), role: String(payload.role) };
  } catch { return null; }
}

export async function requireUser() {
  const user = await getSession();
  if (!user) throw new Error('Please sign in to continue.');
  return user;
}

export async function requireKitchen() {
  const user = await requireUser();
  if (user.role !== 'kitchen') throw new Error('Kitchen staff access required.');
  return user;
}
