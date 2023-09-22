import { SearchIcon } from 'lucide-react';

type SearchProps = {
  label?: string;
};

const Search = ({ label }: SearchProps) => {
  return (
    <div className="relative rounded-md border border-neutral-800 py-2 ps-12 pe-4 flex-1 bg-neutral-100">
      <SearchIcon
        className="absolute top-[50%] left-4 translate-y-[-50%] text-neutral-500"
        size={20}
      />
      <input
        className="outline-none focus:outline-none w-full bg-transparent placeholder:text-sm placeholder:text-neutral-500 placeholder:font-light"
        type="search"
        placeholder="Search thousands of courses"
      />
    </div>
  );
};

export default Search;
