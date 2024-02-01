import { Container } from '@/components/shared';
import Image from 'next/image';
import { CheckoutButton } from '../checkout-button/checkout-button';
import { TransformedCourse } from '@/types/course';
import { Button } from '@/components/ui/button';

type Props = {
  hasOwner: boolean;
  course: Omit<TransformedCourse, 'category' | 'author'>;
  onAction?: () => void;
};

const Hero = ({
  course: { id, title, description, coverImage },
  hasOwner,
  onAction,
}: Props) => {
  return (
    <section className="bg-slate-50">
      {/* <div className="relative bg-white bg-indigo-50 overflow-hidden"> */}
      <div className="relative bg-slate-50 overflow-hidden">
        <div className=" ">
          {/* <div className="relative flex items-center z-10 bg-white lg:max-w-2xl lg:w-full"> */}
          <div className="relative flex items-center z-10 bg-slate-50 lg:max-w-2xl lg:w-full">
            <svg
              // className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-slate-50 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
            <main className="mx-auto max-w-7xl py-12">
              <div className="sm:text-center lg:text-left">
                {hasOwner && (
                  <div className="text-xl inline-block p-4 py-2 rounded-full font-bold bg-green-200 text-green-700">
                    You are owner of:
                  </div>
                )}
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  <span className="block xl:inline">{title.substring(0)}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-sm sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0">
                  {description}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-3">
                  <Button
                    onClick={onAction}
                    className=" bg-indigo-600 hover:bg-indigo-700"
                  >
                    Purchase
                  </Button>
                  <CheckoutButton price={34} courseId={id} />
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-48 w-full object-cover sm:h-64 md:h-80 lg:w-full lg:h-full"
            src={coverImage!}
            alt={title}
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
