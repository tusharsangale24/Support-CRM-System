export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name, email, ID, subject, description..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}