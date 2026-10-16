import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
export async function GET() {
  const user = await getSession();
  return NextResponse.json({ user: user ? { id: user.id, name: user.name, role: user.role } : null }, { headers: { 'Cache-Control': 'private, no-store' } });
}
