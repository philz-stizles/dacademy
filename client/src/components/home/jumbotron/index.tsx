import { Container } from '@/components/shared';
import { Avatar } from '@/components/ui/custom';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/custom/cards/glass-card/glass-card';

import Image from 'next/image';
import { useRouter } from 'next/router';

const Jumbotron = () => {
  const router = useRouter();
  return (
    <div className=" min-h-[70vh] p-8 flex items-center bg-indigo-50">
      <Container>
        <div className="grid grid-cols-2 place-items-center">
          <div className="justify-self-start">
            <h1 className="text-5xl font-extrabold mb-4">
              Customize your learning journey to fit your goals, interests, and
              pace.
            </h1>
            <p className="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              ducimus consequuntur ipsum eum provident quisquam, tempora maxime
              labore. Magni dolore natus quo adipisci.
            </p>
            <Button onClick={() => router.push('/market-place')}>
              Go to market
            </Button>
          </div>

          <figure className="relative justify-self-end">
            <Image
              className=""
              src="/images/ai-generated-circle.png"
              alt=""
              width={400}
              height={400}
            />
            <GlassCard className="absolute top-1/2 -translate-y-1/2 -left-8">
              <div className="text-xs">Hello</div>
            </GlassCard>
            <GlassCard className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex flex-col justify-center items-center gap-0.5 text-center">
                <small className="text-xs">20+ Trainers & Instructors</small>
                <div className="flex items-center gap-7">
                  <div className="flex -mr-2">
                    <Avatar
                      className="-ml-2"
                      src="https://i.pravatar.cc/150?img=1"
                    />
                    <Avatar
                      className="-ml-2"
                      src="https://i.pravatar.cc/150?img=2"
                    />
                    <Avatar
                      className="-ml-2"
                      src="https://i.pravatar.cc/150?img=3"
                    />
                    <Avatar
                      className="-ml-2"
                      src="https://i.pravatar.cc/150?img=4"
                    />
                    <Avatar
                      className="-ml-2"
                      src="https://i.pravatar.cc/150?img=3"
                    />
                    <Avatar
                      className="-ml-2"
                      src="https://i.pravatar.cc/150?img=4"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </figure>
        </div>
      </Container>
    </div>
  );
};

export default Jumbotron;
