import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import {
  PasswordResetTokenService,
  TwoFactorTokenService,
  UserService,
  VerificationTokenService,
} from '.';
import { PasswordResetToken, VerificationToken } from '@prisma/client';
import ApiError from '@/error/api-error';

export const generate2FAToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await TwoFactorTokenService.findByEmail(email);
  if (existingToken) {
    await TwoFactorTokenService.remove(existingToken.id);
  }

  return await TwoFactorTokenService.create({
    email,
    token,
    expires,
  });
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await PasswordResetTokenService.findByEmail(email);

  if (existingToken) {
    await PasswordResetTokenService.remove(existingToken.id);
  }

  const passwordResetToken = await PasswordResetTokenService.create({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} email
 * @returns {Promise<VerificationToken>}
 */
export const generateVerification = async (
  email: string
): Promise<VerificationToken> => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await VerificationTokenService.findByEmail(email);

  if (existingToken) {
    await VerificationTokenService.remove(existingToken.id);
  }

  return await VerificationTokenService.create({
    email,
    token,
    expires,
  });
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @returns {Promise<boolean>}
 */
export const validateVerification = async (token: string): Promise<boolean> => {
  const existingToken = await VerificationTokenService.findByToken(token);
  if (!existingToken) {
    throw new ApiError('Token does not exist!', 400);
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    throw new ApiError('Token has expired!', 400);
  }

  const existingUser = await UserService.findByEmail(existingToken.email);
  if (!existingUser) {
    throw new ApiError('Email does not exist!', 400);
  }

  return true;
};

/**
 * Generate password reset token
 * @param {string} email
 * @returns {Promise<PasswordResetToken>}
 */
export const generatePasswordReset = async (
  email: string
): Promise<PasswordResetToken> => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await PasswordResetTokenService.findByEmail(email);

  if (existingToken) {
    await PasswordResetTokenService.remove(existingToken.id);
  }

  return await PasswordResetTokenService.create({
    email,
    token,
    expires,
  });
};
