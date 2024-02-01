import { LucideSchool } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <h3 className="flex items-center gap-1 cursor-pointer">
        <LucideSchool size={32} />
        <span className="text-lg font-semibold">Dacademy</span>
      </h3>
    </Link>
  );
};

export default Logo;
