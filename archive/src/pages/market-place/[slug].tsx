import { getCourse, getCourses } from '@/actions/courses';
import StarRatings from 'react-star-ratings';
import MarketLayout from '@/components/layouts/market-layout/market-layout';
import { Container } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { OrderModal } from '@/components/ui/custom/modals';
import { useWeb3Context } from '@/context/web3-context';
import { useUserCourses } from '@/hooks/use-user-courses';
import { useWalletInfo } from '@/hooks/use-wallet-info';
import { Order } from '@/models/order';
import { TransformedCourse } from '@/types/course';
import {
  Check,
  Clock,
  Dot,
  Grip,
  Info,
  Languages,
  LineChart,
  PlayCircle,
  ShoppingCart,
  Subtitles,
} from 'lucide-react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { ReactElement, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/custom';
import { withToast } from '@/lib/toastify';

const CourseDetailsPage = ({
  course,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  const { web3, contract, requiresInstall, isLoading } = useWeb3Context();
  const { account, isConnecting, hasConnectedWallet } = useWalletInfo();
  const ownedCourse = useUserCourses(course);
  const courseState = ownedCourse.data?.state;
  // const ownedCourses = useOwnedCourses(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const [busyCourseId, setBusyCourseId] = useState<string | null>(null);
  const router = useRouter();
  const isBusy = false;

  const { id, title, description, coverImage, price, chapters, author } =
    course;

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setIsNewPurchase(true);
  }, []);

  const _purchaseCourse = useCallback(
    async ({ from, hexCourseId, proof, value }: any, course: any) => {
      try {
        const result = await contract.methods
          .purchaseCourse(hexCourseId, proof)
          .send({ from, value });

        // ownedCourses.mutate([
        //   ...ownedCourses.data,
        //   {
        //     ...course,
        //     proof,
        //     state: 'purchased',
        //     owner: account.data,
        //     price: value,
        //   },
        // ]);
        return result;
      } catch (error: any) {
        console.error(error);
      } finally {
        setBusyCourseId(null);
      }
    },
    [contract?.methods]
  );

  const _repurchaseCourse = useCallback(
    async ({ courseHash, value }: any, course: any) => {
      try {
        const result = await contract.methods
          .repurchaseCourse(courseHash)
          .send({ from: account, value });

        // const index = ownedCourses.data.findIndex((c) => c.id === course.id);

        // if (index >= 0) {
        //   ownedCourses.data[index].state = 'purchased';
        //   ownedCourses.mutate(ownedCourses.data);
        // } else {
        //   ownedCourses.mutate();
        // }
        return result;
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        // setBusyCourseId(null);
      }
    },
    [account, contract?.methods]
  );

  const handlePurchase = async (order: Order, course: TransformedCourse) => {
    const hexCourseId = web3?.utils.utf8ToHex(course.id);
    const orderHash = web3?.utils.soliditySha3(
      { type: 'bytes32', value: hexCourseId! },
      { type: 'address', value: account! }
    );
    const value = web3?.utils.toWei(String(order.price), 'ether');

    setBusyCourseId(course.id);
    if (isNewPurchase) {
      const emailHash = web3?.utils.sha3(order.email);
      const proof = web3?.utils.soliditySha3(
        { type: 'bytes32', value: emailHash! },
        { type: 'bytes32', value: orderHash! }
      );
      withToast(
        _purchaseCourse({ from: account, hexCourseId, proof, value }, course)
      );
    } else {
      withToast(_repurchaseCourse({ courseHash: orderHash, value }, course));
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-5 gap-12 py-12">
        <div className="flex flex-col gap-6 col-span-3">
          <figure className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              className="object-cover"
              src={coverImage!}
              alt={title}
              fill
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 p-2 pr-6 rounded-full text-sm text-slate-50 bg-[rgba(255,255,255,0.15)] backdrop-blur-[10px]">
              <PlayCircle size={24} />
              Preview
            </div>
          </figure>
          <h2 className="text-2xl font-semibold">{title}</h2>

          <section className="flex items-center gap-2">
            <Avatar
              className=" rounded-lg"
              src="https://i.pravatar.cc/150?img=4"
            />
            <span className="text-sm font-semibold">{author?.email}</span>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">What will you learn?</h3>
            {chapters?.map((chapter) => (
              <div
                key={chapter.id}
                className={cn(
                  'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
                  chapter.isPublished &&
                    'bg-sky-100 border-sky-200 text-sky-700'
                )}
              >
                <div
                  className={cn(
                    'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                    chapter.isPublished && 'border-r-sky-200 hover:bg-sky-200'
                  )}
                >
                  <Grip className="h-5 w-5" />
                </div>
                {chapter.title}
                <div className="ml-auto pr-2 flex items-center gap-x-2">
                  {/* {chapter.isFree && <Badge>Free</Badge>} */}
                  <span className="flex items-center text-sm">
                    <span className="">20 lectures</span>
                    <Dot />
                    <span className="">5hrs 20mins</span>
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex items-end gap-1">
            <div className="text-2xl font-medium">{price}</div>
            <span className="text-xs">eth</span>
          </div>

          <section className="border border-slate-200 rounded-lg grid grid-cols-2">
            <div className="flex items-center px-2 py-1 gap-2">
              <Clock size={18} />
              <div className="flex flex-col text-xs">
                <p className="text-slate-600">Duration</p>
                <p className="font-semibold">72hrs 12mins</p>
              </div>
            </div>
            <div className="flex items-center p-2 gap-2 border-l border-slate-200">
              <LineChart size={18} />
              <div className="flex flex-col text-xs">
                <p className="text-slate-600">Level</p>
                <p className="font-semibold">Intermediate</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Languages size={18} />
              <span className="flex items-center gap-1">
                <span className="font-semibold">Language:</span>
                <span className="text-slate-600">English</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Subtitles size={18} />
              <span className="flex items-center gap-1">
                <span className="font-semibold">Subtitles:</span>
                <span className="text-slate-600">English, Spanish, French</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Info size={18} />
              <span className="flex items-center gap-1">
                <span className="font-semibold">Last Updated on</span>
                <span className="text-slate-600">05/2023</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>4.7</span>
              <StarRatings
                starDimension="16px"
                starSpacing="1px"
                rating={5}
                starRatedColor="orange"
                changeRating={() => {}}
                numberOfStars={6}
                name="rating"
              />
              <span>(2,560 ratings)</span>
            </div>
          </section>

          <div className="flex items-center gap-2">
            <Button onClick={() => setIsModalOpen(true)} className=" ">
              {/* <Bitcoin size={18} /> */}
              <Image
                layout="fixed"
                height="18"
                width="18"
                src="/images/small-eth.webp"
                alt="eth"
              />
              <span>Purchase</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => {}}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </Button>
          </div>
          <section className="">
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="text-sm  flex flex-col gap-2">
              {[
                'You should have a fundamental understanding of HTML, CSS,and JavaScript. Familiarity with ES6 JavaScript features is beneficial.',
                'Install a code editor, such as Visual Studio Code, Sublime Text, or Atom, to write and manage your React code.',
                'Be comfortable using the command line or terminal for tasks like running scripts, installing packages, and navigating you project folders.',
                'Basic knowledge of Git and version control is useful for managing and collaborating on your React projects.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="inline-block">
                    <Check size={18} />
                  </span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm text-slate-600">
              Are you eager to unlock the full potential of React, the
              powerhouse of modern web development? Join us on a journey of
              discovery in our in-depth online tutorial, this video tutorial is
              designed to take you from React rookie to a confident pro.
            </p>
          </section>
        </div>
      </div>
      {/* <CourseHero
        // hasOwner={!!ownedCourse.data}
        hasOwner={false}
        course={course}
        onAction={() => setIsModalOpen(true)}
      />

      <KeyPoints points={course.wsl} /> */}
      {/* {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === 'purchased' && (
            <Message type="warning">
              Course is purchased and waiting for the activation. Process can
              take up to 24 hours.
              <i className="block font-normal">
                In case of any questions, please contact info@eincode.com
              </i>
            </Message>
          )}
          {courseState === 'activated' && (
            <Message type="success">
              Eincode wishes you happy watching of the course.
            </Message>
          )}
          {courseState === 'deactivated' && (
            <Message type="danger">
              Course has been deactivated, due the incorrect purchase data. The
              functionality to watch the course has been temporarily disabled.
              <i className="block font-normal">
                Please contact info@eincode.com
              </i>
            </Message>
          )}
        </div>
      )} */}
      {/* <Curriculum
        isLoading={isLoading}
        // locked={isLocked}
        courseState={courseState}
      /> */}
      {/* <Modal /> */}
      {course && (
        <OrderModal
          course={course}
          isOpen={isModalOpen}
          isNewPurchase={isNewPurchase}
          onSubmit={(order, course) => {
            handlePurchase(order, course);
            handleCloseModal();
          }}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

CourseDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MarketLayout>{page}</MarketLayout>;
};

export const getStaticPaths = async () => {
  const courses = await getCourses({});
  return {
    paths: courses.map((course) => ({
      params: { slug: course.slug },
    })),
    fallback: false,
  };
};

type StaticProps = {
  course: TransformedCourse;
};

export const getStaticProps: GetStaticProps<StaticProps> = async (ctx) => {
  const { slug } = ctx.params as { slug: string };
  const course = await getCourse(slug);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
    },
  };
};

export default CourseDetailsPage;
