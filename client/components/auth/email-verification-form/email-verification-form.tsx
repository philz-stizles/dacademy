'use client';

import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from '@/components/auth/auth-wrapper/auth-wrapper';
import { Message } from '../../ui/custom';
import { MessageType } from '../../ui/custom/message/message';
import { ApiResponseData } from '@/types/api';
import axios from 'axios';

export const EmailVerificationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const handleSubmit = useCallback(async () => {
    try {
      if (success || error) return;

      if (!token) {
        setError('Missing token!');
        return;
      }

      const response = await axios.post<ApiResponseData<any>>(
        'api/auth/email-verification',
        { token }
      );
      setIsLoading(false);

      // newVerification(token)
      //   .then((data) => {
      //     setSuccess(data.success);
      //     setError(data.error);
      //   })
      //   .catch(() => {
      //     setError('Something went wrong!');
      //   });
    } catch (error) {}
  }, [token, success, error]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <Message type={MessageType.success} message={success} />
        {!success && <Message type={MessageType.error} message={error} />}
      </div>
    </CardWrapper>
  );
};
