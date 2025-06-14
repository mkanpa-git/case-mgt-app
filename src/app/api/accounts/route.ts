import { accounts } from '@/data/mockData';
import { Account } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET() {
  return NextResponse.json(accounts);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Account>;
  const newAccount: Account = {
    id: uuid(),
    name: body.name || 'Account',
    industry: body.industry,
  };
  accounts.push(newAccount);
  return NextResponse.json(newAccount, { status: 201 });
}
