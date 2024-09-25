import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MyPage from './pages/Mypage';
import Center from './pages/Center';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/center" element={<Center />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
