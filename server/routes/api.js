import express from 'express';
import register from '../controllers/register.js';
import { registerSchema } from '../validationSchema/registerSchema.js';
import login from '../controllers/login.js';
import { createTodo } from '../controllers/todo.js';
import { markTodoSchema, todoSchema } from '../validationSchema/todoSchema.js';
import { getTodos } from '../controllers/todoList.js';
import { markTodo } from '../controllers/markTodo.js';
import { removeTodo } from '../controllers/removeTodo.js';
import { updateTodo } from '../controllers/updateTodo.js';
import { removeAllCompletedTodo } from '../controllers/removeAllCompleted.js';
import { loginSchema } from '../validationSchema/loginSchema.js';

const apiRoute = express.Router();
export const apiProtected = express.Router();

// api route for registration of new users
apiRoute.post('/register', registerSchema, register);

// api route for login user
apiRoute.post('/login', loginSchema, login);

// Protected routes

// Creating new Todo
apiProtected.post('/createtodo', todoSchema, createTodo);

// Changing the status of Todo
apiProtected.post('/marktodo', markTodoSchema, markTodo);

// Deleting Todo
apiProtected.post('/deletetodo', markTodoSchema, removeTodo);

// Getting Todos of the current user
apiProtected.get('/todolist', getTodos);

// Updating the existing todo
apiProtected.post('/updatetodo', todoSchema, updateTodo);

// Removing all completed todos of the current user
apiProtected.post('/removeallcompletedtodo', removeAllCompletedTodo);

export default apiRoute;
