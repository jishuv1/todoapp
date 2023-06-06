import { check } from 'express-validator';

// validation schema for
export const loginSchema = [
  check('username', 'username is required')
    .exists()
    .isEmail()
    .withMessage('username should be an Email address')
    .trim(),

  check('password', 'Password is required')
    .exists()
    .isLength({ min: 6 })
    .trim(),
];
