import {
  Account,
  Case,
  Comment,
  Contact,
  Document,
  Person,
  Task,
} from '@/types/entities';

export const persons: Person[] = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'Manager' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'Agent' },
];

export const accounts: Account[] = [
  { id: 'a1', name: 'Acme Corp', industry: 'Manufacturing' },
];

export const contacts: Contact[] = [
  {
    id: 'ct1',
    accountId: 'a1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@acme.com',
  },
];

export const cases: Case[] = [
  {
    id: 'c1',
    subject: 'First Case',
    description: 'Example case',
    status: 'New',
    priority: 'Medium',
    accountId: 'a1',
    contactId: 'ct1',
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
