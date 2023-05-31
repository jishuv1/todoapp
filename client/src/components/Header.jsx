import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigation('/login');
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          To-Do List
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarColor02'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link className='nav-link active' to='/'>
                Home
                <span className='visually-hidden'>(current)</span>
              </Link>
            </li>
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
            {user && (
              <li className='nav-item'>
                <Link className='nav-link active' onClick={handleLogout}>
                  LogOut
                </Link>
              </li>
            )}
          </ul>
          <form className='d-flex'>
            <input
              className='form-control me-sm-2'
              type='search'
              placeholder='Search'
            />
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
export default Header;
