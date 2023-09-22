import Link from 'next/link';
import React from 'react';

type Props = {
  topic: string;
  to: string;
};

const TopicCard = ({ topic, to }: Props) => {
  return (
    <Link
      href={to}
      className="border-solid border border-gray-300 rounded-sm text-center py-3 hover:bg-gray-100 font-bold text-sm"
    >
      {topic}
    </Link>
  );
};

export default TopicCard;
