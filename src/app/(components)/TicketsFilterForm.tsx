import React, { useState } from 'react';

type FilterFormProps = {
  onFilter: (query: string, date: Date | null) => void;
};

const TicketsFilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateObject = date ? new Date(date) : null;
    onFilter(query, dateObject);
    alert('検索完了');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <input
        type="text"
        placeholder="関連ワードで検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <span className='text-gray-400'>
      以降の公演
      </span><br />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        絞り込み
      </button>
    </form>
  );
};

export default TicketsFilterForm;
