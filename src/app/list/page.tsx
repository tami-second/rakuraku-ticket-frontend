"use client"

import React, { useEffect, useState } from 'react';
import TicketItem from '../(components)/TicketItem';
import TicketsFilterForm from '../(components)/TicketsFilterForm';

type Ticket = {
    id: number;
    imagePath: string;
    title: string;
    date: string;
    price: number;
    where: string;
  };

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = (query = '', date = '') => {
    const url = new URL('/api/tickets/search', window.location.origin);
    if (query) url.searchParams.append('query', query);
    if (date) url.searchParams.append('date', date);

    fetch(url.toString())
      .then(response => response.json())
      .then(data => setTickets(data));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
     <div className="min-h-screen bg-gray-100">
      <div className="container p-4 flex items-center justify-center bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 items-center justify-center">検索</h1>
        <TicketsFilterForm onFilter={fetchTickets}/>
      </div>
      <h2>チケット一覧</h2>
        {tickets.map(ticket => (
          <TicketItem
            key={ticket.id}
            id={ticket.id}
            imagePath={ticket.imagePath}
            title={ticket.title}
            date={ticket.date}
            where={ticket.where}
          />
        ))}
     </div>
    </>
  );
};

export default TicketsPage;
