import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helper.js';
import { statusCode } from '../utils/constants.js';
import Todo from '../model/Todo.js';

// Updating the existing Todo
export const updateTodo = async (req, res) => {
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
    const result = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.userId,
      },
      [
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
          },
        },
      ]
    );

    if (result) {
      return res.json(jsonGenerate(statusCode.SUCCESS, 'successful', result));
    } else {
      return res.json(
        jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'Todo did not Updated')
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'could not update todo')
    );
  }
};
