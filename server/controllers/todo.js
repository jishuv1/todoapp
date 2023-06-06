import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helper.js';
import { statusCode } from '../utils/constants.js';
import Todo from '../model/Todo.js';
import User from '../model/User.js';

// Create a new todo
export const createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        statusCode.VALIDATION_ERROR,
        'Todo Title & Description should be less than 50 & 256 charaters respectively',
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.create({
      userId: req.userId,
      description: req.body.description,
      title: req.body.title,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        }
      );
      return res.json(
        jsonGenerate(statusCode.SUCCESS, 'Todo Created Successfully', result)
      );
    } else {
      // Handle the case when Todo creation fails
      return res.json(
        jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'Todo creation failed')
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        statusCode.UNPROCESSABLE_ENTITY,
        'Something went wrong',
        error
      )
    );
  }
};
