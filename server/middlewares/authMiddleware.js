import { statusCode } from '../utils/constants.js';
import { jsonGenerate } from '../utils/helper.js';
import jwt from 'jsonwebtoken';

// Authentication of the user
const authMiddleware = (req, res, next) => {
  if (req.headers['auth'] === undefined) {
    return res.json(jsonGenerate(statusCode.AUTH_ERROR, 'Access Denied'));
  }

  const token = req.headers['auth'];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(decoded);

    req.userId = decoded.userId;

    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'Invalid token')
    );
  }
};

export default authMiddleware;
