import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTodoApi, updateTodo } from '../services/api.js';

const TodoModal = ({ setRefreshList, onEdit, todo }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (todo) {
      // Update the form fields when todo prop is provided
      setForm({
        title: todo.title,
        description: todo.description,
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTodoSubmit = async () => {
    if (form.title === '' && form.description === '') {
      toast('Title & Description is required');
      return;
    }
    if (form.title === '') {
      toast('Title is required');
      return;
    }

    if (form.description === '') {
      toast('Description is required');
      return;
    }

    try {
      let result;
      if (todo) {
        // Updating an existing todo
        result = await updateTodo({ ...form, todo_id: todo._id });
        if (result.status === 200 && result.data.status === 200) {
          toast('Todo Updated');
          setRefreshList(new Date());
          setForm({
            title: '',
            description: '',
          });
          onEdit(null); // Clear the edit state
        } else {
          toast(result.data.message);
        }
      } else {
        // Creating a new todo
        result = await createTodoApi(form);
        if (result.status === 200 && result.data.status === 200) {
          toast('Todo Added');
          setRefreshList(new Date());
          setForm({
            title: '',
            description: '',
          });
        } else {
          toast(result.data.message);
        }
      }
    } catch (error) {
      toast('Error occurred while saving the todo');
    }
  };

  return (
    <div className='modal mt-5' id='exampleModal'>
      <ToastContainer />
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-title'>
              {todo ? 'Edit Todo' : 'Add New Todo'}
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='close'
            >
              <span arial-hidden='true'></span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='form-group mb-2'>
              <textarea
                onChange={handleChange}
                name='title'
                className='form-control'
                rows={1}
                placeholder='Add Title...'
                value={form.title}
              ></textarea>
            </div>
            <div className='form-group'>
              <textarea
                onChange={handleChange}
                name='description'
                className='form-control'
                rows={3}
                placeholder='Add Todo Description...'
                value={form.description}
              ></textarea>
            </div>
          </div>
          <div className='modal-fotter mb-3' style={{ textAlign: 'center' }}>
            <button
              type='button'
              className='btn btn-success'
              style={{ marginRight: '2rem' }}
              onClick={handleTodoSubmit}
              data-bs-dismiss='modal'
            >
              {todo ? 'Update Todo' : 'Save Todo'}
            </button>
            <button
              onClick={() => {
                setForm({
                  title: '',
                  description: '',
                });
                onEdit(null); // Clear the edit state
              }}
              type='button'
              className='btn btn-warning'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
