import { ConfirmModal } from '@/components/modals';
import { Button } from '@/components/ui/button';
import { useConfetti } from '@/hooks/use-confetti';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const Actions = ({ disabled, courseId, isPublished }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfetti();

  const handleTogglePublish = useCallback(async () => {
    try {
      setIsLoading(true);

      const baseEndpoint = `/api/courses/${courseId}`;

      if (isPublished) {
        await axios.patch(`${baseEndpoint}/un-publish`);
        toast.success('Course unpublished');
      } else {
        await axios.patch(`${baseEndpoint}/publish`);
        toast.success('Course published');
        confetti.onOpen();
      }

      router.reload();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [confetti, courseId, isPublished, router]);

  const handleDelete = useCallback(() => {
    try {
    } catch (error) {}
  }, []);

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={handleTogglePublish}
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

export default Actions;
