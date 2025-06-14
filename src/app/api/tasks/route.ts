import { tasks } from '@/data/mockData';
import { Task } from '@/types/entities';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('caseId');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  let result = caseId ? tasks.filter(t => t.caseId === caseId) : tasks;
  const start = (page - 1) * pageSize;
  result = result.slice(start, start + pageSize);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Task>;
  const newTask: Task = {
    id: uuid(),
    caseId: body.caseId!,
    title: body.title || 'Task',
    completed: false,
    assigneeId: body.assigneeId,
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
