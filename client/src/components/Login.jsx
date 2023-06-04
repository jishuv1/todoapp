import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import { login } from '../services/api.js';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      return navigate('/tasks');
    } else {
      return navigate('/login');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError(null);

    const result = await login(form);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        navigate('/');
        return;
      }
      if (result.data.status === 201) {
        setError(result.data.data);
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <ToastContainer />
        <div className='row justify-content-center mt-4'>
          <div
            className='card text-white bg-secondary  '
            style={{ maxWidth: '30rem' }}
          >
            <div className='card-body'>
              <h4 className='card-title'>Login Now</h4>

              <div className='form-group'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Email or Username
                </label>
                <input
                  type='text'
                  onChange={handleChange}
                  name='username'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter Username'
                />
                {error?.username && (
                  <small id='emailHelp' className='form-text text-danger'>
                    {error.username.msg}
                  </small>
                )}
                <small>demo: demo@test.com</small>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='exampleInputPassword1'
                  className='form-label mt-2'
                >
                  Password
                </label>
                <form>
                  <input
                    type='password'
                    onChange={handleChange}
                    name='password'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Password'
                  />
                  {error?.password && (
                    <small id='emailHelp' className='form-text text-danger'>
                      {error.password.msg}
                    </small>
                  )}
                  <small>password: Demo12</small>
                </form>
              </div>
              <div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleSubmit}
                    type='button'
                    className='btn btn-primary mt-1'
                    style={{ marginRight: '2rem' }}
                  >
                    Login
                  </button>
                  <Link to='/register'>
                    <button type='button' className='btn btn-secondary mt-1'>
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
