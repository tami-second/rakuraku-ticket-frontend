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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async (query = '', date = '') => {
    setIsLoading(true);
    setError(null);
    const url = new URL('/api/getTicketList', window.location.origin);
    if (query) url.searchParams.append('query', query);
    if (date) url.searchParams.append('date', date);

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  //初回レンダリング
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 mx-8 flex items-center justify-center bg-indigo-100 rounded-lg shadow-md">
        <TicketsFilterForm onFilter={fetchTickets}/>
      </div>
      <div className='flex items-center justify-center my-6'>
        <h2>チケット一覧</h2>
        {isLoading ? (
          <div>読み込み中...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          tickets.map(ticket => (
            <TicketItem
              key={ticket.id}
              id={ticket.id}
              imagePath={ticket.imagePath}
              title={ticket.title}
              date={ticket.date}
              where={ticket.where}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
