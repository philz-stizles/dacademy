import { useState } from 'react';

type Props = {
  endpoint: string;
  isAuth?: boolean;
};

const useRequest = ({ endpoint, isAuth = true }: Props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async ({
    body,
    method,
  }: {
    body: object;
    method?: string;
  }) => {
    try {
      setIsLoading(true);
      let config: { [key: string]: any } = {
        method: method || 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch(`/api${endpoint}`, config);
      const data = await res.json();

      if (data) {
        setData(data);
      }

      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      setError(error.message);
    }
  };

  return { sendRequest, isLoading, data, error };
};

export default useRequest;
