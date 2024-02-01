import { User } from '@prisma/client';
import { HashService, UserService } from '.';
import ApiError from '@/error/api-error';

type SignupInput = {
  email: string;
  password: string;
  name?: string;
};

export const signup = async ({ email, password, name }: SignupInput) => {
  const existingUser = await UserService.findByEmail(email);
  if (existingUser) {
    throw new ApiError('User already exists', 400);
  }

  return await UserService.create({
    email,
    hashedPassword: await HashService.hash(password),
    name,
  });
};

export const signin = async (email: string, password: string) => {
  const existingUser = await UserService.findByEmail(email);
  if (!existingUser || !existingUser.hashedPassword) {
    throw new ApiError('Invalid credentials', 401);
  }

  const isValid = await HashService.compare(
    password,
    existingUser.hashedPassword
  );

  if (!isValid) {
    throw new ApiError('Invalid credentials', 401);
  }

  return existingUser;
};
