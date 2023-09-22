import { Container } from '@/components/shared';
import Image from 'next/image';

type Props = {
  hasOwner: boolean;
  title: string;
  description: string;
  image: string;
  onAction?: () => void;
};

const Hero = ({ title, description, image, hasOwner, onAction }: Props) => {
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
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={onAction}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-6"
                    >
                      Purchase
                    </button>
                  </div>
                  {/* <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-2 md:text-lg md:px-6"
                    >
                      Watch
                    </a>
                  </div> */}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-48 w-full object-cover sm:h-64 md:h-80 lg:w-full lg:h-full"
            src={image}
            alt={title}
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
