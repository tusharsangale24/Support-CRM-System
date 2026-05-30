import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function CreateTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const result = await api.createTicket(form);
      alert(`Ticket created! ID: ${result.ticket_id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Support Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Customer Name *</label>
          <input
            type="text"
            name="customer_name"
            required
            value={form.customer_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Customer Email *</label>
          <input
            type="email"
            name="customer_email"
            required
            value={form.customer_email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Subject *</label>
          <input
            type="text"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            name="description"
            required
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          ></textarea>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
}