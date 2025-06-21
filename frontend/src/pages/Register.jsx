import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background-food.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-white border-opacity-30">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-white border-opacity-40 bg-white bg-opacity-10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder-opacity-70"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-white border-opacity-40 bg-white bg-opacity-10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder-opacity-70"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-white border-opacity-40 bg-white bg-opacity-10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white placeholder-opacity-70"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
