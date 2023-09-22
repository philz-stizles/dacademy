import { Container } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { ArrowDownRight, ArrowUpRight, Presentation, School } from 'lucide-react';

const WhoAreYou = () => {
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
          <div className="grid grid-cols-2 gap-5">
            <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-4 p-4 text-center shadow-sm aspect-video">
              <Presentation strokeWidth={1.5} size={48} className="-mb-2" />
              <h3 className=" text-lg font-bold">
                Do you want to teach students?
              </h3>
              <p className=" text-slate-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus delectus est saepe cupiditate quaerat placeat eius
                veniam nihil.
              </p>
              <Button variant="outline">Register</Button>
            </div>
            <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-4 p-4 text-center shadow-sm aspect-video">
              <School strokeWidth={1.5} size={48} className=" -mb-2" />
              <h3 className=" text-lg font-bold">Are you a Learner?</h3>
              <p className=" text-slate-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus delectus est saepe cupiditate quaerat placeat eius
                veniam nihil.
              </p>
              <Button>
                <span>Visit the Market Place</span>
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default WhoAreYou;
