import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { serverURL } = useContext(dataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        serverURL + "/api/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex justify-center items-center px-4">
      <div className="w-full max-w-[500px] bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <h1 className="text-white text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            Login
          </button>
          <p className="text-center text-white mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-300 cursor-pointer underline hover:text-blue-400"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
