import { ChangeEventHandler, SetStateAction } from 'react';
import Wrapper from './wrapper';
import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (value: SetStateAction<string>) => void;
};

const CourseTitle = ({ value, onChange }: Props) => {
  return (
    <Wrapper
      title="What is the title of your new course?"
      description="You can always change this later if you think of a better name."
    >
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </Wrapper>
  );
};

export default CourseTitle;
