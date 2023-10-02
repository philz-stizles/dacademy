import axios from 'axios';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals';
import { TransformedChapter } from '@/types/course';
import { useRouter } from 'next/router';

type Props = {
  initialData: TransformedChapter;
  disabled: boolean;
};

const ChapterActions = ({ disabled, initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { id, courseId, isPublished } = initialData;

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${id}/un-publish`);
        toast.success('Chapter unpublished');
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${id}/publish`);
        toast.success('Chapter published');
      }

      router.reload();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${id}`);

      toast.success('Chapter deleted');
      router.reload();
      router.push(`/instructor/courses/${courseId}`);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={handleDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
