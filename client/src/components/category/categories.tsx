import { Category } from '@prisma/client';
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from 'react-icons/fc';
import { IconType } from 'react-icons';

import { CategoryItem } from './category-item';
import { TransformedCategory } from '@/types/category';
import { Container } from '../shared';

interface CategoriesProps {
  items: TransformedCategory[];
}

const iconMap: Record<Category['title'], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  'Computer Science': FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <section className="py-6">
      <Container>
        <div className="flex items-center gap-x-2 overflow-x-auto">
          {items.map((item) => (
            <CategoryItem
              key={item.id}
              label={item.title}
              icon={iconMap[item.title]}
              value={item.id}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
