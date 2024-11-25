import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MyPage from './pages/Mypage';
import Register from './pages/Register';
import Gate from './pages/Gate';
import Compartment from './pages/Compartment';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gate" element={<Gate />} />
        <Route path="/compartment" element={<Compartment />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
