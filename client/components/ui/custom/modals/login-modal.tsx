import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AlertCircle, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/custom';
import { useAuth } from '@/context/auth-context';

type Props = {
  closeModal: () => void;
};

const LoginModal = ({ closeModal }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await axios.post('', { email, password });
      localStorage.setItem('user', JSON.stringify(data.data.login));
      authLogin(data.data.login);
      toast.success('Login was successful');
      router.push('/');
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-screen">
      <div className="max-w-md mx-auto py-12">
        <h3 className="font-bold mb-3">Login to your Udemy account</h3>
        {error && (
          <div className="p-3 mb-3 bg-rose-200 flex items-start gap-3 font-bold text-sm">
            <AlertCircle size={32} />
            {error.message}
          </div>
        )}
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          {/* <Button
            alignStart
            outlined
            label="Continue with Google"
            icon={Google}
          /> */}
          <Button
            alignStart
            outlined
            label="Continue with Facebook"
            icon={Facebook}
          />
          {/* <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <Button type="submit" label="Login" disabled={isLoading} />
        </form>
        <p className="text-xs text-center py-5 border-b border-neutral-300">
          <Link
            href="/terms-of-use"
            className="text-purple-700 font-bold underline"
          >
            Forgot Password
          </Link>
          .
        </p>
        <div className="py-5 text-center">
          <p className="text-sm">
            Dont have an account?
            <Link href="/login" className="decoration-slate-400 underline ms-1">
              Signup
            </Link>
            .
          </p>
          <p className="text-sm text-purple-700 font-bold underline">
            Login with your organization
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
