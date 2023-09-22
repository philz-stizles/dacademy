import { Fragment } from 'react';
import ActiveLink from '../active-link/active-link';

type BreadcrumbsItem = {
  href: string;
  value: string;
  requireAdmin?: boolean;
};

type BreadcrumbItemProps = {
  item: BreadcrumbsItem;
  index: number;
};

const BreadcrumbItem = ({ item, index }: BreadcrumbItemProps) => {
  return (
    <li
      className={`${
        index == 0 ? 'pr-4' : 'px-4'
      } font-medium text-gray-500 hover:text-gray-900`}
    >
      <ActiveLink href={item.href}>{item.value}</ActiveLink>
    </li>
  );
};

type BreadcrumbsProps = {
  items: BreadcrumbsItem[];
  isAdmin: boolean;
};

const Breadcrumbs = ({ items, isAdmin }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, i) => (
          <Fragment key={item.href}>
            {!item.requireAdmin && <BreadcrumbItem item={item} index={i} />}
            {item.requireAdmin && isAdmin && (
              <BreadcrumbItem item={item} index={i} />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
