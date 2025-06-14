import { contacts } from '@/data/mockData';
import { NextResponse } from 'next/server';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const contact = contacts.find(c => c.id === params.id);
  return contact ? NextResponse.json(contact) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}
