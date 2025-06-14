import { Case, Comment, Document, Person, Task } from '@/types/entities';

export const persons: Person[] = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'Manager' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'Agent' },
];

export const cases: Case[] = [
  {
    id: 'c1',
    title: 'First Case',
    description: 'Example case',
    status: 'Open',
    assigneeId: 'u2',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000).toISOString(),
  },
];

export const tasks: Task[] = [
  { id: 't1', caseId: 'c1', title: 'Initial review', completed: false, assigneeId: 'u2' },
];

export const documents: Document[] = [
  { id: 'd1', caseId: 'c1', name: 'Spec.pdf', url: '/docs/spec.pdf' },
];

export const comments: Comment[] = [
  { id: 'cm1', caseId: 'c1', authorId: 'u1', message: 'Initial comment', createdAt: new Date().toISOString() },
];
