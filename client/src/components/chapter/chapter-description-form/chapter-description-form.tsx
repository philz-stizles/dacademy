import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TransformedChapter } from '@/types/course';
import { RichText } from '@/components/ui/custom';

type Props = {
  initialData: TransformedChapter;
};

const formSchema = z.object({
  description: z.string().min(1),
});

export const ChapterDescriptionForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const { id, courseId, description } = initialData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description || '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleToggleEdit = () => setIsEditing((prevState) => !prevState);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${id}`, values);
      toast.success('Chapter updated');
      handleToggleEdit();
      router.reload();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter description
        <Button onClick={handleToggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            'text-sm mt-2',
            !description && 'text-slate-500 italic'
          )}
        >
          {!description && 'No description'}
          {description && <RichText value={description} readonly={true} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichText {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
