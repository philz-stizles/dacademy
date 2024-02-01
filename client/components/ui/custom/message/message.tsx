import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

export enum MessageType {
  success,
  error,
  info,
}

const COLOR: { [key: string]: string } = {
  error: 'bg-destructive/15 text-destructive',
  success: 'bg-emerald-500/15 text-emerald-500',
  info: '',
};

interface FormErrorProps {
  message?: string;
  type: MessageType;
}

const Message = ({ message, type = MessageType.success }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      className={clsx(
        'p-3 rounded-md flex items-center gap-x-2 text-sm',
        COLOR[type]
      )}
    >
      {type === MessageType.success ? (
        <CheckCircledIcon className="h-4 w-4" />
      ) : type === MessageType.error ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : (
        <ExclamationTriangleIcon className="h-4 w-4" />
      )}
      <p>{message}</p>
    </div>
  );
};

export default Message;
