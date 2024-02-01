'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Icons } from '../../ui/icons';
import { Input } from '../../ui/input';
import axios from 'axios';
import Link from 'next/link';
import { registerSchema } from '@/schemas';
import { Message } from '../../ui/custom';
import { MessageType } from '../../ui/custom/message/message';
import { ApiResponseData } from '@/types/api';
import SocialSignin from '../social-signin/social-signin';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<{
    loading: boolean;
    signup: string | null;
  }>({
    loading: false,
    signup: null,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      setIsLoading({ loading: true, signup: 'credentials' });

      const validatedFields = registerSchema.safeParse({ email, password });
      if (!validatedFields.success) {
        throw new Error('Invalid fields!');
      }

      const response = await axios.post<ApiResponseData<any>>(
        'api/auth/signup',
        { email, password }
      );
      setIsLoading({ loading: false, signup: null });
      if (response && response.data && response.data.message) {
        setSuccess(response.data.message);
      }
    } catch (error: any) {
      console.error('SIGNUP', error.response);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setIsLoading({ loading: false, signup: null });
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
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
              disabled={isLoading.loading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading.loading}
            />
          </div>
          <Message type={MessageType.error} message={error} />
          <Message type={MessageType.success} message={success} />
          <Button disabled={isLoading.loading}>
            {isLoading && isLoading.signup === 'credentials' && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SocialSignin />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
