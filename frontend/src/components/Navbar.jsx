import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          <img src="/logo.png" alt="Logo" className="h-9 w-9 object-cover" />
          Recipes
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/add-recipe" className="text-gray-700 hover:text-indigo-600">Add Recipe</Link>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || "/logo1.png"}
                  alt="Avatar"
                  className="h-9 w-9 rounded-full border-2 border-indigo-500 object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 text-gray-800 hover:bg-white/40 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-white/20 text-gray-800 hover:bg-white/40 rounded-lg">Register</Link>
            </>
          )}
        </div>

        {/* Mobile button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/40 backdrop-blur-md px-6 pb-4 space-y-3">
          {user ? (
            <>
              <Link to="/add-recipe" className="block text-gray-800 hover:text-indigo-600">Add Recipe</Link>
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={user.avatar || "/logo1.png"}
                  alt="Avatar"
                  className="h-9 w-9 rounded-full border-2 border-indigo-500 object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 text-gray-800 hover:bg-white/40 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Login</Link>
              <Link to="/register" className="block px-4 py-2 bg-white/20 text-gray-800 hover:bg-white/40 rounded-lg">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
