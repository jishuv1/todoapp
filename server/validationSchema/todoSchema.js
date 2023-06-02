import { check } from 'express-validator';

export const todoSchema = [
  check('title', 'Title is required & should be less than 50 characters')
    .exists()
    .isLength({ max: 50 }),

  check(
    'description',
    'Description is required & should be less than 256 characters'
  )
    .exists()
    .isLength({ max: 256 }),
];

export const markTodoSchema = [
  check('todo_id', 'Todo Id is required').exists(),
];
