import { PropsWithChildren } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: PropsWithChildren<Props>) => {
  return (
    <section
      onClick={(e) => {
        // e.stopPropagation();
        onClose();
      }}
    >
      <div
        className={`${
          !isOpen && 'hidden'
        } fixed z-10 inset-0 overflow-y-auto cursor-pointer"`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {isOpen && (
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
          )}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Modal;
