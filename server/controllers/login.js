import { validationResult } from 'express-validator';
import User from '../model/User.js';
import { jsonGenerate } from '../utils/helper.js';
import { statusCode } from '../utils/constants.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Login the user
const login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json(
        jsonGenerate(
          statusCode.UNPROCESSABLE_ENTITY,
          'username or password is invalid'
        )
      );
    }

    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) {
      return res.json(
        jsonGenerate(
          statusCode.UNPROCESSABLE_ENTITY,
          'username or password is incorrect'
        )
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_SECRET);

    return res.json(
      jsonGenerate(statusCode.SUCCESS, 'Login successful', {
        userId: user._id,
        token: token,
      })
    );
  }

  res.json(
    jsonGenerate(
      statusCode.VALIDATION_ERROR,
      'Validation error',
      errors.mapped()
    )
  );
};

export default login;
