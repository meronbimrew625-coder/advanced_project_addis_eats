import { NextResponse } from 'next/server';
import { getDishes } from '../../../lib/dishes';
export function GET(request) { const q = (request.nextUrl.searchParams.get('q') || '').trim().slice(0, 80).toLowerCase(); const dishes = getDishes().filter((d) => `${d.name} ${d.summary} ${d.description}`.toLowerCase().includes(q)); return NextResponse.json({ dishes }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }); }
