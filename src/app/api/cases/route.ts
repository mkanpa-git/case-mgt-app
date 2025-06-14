import { cases } from '@/data/mockData';
import { Case } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const result = status ? cases.filter(c => c.status === status) : cases;
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Case>;
  const newCase: Case = {
    id: uuid(),
    subject: body.subject ?? 'Untitled',
    description: body.description ?? '',
    status: 'New',
    priority: body.priority,
    accountId: body.accountId,
    contactId: body.contactId,
    createdAt: new Date().toISOString(),
    assigneeId: body.assigneeId,
    dueDate: body.dueDate,
  };
  cases.push(newCase);
  return NextResponse.json(newCase, { status: 201 });
}
