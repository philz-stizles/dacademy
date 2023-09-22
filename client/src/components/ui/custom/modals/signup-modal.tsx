import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui/custom';
import Link from 'next/link';

type Props = {
  closeModal: () => void;
};

const SignupModal = ({ closeModal }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      toast.success('Signup was successful');
      closeModal();
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  // if (error) return <div>{`Submission error! ${error.message}`}</div>;

  return (
    <div className="max-w-screen">
      <div className="max-w-md mx-auto py-12">
        <h3 className="font-bold mb-3">Signup and start learning</h3>
        {error && (
          <div className="p-3 mb-3 bg-rose-200 flex items-center gap-3 font-bold text-sm">
            <AlertCircle />
            {error.message}
          </div>
        )}
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <Input
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" label="Sign up" disabled={isLoading} />
        </form>
        <p className="text-xs text-center py-5 border-b border-neutral-300">
          By signing up, you agree to our{' '}
          <Link href="/terms-of-use" className="decoration-slate-400 underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy-policy"
            className="decoration-slate-400 underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-sm py-5 text-center">
          Already have an account?
          <Link href="/login" className="decoration-slate-400 underline ms-1">
            Log in
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
