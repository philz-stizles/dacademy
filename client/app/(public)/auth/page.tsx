'use client';

import { Button } from '@/components/ui/button';
import { SignupForm } from '@/components/auth/signup-form/signup-form';
import Logo from '@/components/ui/custom/logo/logo';
import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/auth/login-form/login-form';

type AuthMode = 'signup' | 'login';

const SignupPage = ({
  params,
}: {
  params: { email?: string; mode?: AuthMode };
}) => {
  const { email, mode } = params;
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  useEffect(() => {
    if (mode) {
      setAuthMode(mode);
    }
  }, [mode]);

  return (
    <main className="flex-1">
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant="ghost"
          onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          {authMode === 'login' ? 'Create an account' : 'Login'}
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {authMode === 'login' ? (
              <LoginForm data={{ email }} />
            ) : (
              <SignupForm />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
