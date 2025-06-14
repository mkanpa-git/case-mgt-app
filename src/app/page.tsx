'use client';
import { useEffect, useState } from 'react';
import { Case } from '@/types/entities';
import Link from 'next/link';

export default function Home() {
  const [cases, setCases] = useState<Case[]>([]);
  const [subject, setSubject] = useState('');

  async function loadCases() {
    const res = await fetch('/api/cases');
    setCases(await res.json());
  }

  useEffect(() => { loadCases(); }, []);

  async function createCase() {
    await fetch('/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject }),
    });
    setSubject('');
    loadCases();
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="New case subject"
        />
        <button
          className="bg-blue-600 text-white px-4 disabled:opacity-50"
          onClick={createCase}
          disabled={!subject.trim()}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {cases.map(c => (
          <li key={c.id} className="p-2 border rounded flex justify-between">
            <span>
              {c.subject} -
              <span
                className={
                  c.status === 'Closed'
                    ? 'text-gray-600'
                    : c.status === 'Working'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }
              >
                {c.status}
              </span>
              {c.dueDate && (
                <span className="ml-2 text-sm text-gray-500">
                  (due {new Date(c.dueDate).toLocaleDateString()})
                </span>
              )}
            </span>
            <Link href={`/case/${c.id}`} className="text-blue-600">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
