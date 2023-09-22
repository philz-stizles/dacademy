import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SetStateAction } from 'react';
import Wrapper from './wrapper';

type Props = {
  value: string;
  onChange: (value: SetStateAction<string>) => void;
};

const CourseCategory = ({ value, onChange }: Props) => {
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
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Wrapper>
  );
};

export default CourseCategory;
