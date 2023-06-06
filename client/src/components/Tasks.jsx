import { useNavigate } from 'react-router-dom';
import TodoModal from './TodoModal.jsx';
import Header from './Header.jsx';
import Todo from './Todo.jsx';
import { useEffect, useState } from 'react';
import { getTodoListApi, getToken } from '../services/api.js';
import { ToastContainer } from 'react-toastify';

// Tasks Page
const Tasks = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshList, setRefreshList] = useState();
  const [editTodo, setEditTodo] = useState(null);
  const [todoFilter, setTodoFilter] = useState('all');

  // Fetching the Todos from the database
  const fetchTodoList = async () => {
    const result = await getTodoListApi();

    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!getToken) {
      navigate('/login');
    }

    if (!user) {
      navigate('/login');
    }

    fetchTodoList();
  }, [refreshList]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  return (
    <div>
      <ToastContainer />
      <Header
        setSearch={setSearch}
        setTodoFilter={setTodoFilter}
        setRefreshList={setRefreshList}
      />
      <div className='container'>
        <div className='row justify-content-md-center mt-4'>
          {list
            .filter((todo) => {
              return search.toLowerCase() === ''
                ? todo
                : todo.title.toLowerCase().includes(search) ||
                    todo.description.toLowerCase().includes(search);
            })
            .filter((todo) => {
              if (todoFilter === 'all') {
                return todo;
              } else if (todoFilter === 'active') {
                return todo.isCompleted === false;
              } else {
                return todo.isCompleted === true;
              }
            })
            .map((todo) => (
              <Todo
                todo={todo}
                key={todo._id}
                setRefreshList={setRefreshList}
                onEdit={handleEdit}
              />
            ))}
        </div>
      </div>
      <div
        className=''
        style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type='button'
          className='btn btn-success'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          onClick={() => setEditTodo(null)} // Clear the edit state
        >
          Add Todo
        </button>
      </div>

      <TodoModal
        setRefreshList={setRefreshList}
        onEdit={handleEdit}
        todo={editTodo}
      />
    </div>
  );
};

export default Tasks;
