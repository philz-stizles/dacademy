import jwt from 'jsonwebtoken';

import moment from 'moment';

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async () => {};

const tokenService = {
  verifyToken,
};

export default tokenService;
