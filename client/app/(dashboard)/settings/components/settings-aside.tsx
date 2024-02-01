'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

const SettingsAside = (props: Props) => {
  const pathname = usePathname();

  const activeStyles = 'bg-muted hover:bg-muted';

  const linkStyles =
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start';

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        <Link
          className={clsx(
            linkStyles,
            pathname === '/settings'
              ? activeStyles
              : 'hover:bg-transparent hover:underline'
          )}
          href="/settings"
        >
          Profile
        </Link>
        <Link
          className={clsx(
            linkStyles,
            pathname.includes('/account')
              ? activeStyles
              : 'hover:bg-transparent hover:underline'
          )}
          href="/settings/account"
        >
          Account
        </Link>
        <Link
          className={clsx(
            linkStyles,
            pathname.includes('/appearance')
              ? activeStyles
              : 'hover:bg-transparent hover:underline'
          )}
          href="/settings/appearance"
        >
          Appearance
        </Link>
        <Link
          className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
          href="/settings/notifications"
        >
          Notifications
        </Link>
        <Link
          className={clsx(
            linkStyles,
            pathname.includes('/display')
              ? activeStyles
              : 'hover:bg-transparent hover:underline'
          )}
          href="/settings/display"
        >
          Display
        </Link>
      </nav>
    </aside>
  );
};

export default SettingsAside;
