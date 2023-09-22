import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import CourseType from './components/course-type';
import CourseTitle from './components/course-title';
import CourseCategory from './components/course-category';
import axios from 'axios';
import { Icons } from '@/components/ui/icons';

const enum STEPS {
  COURSE_TYPE = 0,
  COURSE_TITLE = 1,
  COURSE_CATEGORY = 2,
  PRICE = 3,
}

const CreateCourseModal = () => {
  const [step, setStep] = useState(STEPS.COURSE_TYPE);
  const { isOpen, type, data, onClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [courseType, setCourseType] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    let timeOut: NodeJS.Timeout | null = null;
    if (!isOpen) {
      timeOut = setTimeout(() => {
        setStep(STEPS.COURSE_TYPE);
      }, 1000);
    }
    return () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.PRICE) {
      return handleContinue();
    }

    try {
      setIsLoading(true);
      const course = await axios.post('/api/courses', {
        type: courseType,
        title,
        category,
      });
      console.log(course);
      setIsLoading(false);
    } catch (error: any) {
      console.error('CREATE COURSE', error);
      setIsLoading(false);
    }
  }, [category, courseType, step, title]);

  const handleCloseModal = () => {
    setCourseType('');
    setTitle('');
    setCategory('');
    onClose();
    // setStep(STEPS.COURSE_TYPE);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  const isModalOpen = isOpen && type === 'createCourse';

  let content: { [key: number]: any } = {
    0: <CourseType value={courseType} onChange={setCourseType} />,
    1: <CourseTitle value={title} onChange={setTitle} />,
    2: <CourseCategory value={category} onChange={setCategory} />,
  };

  const hasContinue = step !== STEPS.PRICE;
  const canContinue = useMemo(() => {
    return (
      (step === STEPS.COURSE_TYPE && !courseType) ||
      (step === STEPS.COURSE_TITLE && !title) ||
      (step === STEPS.COURSE_CATEGORY && !category)
    );
  }, [category, courseType, step, title]);
  const hasPrevious = step !== STEPS.COURSE_TYPE;

  console.info('canContinue', canContinue);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:min-w-full h-screen flex flex-col">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Step 1 of 4</DialogTitle>
        </DialogHeader>
        {/* Content */}
        <div className="flex-1 flex flex-col item-center overflow-hidden">
          {content[step]}
        </div>
        {/* Footer */}
        <div className="flex sm:flex-row sm:justify-between sm:space-x-2">
          {hasPrevious && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {hasContinue ? (
            <Button
              className="ml-auto"
              disabled={canContinue}
              onClick={handleContinue}
            >
              Continue
            </Button>
          ) : (
            <Button className="ml-auto" onClick={handleSubmit}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
    // <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
    //   <DialogContent className="bg-white text-black p-0 overflow-hidden">
    //     <DialogHeader className="pt-8 px-6">
    //       <DialogTitle className="text-2xl text-center font-bold">
    //         Create Channel
    //       </DialogTitle>
    //     </DialogHeader>
    //   </DialogContent>
    // </Dialog>
  );
};

export default CreateCourseModal;
