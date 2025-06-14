import { cases } from '@/data/mockData';
import { Case } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  let result = status ? cases.filter(c => c.status === status) : cases;
  const start = (page - 1) * pageSize;
  result = result.slice(start, start + pageSize);
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
