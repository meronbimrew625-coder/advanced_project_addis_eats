import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import { getOrderForUser } from '../../../../lib/store';


export async function GET(_request, { params }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401, headers: { 'Cache-Control': 'private, no-store' } });
  const { id } = await params;
  const order = getOrderForUser(String(id), user.id);
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404, headers: { 'Cache-Control': 'private, no-store' } });
  return NextResponse.json({ order }, { headers: { 'Cache-Control': 'private, no-store' } });
}
