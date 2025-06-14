import { accounts } from '@/data/mockData';
import { NextResponse } from 'next/server';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const acc = accounts.find(a => a.id === params.id);
  return acc ? NextResponse.json(acc) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}
