

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess, loginFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const api_url = import.meta.env.VITE_api_url;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let errors = { email: "", password: "" };

    if (!email.trim()) {
      errors.email = "Email is required!";
    } else if (!validateEmail(email)) {
      errors.email = "Enter a valid email!";
    }

    if (!password.trim()) {
      errors.password = "Password is required!";
    }

    setErrors(errors);

    if (!errors.email && !errors.password) {
      try {
        const res = await axios.post(`${api_url}/api/user/login`,{email, password})
        console.log(res.data)
        dispatch(loginSuccess(res.data))
        navigate('/')
      } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || "Registration failed"));
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-600 object-cover bg-cover bg-center bg-no-repeat h-screen">
      <div className="flex flex-col w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-600">Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Email Input */}
          <input
            type="text"
            className="w-full p-3 mb-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <motion.p
              className="text-red-500 text-sm mb-3"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.email}
            </motion.p>
          )}

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 mb-2 border rounded-md pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputAdornment position="end" className="absolute right-3 top-3">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </div>
          {errors.password && (
            <motion.p
              className="text-red-500 text-sm mb-3"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.password}
            </motion.p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 p-2 text-white cursor-pointer w-full rounded-md hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        {/* <h3 className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 font-bold">
            Register
          </Link>
        </h3> */}
      </div>
    </div>
  );
};

export default Login;


























