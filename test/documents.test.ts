import { POST } from '../src/app/api/documents/route';
import { PUT, DELETE } from '../src/app/api/documents/[id]/route';

it('creates and deletes a document', async () => {
  const createRes = await POST(
    new Request('http://test/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId: 'c1', name: 'Doc', url: '#' }),
    }),
  );
  const created = await createRes.json();
  const updateRes = await PUT(
    new Request(`http://test/api/documents/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated' }),
    }),
    { params: { id: created.id } },
  );
  const updated = await updateRes.json();
  expect(updated.name).toBe('Updated');
  const delRes = await DELETE(
    new Request(`http://test/api/documents/${created.id}`, { method: 'DELETE' }),
    { params: { id: created.id } },
  );
  const removed = await delRes.json();
  expect(removed.id).toBe(created.id);
});

