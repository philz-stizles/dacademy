import Logo from '@/components/ui/custom/logo/logo';
import Container from '../container/container';

const Footer = () => {
  return (
    <footer>
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
