import { Container } from '@/components/shared';
import { InstructorCard } from '@/components/ui/custom/cards';
import Image from 'next/image';

const Instructors = () => {
  return (
    <section className="p-12">
      <Container className="flex flex-col justify-center items-center">
        <div className="mb-8 text-center">
          <h4 className="font-bold mb-0.5 text-indigo-700">
            Instructors/Learners
          </h4>
          <h2 className="text-3xl font-bold">What are you looking for?</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <InstructorCard
            className="translate-y-8"
            name="John Snders"
            title="Software Developer"
            imageSrc="https://i.pravatar.cc/300?img=1"
          />
          <InstructorCard
            name="John Snders"
            title="Software Developer"
            imageSrc="https://i.pravatar.cc/300?img=11"
          />
          <InstructorCard
            name="John Snders"
            title="Software Developer"
            imageSrc="https://i.pravatar.cc/300?img=12"
          />
          <InstructorCard
            className="translate-y-8"
            name="John Snders"
            title="Software Developer"
            imageSrc="https://i.pravatar.cc/300?img=16"
          />
        </div>
      </Container>
    </section>
  );
};

export default Instructors;
