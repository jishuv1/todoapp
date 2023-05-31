import axios from 'axios';
import { LOGIN, REGISTER } from './apiConstants.js';

export const login = async (data) => axios.post(LOGIN, data);
export const register = async (data) => axios.post(REGISTER, data);
