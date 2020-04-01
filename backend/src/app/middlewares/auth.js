import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth.configuration';

export default async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({ error: 'Please log in.' });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return response.status(400).json({ error: 'Invalid token.' });
    }

    const { secret } = authConfig;
    const decodedToken = await promisify(jwt.verify)(token, secret);

    request.userId = decodedToken.id;

    return next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({ error: 'Authentication failed.' });
  }
};
