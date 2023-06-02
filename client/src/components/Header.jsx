import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeAllCompletedTodo } from '../services/api.js';

const Header = ({ setSearch, setTodoFilter, setRefreshList }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleRemoveAllCompleted = async () => {
    const result = await removeAllCompletedTodo();
    console.log(result);
    if (result.status === 200 && result.data.status === 200) {
      toast('Completed Todos Removed');
      setRefreshList(new Date());
    } else {
      toast(result.data.message);
    }
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand'>To-Do List</Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigate'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarColor02'>
          <ul className='navbar-nav me-auto'>
            {user && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link active' to='/tasks'>
                    Tasks
                    <span className='visually-hidden'>(current)</span>
                  </Link>
                </li>

                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle show'
                    data-bs-toggle='dropdown'
                    role='button'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Filter
                  </Link>
                  <div
                    className='dropdown-menu show'
                    style={{
                      position: 'absolute',
                      inset: '0px auto auto 0px',
                      margin: 0,
                      transform: 'translate(0px, 42px)',
                    }}
                    data-popper-placement='bottom-start'
                    onClick={(e) => setTodoFilter(e.target.name)}
                  >
                    <Link className='dropdown-item' name='all'>
                      All
                    </Link>
                    <Link className='dropdown-item' name='active'>
                      Active
                    </Link>
                    <Link className='dropdown-item' name='completed'>
                      Completed
                    </Link>
                  </div>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    onClick={handleRemoveAllCompleted}
                  >
                    Remove All (Completed)
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    onClick={handleLogout}
                    to='/login'
                  >
                    LogOut
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link active' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link active' to='/register'>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <form className='d-flex'>
              <input
                className='form-control me-sm-2'
                type='search'
                placeholder='Search'
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
