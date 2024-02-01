import { Category } from '@prisma/client';
import { CategoryItem } from './category-item';
import { TransformedCategory } from '@/types/category';
import { Container } from '../shared';
import {
  Camera,
  Film,
  LucideIcon,
  MoveDownLeft,
  Music,
  Sparkles,
} from 'lucide-react';

interface CategoriesProps {
  items: TransformedCategory[];
}

const iconMap: Record<Category['title'], LucideIcon> = {
  Music: Music,
  Photography: Camera,
  Fitness: MoveDownLeft,
  Accounting: Sparkles,
  'Computer Science': Music,
  Filming: Film,
  Engineering: Music,
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
