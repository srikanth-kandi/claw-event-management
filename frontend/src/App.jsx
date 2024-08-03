import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile";
import NotFoundPage from "./404";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
