import { documents } from '@/data/mockData';
import { Document } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('caseId');
  const result = caseId ? documents.filter(d => d.caseId === caseId) : documents;
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Document>;
  const newDoc: Document = {
    id: uuid(),
    caseId: body.caseId!,
    name: body.name || 'Document',
    url: body.url || '#',
  };
  documents.push(newDoc);
  return NextResponse.json(newDoc, { status: 201 });
}
