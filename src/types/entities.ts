export type CaseStatus = 'New' | 'Working' | 'Closed';

export type CasePriority = 'Low' | 'Medium' | 'High';

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Account {
  id: string;
  name: string;
  industry?: string;
}

export interface Contact {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Task {
  id: string;
  caseId: string;
  title: string;
  completed: boolean;
  assigneeId?: string;
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  url: string;
}

export interface Comment {
  id: string;
  caseId: string;
  authorId: string;
  message: string;
  createdAt: string;
}

export interface Case {
  id: string;
  subject: string;
  description: string;
  status: CaseStatus;
  priority?: CasePriority;
  accountId?: string;
  contactId?: string;
  assigneeId?: string;
  createdAt: string;
  dueDate?: string;
}
