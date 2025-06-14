import { comments } from '@/data/mockData';
import { NextResponse } from 'next/server';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const c = comments.find(cm => cm.id === params.id);
  return c ? NextResponse.json(c) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}

export function DELETE(_: Request, { params }: { params: { id: string } }) {
  const idx = comments.findIndex(cm => cm.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const removed = comments.splice(idx, 1);
  return NextResponse.json(removed[0]);
}
