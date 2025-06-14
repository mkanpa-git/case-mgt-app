'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Case, Task, Comment, CaseStatus } from '@/types/entities';

export default function CaseDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [commentMsg, setCommentMsg] = useState('');

  async function updateStatus(status: CaseStatus) {
    await fetch(`/api/cases/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function toggleTask(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    load();
  }

  const load = useCallback(async () => {
    const [cRes, tRes, cmRes] = await Promise.all([
      fetch(`/api/cases/${id}`),
      fetch(`/api/tasks?caseId=${id}`),
      fetch(`/api/comments?caseId=${id}`),
    ]);
    setCaseData(await cRes.json());
    setTasks(await tRes.json());
    setComments(await cmRes.json());
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function addTask() {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle, caseId: id }),
    });
    setTaskTitle('');
    load();
  }

  async function addComment() {
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commentMsg, caseId: id, authorId: 'u1' }),
    });
    setCommentMsg('');
    load();
  }

  if (!caseData) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{caseData.subject}</h2>
      <div className="flex items-center gap-2">
        <span>Status:</span>
        <select
          className="border p-1"
          value={caseData.status}
          onChange={e => updateStatus(e.target.value as CaseStatus)}
        >
          <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      {caseData.dueDate && (
        <p>Due: {new Date(caseData.dueDate).toLocaleDateString()}</p>
      )}

      <div>
        <h3 className="font-medium">Tasks</h3>
        <div className="flex gap-2 my-2">
          <input
            className="border p-1 flex-1"
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-2 disabled:opacity-50"
            onClick={addTask}
            disabled={!taskTitle.trim()}
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-4">
          {tasks.map(t => (
            <li key={t.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t)}
              />
              <span className={t.completed ? 'line-through' : ''}>{t.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-medium">Comments</h3>
        <div className="flex gap-2 my-2">
          <input
            className="border p-1 flex-1"
            value={commentMsg}
            onChange={e => setCommentMsg(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-2 disabled:opacity-50"
            onClick={addComment}
            disabled={!commentMsg.trim()}
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-4">
          {comments.map(c => <li key={c.id}>{c.message}</li>)}
        </ul>
      </div>
    </div>
  );
}
