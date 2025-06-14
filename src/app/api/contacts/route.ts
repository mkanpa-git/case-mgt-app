import { contacts } from '@/data/mockData';
import { Contact } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');
  const result = accountId ? contacts.filter(c => c.accountId === accountId) : contacts;
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Contact>;
  const newContact: Contact = {
    id: uuid(),
    accountId: body.accountId!,
    firstName: body.firstName || 'First',
    lastName: body.lastName || 'Last',
    email: body.email || '',
  };
  contacts.push(newContact);
  return NextResponse.json(newContact, { status: 201 });
}
