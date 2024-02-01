import { useBannerContext } from '@/context/banner-context';
import { X } from 'lucide-react';
import React from 'react';

type Props = {
  color?: string;
  content: string;
};

const SmartBar = ({ content }: Props) => {
  const { close, isOpen } = useBannerContext();

  if (!isOpen) return null;

  return (
    // bg-gradient
    <div className="flex items-center py-2 px-4 bg-indigo-700 text-white text-sm">
      <p className="flex justify-center flex-1">{content}</p>
      <span className="cursor-pointer">
        <X size={18} onClick={close} />
      </span>
    </div>
  );
};

export default SmartBar;
