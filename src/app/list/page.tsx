"use client"

import React, { useEffect, useState } from 'react';
import TicketItem from '../(components)/TicketItem';
import TicketsFilterForm from '../(components)/TicketsFilterForm';

type Ticket = {
    id: number;
    imagePath: string;
    title: string;
    date: Date;
    price: number;
    where: string;
};

type FilterFunction = (query: string, date: Date | null) => void;

const TicketsPage: React.FC = () => {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/getConcertList/');
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      const data: Ticket[] = await response.json();
      setAllTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const filterTickets: FilterFunction = (query, date) => {
    const filtered = allTickets.filter(ticket =>
      ticket.title.toLowerCase().includes(query.toLowerCase()) &&
      (!date || ticket.date >= date)
    );
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 flex items-center justify-center bg-indigo-100 rounded-lg shadow-md">
        <TicketsFilterForm onFilter={filterTickets}/>
      </div>
      <div className='flex items-center justify-center my-6'>
        <h2>チケット一覧</h2>
        {isLoading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          filteredTickets.map(ticket => (
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