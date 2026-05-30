import { useEffect, useState } from 'react';
import { api } from '../services/api';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import TicketCard from '../components/TicketCard';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadTickets();
  }, [search, status]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await api.getTickets(search, status);
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar search={search} setSearch={setSearch} />
        <StatusFilter status={status} setStatus={setStatus} />
      </div>

      {loading ? (
        <div className="text-center py-10">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No tickets found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map(ticket => (
            <TicketCard key={ticket.ticket_id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}