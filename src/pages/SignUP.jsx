import React, { useContext, useRef, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import dp from "../assets/download.png";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const { serverURL } = useContext(dataContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [frontendImage, setFrontendImage] = useState(dp);
  const [backendImage, setBackendImage] = useState(null);

  const file = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      }

      let data = await axios.post(serverURL + "/api/signup", formData, {
        withCredentials: true,
        headers:{"Content-Type":"multipart/form-data"}
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    let image = URL.createObjectURL(file);

    setFrontendImage(image);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex justify-center items-center px-4">
      <div className="w-full max-w-[500px] bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Create Account
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
          <input type="file" hidden ref={file} onChange={handleImage} />
          <div
            className="w-[120px] h-[120px] rounded-full mx-auto border-4 border-white overflow-hidden relative group cursor-pointer"
            onClick={() => file.current.click()}
          >
            <img
              src={frontendImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center text-white text-3xl">
              +
            </div>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              className="flex-1 p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              className="flex-1 p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
            Sign Up
          </button>

          <p className="text-center text-white mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-300 cursor-pointer underline hover:text-blue-400"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUP;
