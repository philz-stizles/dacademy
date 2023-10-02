import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { FileUpload } from '@/components/ui/custom';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { z } from 'zod';
import axios from 'axios';
import { TransformedAttachment } from '@/types/course';

type Props = {
  attachments: TransformedAttachment[];
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ attachments, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleEdit = useCallback(
    () => setIsEditing((prevState) => !prevState),
    []
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
        toast.success('Attachment deleted');
        router.reload();
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setDeletingId(null);
      }
    },
    [courseId, router]
  );

  const handleSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post(`/api/courses/${courseId}/attachments`, values);
        toast.success('Course updated');
        handleToggleEdit();
        router.reload();
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [courseId, handleToggleEdit, router]
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={handleToggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => handleDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                handleSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
