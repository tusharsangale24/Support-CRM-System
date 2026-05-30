const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {
  async createTicket(ticketData) {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) throw new Error('Failed to create ticket');
    return response.json();
  },

  async getTickets(search = '', status = '') {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    const url = `${API_BASE_URL}/tickets${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch tickets');
    return response.json();
  },

  async getTicket(ticketId) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
    if (!response.ok) throw new Error('Ticket not found');
    return response.json();
  },

  async updateTicket(ticketId, updateData) {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error('Failed to update ticket');
    return response.json();
  },
};