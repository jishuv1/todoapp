import moment from 'moment/moment.js';
import { markTodo, removeTodo } from '../services/api.js';
import { toast } from 'react-toastify';

const Todo = ({ todo, setRefreshList, onEdit }) => {
  const handleChangeStatus = async (todoId) => {
    const result = await markTodo({ todo_id: todoId });
    if (result.status === 200 && result.data.status === 200) {
      toast('Todo Status updated');
      setRefreshList(new Date());
    } else {
      toast(result.data.message);
    }
  };

  const handleEditTodo = async (todoId) => {
    onEdit(todo);
  };

  const handleRemoveTodo = async (todoId) => {
    const result = await removeTodo({ todo_id: todoId });
    if (result.status === 200 && result.data.status === 200) {
      toast('Todo Removed');
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
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChangeStatus(todo._id);
              }}
              type='button'
              className='badge bg-success'
            >
              Completed
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTodo(todo._id);
              }}
              type='button'
              className='badge bg-primary'
            >
              Remove
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleChangeStatus(todo._id);
            }}
            type='button'
            className='badge bg-danger'
          >
            Active
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditTodo(todo._id);
          }}
          type='button'
          className='badge bg-info'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          Edit
        </button>
      </div>
      <div className='card-body'>
        <h5
          className='card-title'
          style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
        >
          {todo.title}
        </h5>
        <p className='card-text'>{todo.description}</p>
      </div>
    </div>
  );
};

export default Todo;
