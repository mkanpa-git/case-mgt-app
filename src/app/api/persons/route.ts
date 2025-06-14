import { persons } from '@/data/mockData';
import { Person } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET() {
  return NextResponse.json(persons);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Person>;
  const newPerson: Person = {
    id: uuid(),
    name: body.name || 'User',
    email: body.email || '',
    role: body.role || 'Agent',
  };
  persons.push(newPerson);
  return NextResponse.json(newPerson, { status: 201 });
}
