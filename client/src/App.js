import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from './components/Tasks.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/tasks' replace />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
