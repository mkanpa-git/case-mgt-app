import { POST } from '../src/app/api/comments/route';
import { PUT } from '../src/app/api/comments/[id]/route';

it('updates a comment', async () => {
  const createRes = await POST(
    new Request('http://test/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId: 'c1', authorId: 'u1', message: 'hi' }),
    }),
  );
  const created = await createRes.json();
  const updateRes = await PUT(
    new Request(`http://test/api/comments/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'updated' }),
    }),
    { params: { id: created.id } },
  );
  const updated = await updateRes.json();
  expect(updated.message).toBe('updated');
});

