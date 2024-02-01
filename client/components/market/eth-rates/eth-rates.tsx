import { Loader } from '@/components/ui/custom';
import { useEthPrice } from '@/hooks/use-eth-price';
import Image from 'next/image';

const EthRates = () => {
  const { ethPrice } = useEthPrice();

  return (
    <div className="flex xs:flex justify-end items-center gap-2">
      <p className="text-sm text-slate-600">Current eth Price</p>
      <div className="flex items-center justify-center">
        {ethPrice ? (
          <>
            <Image
              layout="fixed"
              height="35"
              width="35"
              src="/images/small-eth.webp"
              alt="eth"
            />
            <span className="text-xl font-bold text-slate-800">
              = {ethPrice}$
            </span>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <Loader size="md" />
          </div>
        )}
      </div>
    </div>
    // <div className="flex xs:flex-col justify-end gap-2 text-center py-2">
    //   <div className="p-4 border drop-shadow rounded-md">
    //     <div className="flex items-center justify-center">
    //       {ethPrice ? (
    //         <>
    //           <Image
    //             layout="fixed"
    //             height="35"
    //             width="35"
    //             src="/images/small-eth.webp"
    //             alt="eth"
    //           />
    //           <span className="text-xl font-bold">= {ethPrice}$</span>
    //         </>
    //       ) : (
    //         <div className="w-full flex justify-center">
    //           <Loader size="md" />
    //         </div>
    //       )}
    //     </div>
    //     <p className="text-sm text-white">Current eth Price</p>
    //   </div>
    // </div>
  );
};

export default EthRates;
