import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  label?: string;
  href: string;
};

const ActiveLink = ({ children, label, href, className }: PropsWithChildren<Props>) => {
  const { pathname } = useRouter();
  let classNames = 'font-medium mr-8 text-gray-500 hover:text-gray-900';

  if (pathname === href) {
    classNames = `${classNames} text-indigo-600`;
  }

  return (
    <Link className={classNames} href={href}>
      {children || label}
    </Link>
  );
};

export default ActiveLink;
