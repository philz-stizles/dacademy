import { Container } from '@/components/shared';

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const Wrapper = ({ title, description, children }: Props) => {
  return (
    <Container>
      <div className="flex flex-col items-center py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-6">{title}</h1>
        <p className="text-muted-foreground mb-14">{description}</p>
        <div className="w-full max-w-[40rem]">{children}</div>
      </div>
    </Container>
  );
};

export default Wrapper;
