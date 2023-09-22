import useSWR from 'swr';

const URL = process.env.NEXT_PUBLIC_ETH_PRICE_BASE_URL;
export const COURSE_PRICE = 15;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  return json.market_data.current_price.usd ?? null;
};

export const useEthPrice = () => {
  const { data, mutate, ...rest } = useSWR(URL, fetcher, {
    refreshInterval: 10000,
  });

  const pricePerItem =
    (data && (COURSE_PRICE / Number(data)).toFixed(6)) ?? null;

  return {
    ethPrice: data,
    pricePerItem,
    ...rest,
  };
};
