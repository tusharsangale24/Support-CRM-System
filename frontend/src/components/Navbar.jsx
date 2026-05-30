import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Support CRM</Link>
        <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
          + New Ticket
        </Link>
      </div>
    </nav>
  );
}