import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import toast from 'react-hot-toast';

type Props = {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

const FileUpload = ({ onChange, endpoint }: Props) => {
  return (
    <p></p>
    // <UploadDropzone
    //   endpoint={endpoint}
    //   onClientUploadComplete={(res) => {
    //     onChange(res?.[0].url);
    //   }}
    //   onUploadError={(error: Error) => {
    //     toast.error(`${error?.message}`);
    //   }}
    // />
  );
};

export default FileUpload;
