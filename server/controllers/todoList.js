import User from '../model/User.js';
import { statusCode } from '../utils/constants.js';
import { jsonGenerate } from '../utils/helper.js';

// Getting the todos of a user
export const getTodos = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select('-password')
      .populate('todos')
      .exec();

    return res.json(jsonGenerate(statusCode.SUCCESS, 'All todos List', list));
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, 'Error', error)
    );
  }
};
