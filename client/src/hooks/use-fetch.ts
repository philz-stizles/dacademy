import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
  endpoint: string;
  init: any;
};

const useFetch = <T>({ endpoint, init }: Props) => {
  const [data, setData] = useState<T>(init);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        let config: { [key: string]: any } = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get(`/api${endpoint}`);
        console.log(response.data);
        if (
          response &&
          response.data &&
          response.data.status &&
          response.data.data
        ) {
          setData(response.data.data);
        }
        
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.log(error);
        setError(error.message);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useFetch;
