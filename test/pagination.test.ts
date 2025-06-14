import { GET, POST } from '../src/app/api/cases/route';

it('paginates cases', async () => {
  await POST(
    new Request('http://test/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'Case A' }),
    }),
  );
  await POST(
    new Request('http://test/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'Case B' }),
    }),
  );

  const res = await GET(new Request('http://test/api/cases?page=1&pageSize=1'));
  const data = await res.json();
  expect(data.length).toBe(1);
});

