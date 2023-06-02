import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helper.js';
import { statusCode } from '../utils/constants.js';
import Todo from '../model/Todo.js';

export const removeAllCompletedTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        statusCode.VALIDATION_ERROR,
        'Error while Validation',
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.deleteMany({
      userId: req.userId,
      isCompleted: true,
    });

    if (result) {
      const user = await Todo.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          $pull: { todos: { _id: req.body.todo_id } },
        }
      );

      return res.json(
        jsonGenerate(statusCode.SUCCESS, 'Completed Todo Deleted successfully')
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'could not delete')
    );
  }
};
