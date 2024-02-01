import Logo from '@/components/ui/custom/logo/logo';
import Container from '../container/container';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  return (
    <footer className={cn(className)}>
      <Container>
        <div className="p-8"></div>

        <div className="p-10 flex justify-between items-center">
          <Logo />
          <p className="text-xs">
            &copy;{`${new Date().getFullYear()} Devdezyn, Inc.`}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
