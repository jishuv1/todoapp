import moment from 'moment/moment.js';
import { markTodo } from '../services/api.js';
import { toast } from 'react-toastify';

const Todo = ({ todo, setRefreshList }) => {
  const handleChangeStatus = async (todoId) => {
    const result = await markTodo({ todo_id: todoId });
    if (result.status === 200 && result.data.status === 200) {
      toast('Todo Status updated');
      setRefreshList(new Date());
    } else {
      toast(result.data.message);
    }
  };

  return (
    <div className='card text-white bg-dark m-2' style={{ maxWidth: '20rem' }}>
      <div className='card-header' style={{ textAlign: 'center' }}>
        <span className='badge bg-secondary'>
          {moment(todo.date).fromNow()}
        </span>
        {todo.isCompleted ? (
          <button
            onClick={() => handleChangeStatus(todo._id)}
            type='button'
            className='badge bg-success'
          >
            Completed
          </button>
        ) : (
          <button
            onClick={() => handleChangeStatus(todo._id)}
            type='button'
            className='badge bg-danger'
          >
            Active
          </button>
        )}
      </div>
      <div className='card-body'>
        <h4 className='card-title'>{todo.title}</h4>
        <p className='card-text'>{todo.description}</p>
      </div>
    </div>
  );
};
export default Todo;
