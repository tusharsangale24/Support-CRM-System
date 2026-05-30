export default function StatusFilter({ status, setStatus }) {
  const statuses = ['', 'Open', 'In Progress', 'Closed'];
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {statuses.map(s => (
        <option key={s || 'all'} value={s}>{s || 'All Status'}</option>
      ))}
    </select>
  );
}