import { comments } from '@/data/mockData';
import { Comment } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('caseId');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  let result = caseId ? comments.filter(c => c.caseId === caseId) : comments;
  const start = (page - 1) * pageSize;
  result = result.slice(start, start + pageSize);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Comment>;
  const newComment: Comment = {
    id: uuid(),
    caseId: body.caseId!,
    authorId: body.authorId!,
    message: body.message || '',
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  return NextResponse.json(newComment, { status: 201 });
}
