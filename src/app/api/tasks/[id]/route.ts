import { tasks } from '@/data/mockData';
import { NextResponse } from 'next/server';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const task = tasks.find(t => t.id === params.id);
  return task ? NextResponse.json(task) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const idx = tasks.findIndex(t => t.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const updates = await request.json();
  tasks[idx] = { ...tasks[idx], ...updates };
  return NextResponse.json(tasks[idx]);
}

export function DELETE(_: Request, { params }: { params: { id: string } }) {
  const idx = tasks.findIndex(t => t.id === params.id);
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const removed = tasks.splice(idx, 1);
  return NextResponse.json(removed[0]);
}
