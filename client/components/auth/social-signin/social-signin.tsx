import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const SocialSignin = () => {
  const [isLoading, setIsLoading] = useState<{
    loading: boolean;
    provider: string | null;
  }>({
    loading: false,
    provider: null,
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? DEFAULT_LOGIN_REDIRECT;

  const handleSignin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading({ loading: true, provider });

      await signIn(provider, {
        callbackUrl,
      });
    } catch (error: any) {
      console.error('SIGNIN', error.response);
    } finally {
      setIsLoading({ loading: false, provider: null });
    }
  };

  return (
    <Fragment>
      <Button
        onClick={handleSignin.bind(null, 'github')}
        variant="outline"
        type="button"
        disabled={isLoading.loading}
      >
        {isLoading && isLoading.provider === 'github' ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
      <Button
        onClick={handleSignin.bind(null, 'google')}
        variant="outline"
        type="button"
        disabled={isLoading.loading}
      >
        {isLoading && isLoading.provider === 'google' ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
    </Fragment>
  );
};

export default SocialSignin;
