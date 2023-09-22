import { Container } from '@/components/shared';

const TopCourses = () => {
  return (
    <section className="p-12">
      <div className="bg-indigo-50 rounded-xl py-12">
        <Container className="flex flex-col justify-center items-center">
          <div className="mb-8 text-center">
            <h4 className="font-bold mb-0.5 text-indigo-700">
              Instructors/Learners
            </h4>
            <h2 className="text-3xl font-bold">What are you looking for?</h2>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default TopCourses;
