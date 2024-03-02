import "./App.css";
import Header from "./components/Header";
import TodoContainer1 from "./components/TodoContainer1";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todocontainer1" element={<TodoContainer1 />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
