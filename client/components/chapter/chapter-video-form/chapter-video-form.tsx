import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, Video } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import MuxPlayer from '@mux/mux-player-react';
import { TransformedChapter } from '@/types/course';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/ui/custom';

type Props = {
  initialData: TransformedChapter;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { id, courseId, videoUrl, muxData } = initialData;

  const handleToggleEdit = () => setIsEditing((prevState) => !prevState);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${id}`, values);
      toast.success('Chapter updated');
      handleToggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={handleToggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={muxData?.playbackId || ''} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
