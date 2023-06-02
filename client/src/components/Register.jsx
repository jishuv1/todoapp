import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import { register } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      return navigate('/tasks');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError(null);

    const result = await register(form);

    if (result.status === 200) {
      if (result.data.status === 201) {
        setError(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        navigate('/tasks');
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast('Something went wrong, Please try again !');
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
              <h4 className='card-title'>Create new account</h4>

              <div className='form-group'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Username
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
              </div>
              <div className='form-group'>
                <form>
                  <label
                    htmlFor='exampleInputPassword1'
                    className='form-label mt-2'
                  >
                    Password
                  </label>
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
                </form>
              </div>
              <div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleSubmit}
                    type='button'
                    className='col-sm-6 btn btn-primary mt-1 center'
                    style={{ textAlign: 'center' }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
