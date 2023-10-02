import { Container } from '@/components/shared';
import { Wsl } from '@prisma/client';

type Props = {
  points: Wsl[];
};

const KeyPoints = ({ points }: Props) => {
  return (
    <section>
      <Container>
        <div className="p-10 my-10 bg-white border border-indigo-100">
          <div className="max-w-7xl mx-auto">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-8">
              {points.map((point, i) => (
                <div key={point.id} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Keypoint {i + 1}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {point.name}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default KeyPoints;
