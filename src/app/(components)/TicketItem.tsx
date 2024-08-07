import React from 'react';

type TicketItemProps = {
  id: number;
  imagePath: string;
  title: string;
  date: string;
  where: string;
};

const TicketItem: React.FC<TicketItemProps> = ({ id, imagePath, title, date, where }) => {
  return (
    <div className="border p-4 mb-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-800 font-semibold">{where}</p>
    </div>
  );
};

export default TicketItem;