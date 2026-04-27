export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ user(login: "mashdtu") { pullRequests(first: 1) { totalCount } } }' }),
  });
  const { data } = await r.json();
  const total_count = data?.user?.pullRequests?.totalCount ?? 0;

  res.json({
    schemaVersion: 1,
    label: 'Pull Requests',
    message: String(total_count ?? 0),
    color: 'purple',
    cacheSeconds: 300,
  });
}
