'use client';
import { useEffect, useState } from 'react';
import { Case } from '@/types/entities';
import Link from 'next/link';

export default function Home() {
  const [cases, setCases] = useState<Case[]>([]);
  const [title, setTitle] = useState('');

  async function loadCases() {
    const res = await fetch('/api/cases');
    setCases(await res.json());
  }

  useEffect(() => { loadCases(); }, []);

  async function createCase() {
    await fetch('/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    loadCases();
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input className="border p-2 flex-1" value={title} onChange={e => setTitle(e.target.value)} placeholder="New case title" />
        <button className="bg-blue-600 text-white px-4" onClick={createCase}>Add</button>
      </div>
      <ul className="space-y-2">
        {cases.map(c => (
          <li key={c.id} className="p-2 border rounded flex justify-between">
            <span>{c.title} - {c.status}</span>
            <Link href={`/case/${c.id}`} className="text-blue-600">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
