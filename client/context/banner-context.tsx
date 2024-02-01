'use client'

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type BannerContextType = {
  isOpen: boolean;
  close: () => void;
};

const BannerContext = createContext<BannerContextType>({
  isOpen: true,
  close: () => {},
});

export const BannerProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <BannerContext.Provider
      value={{
        isOpen,
        close: closeHandler,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => useContext(BannerContext);
