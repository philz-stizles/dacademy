import { Container } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Code, Code2, PenTool, Presentation } from 'lucide-react';

const Categories = () => {
  return (
    <section className="py-12">
      <Container>
        <div className="mb-8 text-center">
          <h4 className="font-bold mb-0.5 text-indigo-700">
            Categories
          </h4>
          <h2 className="text-3xl font-bold">What are you looking for?</h2>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-6 p-6 text-center shadow-sm aspect-video border">
            <Code2 strokeWidth={1.5} size={36} className="-mb-2" />
            <div>
              <h3 className="font-bold">Software</h3>
              <p className="text-sm">Technology</p>
            </div>
          </div>
          <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-6 p-6 text-center shadow-sm aspect-video border">
            <PenTool strokeWidth={1.5} size={36} className="-mb-2" />
            <div>
              <h3 className="font-bold">Software</h3>
              <p className="text-sm">Technology</p>
            </div>
          </div>
          <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-6 p-6 text-center shadow-sm aspect-video border">
            <Code2 strokeWidth={1.5} size={36} className="-mb-2" />
            <div>
              <h3 className="font-bold">Software</h3>
              <p className="text-sm">Technology</p>
            </div>
          </div>
          <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-6 p-6 text-center shadow-sm aspect-video border">
            <Code2 strokeWidth={1.5} size={36} className="-mb-2" />
            <div>
              <h3 className="font-bold">Software</h3>
              <p className="text-sm">Technology</p>
            </div>
          </div>
          <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-6 p-6 text-center shadow-sm aspect-video border">
            <Code2 strokeWidth={1.5} size={36} className="-mb-2" />
            <div>
              <h3 className="font-bold">Software</h3>
              <p className="text-sm">Technology</p>
            </div>
          </div>
          <div className=" bg-white rounded-md flex flex-col items-center justify-center gap-6 p-6 text-center shadow-sm aspect-video border">
            <Code2 strokeWidth={1.5} size={36} className="-mb-2" />
            <div>
              <h3 className="font-bold">Software</h3>
              <p className="text-sm">Technology</p>
            </div>
          </div>
        </div>
        <div className='text-center py-10'>
          <Button variant="primary">
            <span>Explore More</span>
            <ArrowUpRight size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Categories;
