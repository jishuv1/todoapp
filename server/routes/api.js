import express from 'express';
import register from '../controllers/register.js';
import { registerSchema } from '../validationSchema/registerSchema.js';
import login from '../controllers/login.js';
import { createTodo } from '../controllers/todo.js';
import { markTodoSchema, todoSchema } from '../validationSchema/todoSchema.js';
import { getTodos } from '../controllers/todoList.js';
import { markTodo } from '../controllers/markTodo.js';
import { removeTodo } from '../controllers/removeTodo.js';

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register', registerSchema, register);
apiRoute.post('/login', registerSchema, login);

// Protected routes
apiProtected.post('/createtodo', todoSchema, createTodo);
apiProtected.post('/marktodo', markTodoSchema, markTodo);
apiProtected.post('/deletetodo', markTodoSchema, removeTodo);
apiProtected.get('/todolist', getTodos);

export default apiRoute;
