import axios from 'axios';
import {
  CREATE_TODO,
  LOGIN,
  MARK_TODO,
  REGISTER,
  REMOVE_ALL_COMPLETED_TODO,
  REMOVE_TODO,
  TODO_LIST,
  UPDATE_TODO,
} from './apiConstants.js';

// Login API
export const login = async (data) => axios.post(LOGIN, data);

// Registering new user API
export const register = async (data) => axios.post(REGISTER, data);

// Getting Token of the Logged In User from Local Storage
export const getToken = () => {
  let user = localStorage.getItem('user');
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
};

// Create a new Todo
export const createTodoApi = async (data) => {
  let token = getToken();
  console.log('createTodoApi', token);

  return axios.post(CREATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

// Get Todo List of the current user
export const getTodoListApi = async () => {
  let token = getToken();

  return axios.get(TODO_LIST, {
    headers: {
      auth: token,
    },
  });
};

// Changing the status of the Todos
export const markTodo = async (data) => {
  let token = getToken();

  return axios.post(MARK_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

// Updating the Todos
export const updateTodo = async (data) => {
  let token = getToken();

  return axios.post(UPDATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

// Removing the Todos
export const removeTodo = async (data) => {
  let token = getToken();

  return axios.post(REMOVE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

// Removing all completed Todos
export const removeAllCompletedTodo = async () => {
  let token = getToken();
  console.log('token', token);

  return axios.post(
    REMOVE_ALL_COMPLETED_TODO,
    {},
    {
      headers: {
        auth: token,
      },
    }
  );
};
