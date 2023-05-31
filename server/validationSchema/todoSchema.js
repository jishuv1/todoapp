import { check } from 'express-validator';

export const todoSchema = [
  check('title', 'Title is required').exists(),

  check('description', 'Description is required').exists(),
];

export const markTodoSchema = [
  check('todo_id', 'Todo Id is required').exists(),
];
