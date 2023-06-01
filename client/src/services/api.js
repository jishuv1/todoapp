import axios from 'axios';
import { CREATE_TODO, LOGIN, REGISTER, TODO_LIST } from './apiConstants.js';

export const login = async (data) => axios.post(LOGIN, data);
export const register = async (data) => axios.post(REGISTER, data);

export const getToken = () => {
  let user = localStorage.getItem('user');
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
};

export const createTodoApi = async (data) => {
  let token = getToken();
  console.log('tokrn', token);

  return axios.post(CREATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

export const getTodoListApi = async () => {
  let token = getToken();

  return axios.get(TODO_LIST, {
    headers: {
      auth: token,
    },
  });
};
