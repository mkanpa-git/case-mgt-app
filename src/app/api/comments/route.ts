import { comments } from '@/data/mockData';
import { Comment } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('caseId');
  const result = caseId ? comments.filter(c => c.caseId === caseId) : comments;
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
