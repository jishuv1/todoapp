import { check } from 'express-validator';

// validation for login user
export const loginSchema = [
  // validation for username
  check('username', 'username is required')
    .exists()
    .isEmail()
    .withMessage('username should be an Email address')
    .trim(),

  // validation for password
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
