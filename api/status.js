export default async function handler(req, res) {
  const r = await fetch('https://api.lanyard.rest/v1/users/963891069945274408');
  const { data } = await r.json();
  const colorMap = {
    online: 'brightgreen',
    idle: 'yellow',
    dnd: 'red',
    offline: 'lightgrey',
  };
  res.json({
    schemaVersion: 1,
    label: 'Status',
    message: data.discord_status,
    color: colorMap[data.discord_status] ?? 'lightgrey',
  });
}