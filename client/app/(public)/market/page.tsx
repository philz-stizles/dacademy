import { getCategories } from '@/actions/categories';
import { getCourses } from '@/actions/courses';
import { CourseSection } from '@/components/shared';
import { Fragment, useCallback, useState } from 'react';
import { MarketHeader } from '@/components/market';
// import { useWeb3Context } from '@/context/web3-context';
// import { useWalletInfo } from '@/hooks/use-wallet-info';
// import { Order } from '@/models/order';
// import { OrderModal } from '@/components/ui/custom/modals';
// import { TransformedCourse } from '@/types/course';
import { Categories } from '@/components/category/categories';

type Params = {
  params: {
    title: string;
    categoryId: string;
  };
};

const MarketPage = async ({ params }: Params) => {
  const categories = await getCategories({});
  const courses = await getCourses({
    filter: {
      isPublished: true,
      title: params.title,
      categoryId: params.categoryId,
    },
  });

  // const { web3, contract, requiresInstall } = useWeb3Context();
  // const { account, isConnecting, hasConnectedWallet } = useWalletInfo();
  // const ownedCourses = useOwnedCourses(courses);
  // const [selectedCourse, setSelectedCourse] =
  //   useState<TransformedCourse | null>(null);
  // const [isNewPurchase, setIsNewPurchase] = useState(true);
  // const isBusy = false;

  // const handleCloseModal = useCallback(() => {
  //   setSelectedCourse(null);
  //   setIsNewPurchase(true);
  // }, []);

  // const _purchaseCourse = useCallback(
  //   async ({ hexCourseId, proof, value }: any, course: any) => {
  //     try {
  //       const result = await contract.methods
  //         .purchaseCourse(hexCourseId, proof)
  //         .send({ from: account, value });

  //       // ownedCourses.mutate([
  //       //   ...ownedCourses.data,
  //       //   {
  //       //     ...course,
  //       //     proof,
  //       //     state: 'purchased',
  //       //     owner: account.data,
  //       //     price: value,
  //       //   },
  //       // ]);
  //       return result;
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     } finally {
  //       // setBusyCourseId(null);
  //     }
  //   },
  //   [account, contract?.methods]
  // );

  // const _repurchaseCourse = useCallback(
  //   async ({ courseHash, value }: any, course: any) => {
  //     try {
  //       const result = await contract.methods
  //         .repurchaseCourse(courseHash)
  //         .send({ from: account, value });

  //       // const index = ownedCourses.data.findIndex((c) => c.id === course.id);

  //       // if (index >= 0) {
  //       //   ownedCourses.data[index].state = 'purchased';
  //       //   ownedCourses.mutate(ownedCourses.data);
  //       // } else {
  //       //   ownedCourses.mutate();
  //       // }
  //       return result;
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     } finally {
  //       // setBusyCourseId(null);
  //     }
  //   },
  //   [account, contract?.methods]
  // );

  // const handlePurchase = async (
  //   order: Order,
  //   course: Omit<TransformedCourse, 'category' | 'author'>
  // ) => {
  //   const hexCourseId = web3?.utils.utf8ToHex(course!.id);
  //   const orderHash = web3?.utils.soliditySha3(
  //     { type: 'bytes16', value: hexCourseId! },
  //     { type: 'address', value: account! }
  //   );
  //   const value = web3?.utils.toWei(String(order.price), 'ether');

  //   if (isNewPurchase) {
  //     const emailHash = web3?.utils.sha3(order.email);
  //     const proof = web3?.utils.soliditySha3(
  //       { type: 'bytes32', value: emailHash! },
  //       { type: 'bytes32', value: orderHash! }
  //     );

  //     _purchaseCourse({ hexCourseId, proof, value }, course);
  //   } else {
  //     _repurchaseCourse({ courseHash: orderHash, value }, course);
  //   }
  // };

  return (
    <Fragment>
      <MarketHeader />
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        {/* <SearchInput /> */}
      </div>
      <Categories items={categories} />
      <CourseSection title="All Courses" courses={courses.slice(0)} cols={4} />
      {/* {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          isNewPurchase={isNewPurchase}
          onSubmit={(order, course) => {
            handlePurchase(order, course);
            handleCloseModal();
          }}
          onClose={handleCloseModal}
        />
      )} */}
    </Fragment>
  );
};

export default MarketPage;
