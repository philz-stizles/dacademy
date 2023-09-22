import { useEffect, useState } from 'react';
import { CreateCourseModal } from '../modals';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <CreateCourseModal />
    </>
  );
};
