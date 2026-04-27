export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const r = await fetch(
    'https://api.github.com/search/issues?q=author:mashdtu+is:pull-request&per_page=1',
    { headers }
  );
  const { total_count } = await r.json();

  res.json({
    schemaVersion: 1,
    label: 'Pull Requests',
    message: String(total_count ?? 0),
    color: 'purple',
  });
}
