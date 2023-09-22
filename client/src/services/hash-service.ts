import bcrypt from 'bcryptjs';

/**
 * hash password.
 * @param {string} password
 * @returns {Promise<string>}
 */
export const hash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 8);

/**
 * compare passwords.
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const compare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);

const hashService = { hash, compare };
export default hashService;
