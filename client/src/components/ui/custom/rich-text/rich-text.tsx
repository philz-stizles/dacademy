import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.snow.css';

type Props = {
  onChange: (value: string) => void;
  value: string;
  readonly?: boolean;
};

const RichText = ({ onChange, value, readonly = false }: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
};

export default RichText;
