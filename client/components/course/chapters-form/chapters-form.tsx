import { useCallback, useState } from 'react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, PlusCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import axios from 'axios';
import ChaptersList from '../chapter-list/chapter-list';
import { TransformedChapter } from '@/types/course';

type Props = {
  chapters: TransformedChapter[];
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ chapters, courseId }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleToggleCreating = useCallback(
    async () => setIsCreating((prevState) => !prevState),
    []
  );

  const handleSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post(`/api/courses/${courseId}/chapters`, values);
        toast.success('Chapter created');
        handleToggleCreating();
        router.reload();
      } catch {
        toast.error('Something went wrong');
      }
    },
    [courseId, handleToggleCreating, router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/instructors/courses/${courseId}/chapters/${id}`);
    },
    [courseId, router]
  );

  const handleReOrder = useCallback((id: string) => {}, []);

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={handleToggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      <div
        className={cn(
          'text-sm mt-2',
          !chapters.length && 'text-slate-500 italic'
        )}
      >
        {!chapters.length && 'No chapters'}
        <ChaptersList
          onEdit={handleEdit}
          onReOrder={handleReOrder}
          items={chapters || []}
        />
      </div>

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
