export type ApiResponseData<T> = {
  status: boolean;
  message: string;
  data?: T | null;
};


export type CheckoutSession = string | null