import { Button, Modal } from '@/components/ui/custom';
import { useEthPrice } from '@/hooks/use-eth-price';
import { Order } from '@/models/order';
import { TransformedCourse } from '@/types/course';
import { useCallback, useEffect, useState } from 'react';

const defaultOrder = {
  price: '',
  email: '',
  confirmationEmail: '',
};

const _createFormState = (isDisabled = false, message = '') => ({
  isDisabled,
  message,
});

const createFormState = (
  { price, email, confirmationEmail }: Order,
  hasAgreedTOS: boolean,
  isNewPurchase: boolean
) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, 'Price is not valid.');
  }

  if (isNewPurchase) {
    if (confirmationEmail.length === 0 || email.length === 0) {
      return _createFormState(true);
    } else if (email !== confirmationEmail) {
      return _createFormState(true, 'Email are not matching.');
    }
  }

  if (!hasAgreedTOS) {
    return _createFormState(
      true,
      'You need to agree with terms of service in order to submit the form'
    );
  }

  return _createFormState();
};

type Props = {
  isOpen?: boolean;
  isNewPurchase: boolean;
  course: TransformedCourse;
  onSubmit: (order: any, course: TransformedCourse) => void;
  onClose: () => void;
};

const OrderModal = ({
  isOpen = false,
  course,
  onSubmit,
  onClose,
  isNewPurchase,
}: Props) => {
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);
  const [order, setOrder] = useState<Order>(defaultOrder);
  const { pricePerItem } = useEthPrice();

  useEffect(() => {
    if (isOpen) {
      setOrder((prevState) => ({
        ...prevState,
        price: pricePerItem,
      }));
    }
  }, [course, isOpen, pricePerItem]);

  const handleCloseModal = useCallback(() => {
    setOrder(defaultOrder);
    setEnablePrice(false);
    setHasAgreedTOS(false);
    onClose();
  }, [onClose]);

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setOrder((prevState) => ({
                            ...prevState,
                            price: isChecked
                              ? prevState.price
                              : prevState.price,
                          }));
                          setEnablePrice(isChecked);
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  disabled={true}
                  // disabled={!enablePrice}
                  value={course.price || 0}
                  onChange={(e) => {
                    const value = e.target.value;
                    // if (isNaN(value)) {
                    //   return;
                    // }
                    // setOrder((prevState) => ({
                    //   ...prevState,
                    //   price: value,
                    // }));
                  }}
                  type="number"
                  min={0}
                  step="0.000001"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              {isNewPurchase && (
                <>
                  <div className="mt-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Email</label>
                    </div>
                    <input
                      onChange={(e) => {
                        setOrder((prevState) => ({
                          ...prevState,
                          email: e.target.value.trim(),
                        }));
                      }}
                      type="email"
                      name="email"
                      id="email"
                      className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      placeholder="x@y.com"
                    />
                    <p className="text-xs text-gray-700 mt-1">
                      It&apos;s important to fill a correct email, otherwise the
                      order cannot be verified. We are not storing your email
                      anywhere
                    </p>
                  </div>
                  <div className="my-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Repeat Email</label>
                    </div>
                    <input
                      onChange={(e) => {
                        setOrder((prevState) => ({
                          ...prevState,
                          confirmationEmail: e.target.value.trim(),
                        }));
                      }}
                      type="email"
                      name="confirmationEmail"
                      id="confirmationEmail"
                      className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      placeholder="x@y.com"
                    />
                  </div>
                </>
              )}
              <div className="text-xs text-gray-700 flex mt-5">
                <label className="flex items-center mr-2">
                  <input
                    checked={hasAgreedTOS}
                    onChange={(e) => {
                      setHasAgreedTOS(e.target.checked);
                    }}
                    type="checkbox"
                    className="form-checkbox"
                  />
                </label>
                <span>
                  I accept DecentraAcademy&apos;s &apos;terms of service&apos;
                  and I agree that my order can be rejected in the case data
                  provided above are not correct
                </span>
              </div>
              {formState.message && (
                <div className="p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm">
                  {formState.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex gap-2">
          <Button
            disabled={formState.isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              onSubmit(order, course);
            }}
          >
            Submit
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
