import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Icons } from '../../ui/icons';
import { Input } from '../../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import SocialSignin from '../social-signin/social-signin';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data?: {
    email?: string;
  };
}

export function LoginForm({ className, data, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState(data && data.email ? data.email : '');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? DEFAULT_LOGIN_REDIRECT;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signIn('credentials', {
        email,
        password,
        redirectTo: callbackUrl,
      });

      console.log(response);

      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid credentials!' };
          default:
            return { error: 'Something went wrong' };
        }
      }

      throw error;
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground">{error}</p>
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
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
    </div>
  );
}
