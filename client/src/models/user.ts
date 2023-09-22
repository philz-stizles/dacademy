export interface TransformedUser {
  id: number;
  firstname?: string;
  lastname?: string;
  name: string;
  email: string;
  image_src?: string;
}

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  image_src: string;
};
