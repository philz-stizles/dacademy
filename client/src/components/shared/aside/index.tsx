import { Logo } from '@/components/ui/custom';
import AsideItem from './aside-item/aside-item';
import { BarChart, List } from 'lucide-react';

const routes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

const Aside = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full">
          {routes.map((route) => (
            <AsideItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
