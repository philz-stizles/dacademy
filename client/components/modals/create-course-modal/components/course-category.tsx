import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SetStateAction, useEffect, useState } from 'react';
import Wrapper from './wrapper';
import { Category } from '@prisma/client';
import axios from 'axios';
import useFetch from '@/hooks/use-fetch';

type Props = {
  value: string;
  onChange: (value: SetStateAction<string>) => void;
};

const CourseCategory = ({ value, onChange }: Props) => {
  const { data: categories } = useFetch<Category[]>({
    endpoint: '/categories',
    init: [],
  });

  return (
    <Wrapper
      title="What category best fits the knowledge you'll share?"
      description="This can also be updated later, should you change your mind."
    >
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map(({ id, title }) => (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Wrapper>
  );
};

export default CourseCategory;
