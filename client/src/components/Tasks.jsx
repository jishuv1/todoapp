import { useNavigate } from 'react-router-dom';
import AddTodoMadal from './AddTodoMadal.jsx';
import Header from './Header.jsx';
import Todo from './Todo.jsx';
import { useEffect, useState } from 'react';
import { getTodoListApi, getToken } from '../services/api.js';
import { ToastContainer } from 'react-toastify';

const Tasks = () => {
  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  const fetchTodoList = async () => {
    const result = await getTodoListApi();

    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos);
    }
  };

  useEffect(() => {
    if (!getToken) {
      navigation('/login');
    }

    fetchTodoList();
  }, [refreshList]);

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className='container'>
        <div className='row justify-content-md-center mt-4'>
          {list.map((todo) => (
            <Todo todo={todo} key={todo._id} />
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
        >
          Add Todo
        </button>
      </div>

      <AddTodoMadal setRefreshList={setRefreshList} />
    </div>
  );
};
export default Tasks;
