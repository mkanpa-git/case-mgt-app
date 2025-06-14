export type CaseStatus = 'Open' | 'In Progress' | 'Closed';

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
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
  title: string;
  description: string;
  status: CaseStatus;
  assigneeId?: string;
  createdAt: string;
  dueDate?: string;
}
