import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTicket();
  }, [id]);

  const loadTicket = async () => {
    setLoading(true);
    try {
      const data = await api.getTicket(id);
      setTicket(data);
      setStatus(data.status);
    } catch (err) {
      setError('Ticket not found');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updateData = {};
      if (status !== ticket.status) updateData.status = status;
      if (note.trim()) updateData.note_text = note.trim();;
      
      if (Object.keys(updateData).length === 0) {
        alert('No changes made');
        return;
      }
      
      await api.updateTicket(id, updateData);
      alert('Ticket updated successfully');
      loadTicket(); // reload to show new notes and status
      setNote('');
    } catch (err) {
      alert('Failed to update ticket');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-6">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-6 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <button onClick={() => navigate('/')} className="text-blue-600 mb-4">← Back</button>
      <div className="bg-white border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold mb-2">{ticket.ticket_id}</h1>
        <p className="text-gray-500 mb-4">Created: {new Date(ticket.created_at).toLocaleString()}</p>
        
        <div className="space-y-3 mb-6">
          <div><strong>Customer:</strong> {ticket.customer_name} ({ticket.customer_email})</div>
          <div><strong>Subject:</strong> {ticket.subject}</div>
          <div><strong>Description:</strong> <p className="mt-1 text-gray-700">{ticket.description}</p></div>
        </div>

        <form onSubmit={handleUpdate} className="border-t pt-4">
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded px-3 py-2 w-full md:w-auto"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Add Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2"
              placeholder="Write a note about this ticket..."
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {updating ? 'Updating...' : 'Update Ticket'}
          </button>
        </form>

        {ticket.notes && ticket.notes.length > 0 && (
          <div className="border-t mt-6 pt-4">
            <h3 className="font-semibold mb-2">Notes History</h3>
            <ul className="space-y-2">
              {ticket.notes.map((n, idx) => (
                <li key={idx} className="bg-gray-50 p-3 rounded">
                  <p>{n.note_text}</p>
                  <p className="text-xs text-gray-400">{new Date(n.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}