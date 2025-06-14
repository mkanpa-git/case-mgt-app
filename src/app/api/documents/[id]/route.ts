import { documents } from '@/data/mockData';
import { NextResponse } from 'next/server';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = documents.find(d => d.id === params.id);
  return doc ? NextResponse.json(doc) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const idx = documents.findIndex(d => d.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const updates = await request.json();
  documents[idx] = { ...documents[idx], ...updates };
  return NextResponse.json(documents[idx]);
}

export function DELETE(_: Request, { params }: { params: { id: string } }) {
  const idx = documents.findIndex(d => d.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const removed = documents.splice(idx, 1);
  return NextResponse.json(removed[0]);
}
