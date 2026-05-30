import { Link } from 'react-router-dom';

const statusColors = {
  'Open': 'bg-green-100 text-green-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Closed': 'bg-gray-100 text-gray-800',
};

export default function TicketCard({ ticket }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/ticket/${ticket.ticket_id}`} className="text-blue-600 hover:underline">
            <h3 className="font-semibold">{ticket.ticket_id}</h3>
          </Link>
          <p className="text-gray-700">{ticket.customer_name}</p>
          <p className="text-gray-600 text-sm">{ticket.subject}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(ticket.created_at).toLocaleString()}
      </p>
    </div>
  );
}