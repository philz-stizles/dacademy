import { PropsWithChildren } from 'react';
import clx from 'classnames';

type Props = {
  className?: string;
  fluid?: boolean;
};

const Container = ({ children, className, fluid }: PropsWithChildren<Props>) => {
  return (
    <div
      className={clx(
        'mx-auto md:px-6 md:py-2',
        fluid ? 'w-11/12' : 'w-10/12',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
