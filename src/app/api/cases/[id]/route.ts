import { cases } from '@/data/mockData';
import { NextResponse } from 'next/server';

function findCase(id: string) {
  return cases.find(c => c.id === id);
}

export function GET(_: Request, { params }: { params: { id: string } }) {
  const c = findCase(params.id);
  return c ? NextResponse.json(c) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const idx = cases.findIndex(c => c.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const updates = await request.json();
  cases[idx] = { ...cases[idx], ...updates };
  return NextResponse.json(cases[idx]);
}

export function DELETE(_: Request, { params }: { params: { id: string } }) {
  const idx = cases.findIndex(c => c.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const removed = cases.splice(idx, 1);
  return NextResponse.json(removed[0]);
}
