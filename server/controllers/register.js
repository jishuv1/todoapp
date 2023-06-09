import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helper.js';
import { statusCode } from '../utils/constants.js';
import bcrypt from 'bcrypt';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';

// Registering new users
const register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const userExists = await User.findOne({ username: username });

      if (userExists) {
        return res.json(
          jsonGenerate(
            statusCode.UNPROCESSABLE_ENTITY,
            'Username already exists'
          )
        );
      }

      const result = await User.create({
        username: username,
        password: hashPassword,
      });

      const token = jwt.sign(
        { userId: result._id },
        process.env.JWT_TOKEN_SECRET
      );

      return res.json(
        jsonGenerate(statusCode.SUCCESS, 'Registration successful', {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(
        jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'Registration failed')
      );
    }
  }

  return res.json(
    jsonGenerate(
      statusCode.VALIDATION_ERROR,
      'Validation error',
      errors.mapped()
    )
  );
};

export default register;
