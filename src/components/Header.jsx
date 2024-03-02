import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <nav>
      <div className="flex p-2 justify-between items-center bg-blue-400">
        <div>
          <h1 className="text-white">Todo Application</h1>
        </div>
        {userLoggedIn ? (
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-sm text-blue-600 underline cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="bg-white text-blue-500 py-1 px-4 rounded text-sm text-blue-600 underline">
              Login
            </Link>
            <Link to="/register" className="bg-white text-red-500 py-1 px-4 rounded text-sm text-blue-600 underline">
              Register New Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
