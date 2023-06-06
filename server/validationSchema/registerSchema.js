import { check } from 'express-validator';

// Registering new user validators
export const registerSchema = [
  // validating username
  check('username', 'username is required')
    .exists()
    .isEmail()
    .withMessage('Invalid email format')
    .trim(),

  // validating password
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
