import { check } from 'express-validator';

export const registerSchema = [
  check('username', 'username is required')
    .exists()
    .isAlphanumeric()
    .withMessage('username should be alphanumeric characters')
    .trim()
    .isLength({ min: 6, max: 32 }),

  check('password', 'Password is required')
    .exists()
    .isLength({ min: 6 })
    .trim(),
];
