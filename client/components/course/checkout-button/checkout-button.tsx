import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';

interface Props {
  price: number;
  courseId: string;
}

export const CheckoutButton = ({ price, courseId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={onClick} disabled={isLoading} className="w-full md:w-auto">
      Pay with Card
    </Button>
  );
};
