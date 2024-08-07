import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

type TicketItemProps = {
  id: number;
  imagePath: string;
  title: string;
  date: string;
  where: string;
};

const TicketItem: React.FC<TicketItemProps> = ({ id, imagePath, title, date, where }) => {
  return (
    <Link href={`/list/${id}`}>
      <a className="block border p-4 mb-4 rounded shadow-lg hover:bg-gray-100">
      <Image src={`/sample/${imagePath}`} alt={title} width={600} height={400} className="mb-2 w-full h-auto" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{date}</p>
        <p className="text-gray-800 font-semibold">{where}</p>
      </a>
    </Link>
  );
};

export default TicketItem;