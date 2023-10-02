import { GetServerSideProps, Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { SignupForm } from '@/components/auth/signup-form';
import Logo from '@/components/ui/custom/logo/logo';
import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { authOptions } from './api/auth/[[...nextauth]]';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

type AuthMode = 'signup' | 'login';

const AuthPage = () => {
  const { query } = useRouter();
  const { email, mode } = query as { email?: string; mode?: AuthMode };
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  useEffect(() => {
    if (mode) {
      setAuthMode(mode);
    }
  }, [mode]);

  return (
    <main className="flex-1">
      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
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
            {authMode === 'signup' ? (
              <SignupForm />
            ) : (
              <LoginForm data={{ email }} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

type Props = {
  providers: any;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  // If the user is already logged in, redirect. Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/', permanent: false } };
  }
  const providers = await getProviders();

  console.log(providers)

  return {
    props: { providers: providers ?? [] },
  };
};

export default AuthPage;
