import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helper.js';
import { statusCode } from '../utils/constants.js';
import Todo from '../model/Todo.js';

// Removing the todos
export const removeTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        statusCode.VALIDATION_ERROR,
        'Todo Id is required',
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo_id,
    });

    if (result) {
      const user = await Todo.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          $pull: { todos: req.body.todo_id },
        }
      );

      return res.json(
        jsonGenerate(statusCode.SUCCESS, 'Todo Deleted successfully')
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'could not delete')
    );
  }
};
