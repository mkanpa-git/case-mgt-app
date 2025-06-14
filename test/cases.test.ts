import { GET } from '../src/app/api/cases/route';

it('returns cases', async () => {
  const res = await GET(new Request('http://test/api/cases'));
  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});
