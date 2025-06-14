import { persons } from '@/data/mockData';
import { NextResponse } from 'next/server';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const p = persons.find(pr => pr.id === params.id);
  return p ? NextResponse.json(p) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}
