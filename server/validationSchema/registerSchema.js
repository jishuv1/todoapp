import { check } from 'express-validator';

export const registerSchema = [
  check('username', 'username is required')
    .exists()
    .isEmail()
    .withMessage('Invalid email format')
    .trim(),

  check('password', 'Password is required')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage(
      'Password must contain at least one capital letter and one small letter'
    )
    .trim(),
];
