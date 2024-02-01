'use client';

import qs from 'query-string';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);
  const router = useRouter();
  const { query, pathname } = router;
  const { categoryId } = query;

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    Router.push(url);
  }, [categoryId, pathname, debouncedValue]);

  return (
    <div className="relative w-full">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-full pl-9 rounded-lg bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};

export default SearchInput;
