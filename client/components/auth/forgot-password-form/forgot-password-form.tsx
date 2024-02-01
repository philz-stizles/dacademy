'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/components/ui/custom';
import { MessageType } from '@/components/ui/custom/message/message';
import { CardWrapper } from '../auth-wrapper/auth-wrapper';
import { Label } from '@/components/ui/label';

export const ResetForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    startTransition(() => {
      try {
        // reset(values).then((data) => {
        //   setError(data?.error);
        //   setSuccess(data?.success);
        // });
      } catch (error) {}
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isPending}
          />
        </div>
        <Message type={MessageType.error} message={error} />
        <Message type={MessageType.success} message={success} />

        <Button disabled={isPending} type="submit" className="w-full">
          Send reset email
        </Button>
      </form>
    </CardWrapper>
  );
};
