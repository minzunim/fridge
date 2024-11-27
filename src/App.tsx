import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gate from "./pages/Gate";
import Compartment from "./pages/Compartment";
import SignUp from "./pages/SignUp";
import UserProvider, { UserContext } from "./contexts/Authcontext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Gate />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/compartment" element={<Compartment />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
