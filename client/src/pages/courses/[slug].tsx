import { getCourse, getCourses } from '@/actions/courses';
import {
  CourseHero,
  Curriculum,
  KeyPoints,
  Message,
} from '@/components/course';
import { HomeLayout } from '@/components/layouts';
import { OrderModal } from '@/components/ui/custom/modals';
import { useWeb3Context } from '@/context/web3-context';
import { useUserCourses } from '@/hooks/use-user-courses';
import { useWalletInfo } from '@/hooks/use-wallet-info';
import { TransformedCourse } from '@/models/course';
import { Order } from '@/models/order';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement, useCallback, useState } from 'react';

const CourseDetailsPage = ({
  course,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { web3, contract, requiresInstall, isLoading } = useWeb3Context();
  const { account, isConnecting, hasConnectedWallet } = useWalletInfo();
  const ownedCourse = useUserCourses(course);
  const courseState = ownedCourse.data?.state;
  // const ownedCourses = useOwnedCourses(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const isBusy = false;

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setIsNewPurchase(true);
  }, []);

  const _purchaseCourse = useCallback(
    async ({ hexCourseId, proof, value }: any, course: any) => {
      try {
        const result = await contract.methods
          .purchaseCourse(hexCourseId, proof)
          .send({ from: account, value });

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
        // setBusyCourseId(null);
      }
    },
    [account, contract?.methods]
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
    const hexCourseId = web3?.utils.utf8ToHex(course!.id);
    const orderHash = web3?.utils.soliditySha3(
      { type: 'bytes16', value: hexCourseId! },
      { type: 'address', value: account! }
    );
    const value = web3?.utils.toWei(String(order.price), 'ether');

    if (isNewPurchase) {
      const emailHash = web3?.utils.sha3(order.email);
      const proof = web3?.utils.soliditySha3(
        { type: 'bytes32', value: emailHash! },
        { type: 'bytes32', value: orderHash! }
      );

      _purchaseCourse({ hexCourseId, proof, value }, course);
    } else {
      _repurchaseCourse({ courseHash: orderHash, value }, course);
    }
  };

  return (
    <>
      <CourseHero
        // hasOwner={!!ownedCourse.data}
        hasOwner={false}
        title={course.title}
        description={course.description!}
        image={course.coverImage!}
        onAction={() => setIsModalOpen(true)}
      />

      <KeyPoints points={course.wsl} />
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
              functionality to watch the course has been temporaly disabled.
              <i className="block font-normal">
                Please contact info@eincode.com
              </i>
            </Message>
          )}
        </div>
      )} */}
      <Curriculum
        isLoading={isLoading}
        // locked={isLocked}
        courseState={courseState}
      />
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
    </>
  );
};

CourseDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
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

type Props = {
  course: TransformedCourse;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const course = await getCourse(params?.slug as string);

  if (!course) {
  }
  return {
    props: {
      course: course as TransformedCourse,
    },
  };
};

export default CourseDetailsPage;
