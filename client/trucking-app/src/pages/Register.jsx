// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loginSuccess, loginFailure } from "../redux/userSlice";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [user, setUser] = useState({
//     userName: "",    
//     email: "",
//     password: "",
//     confirmPassword: "",  
//     role: "",
//   });

//   const API_URL = import.meta.env.VITE_api_url;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

//   const handleChange = (e) => {
//     setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   const api_url = import.meta.env.VITE_api_url;
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = {};

//     if (!user.userName.trim()) newErrors.userName = "Username is required!";
//     if (!user.email.trim()) {
//       newErrors.email = "Email is required!";
//     } else if (!validateEmail(user.email)) {
//       newErrors.email = "Enter a valid email!";
//     }
//     if (!user.password.trim()) {
//       newErrors.password = "Password is required!";
//     } else if (user.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters!";
//     }
//     if (user.password !== user.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match!";
//     }
//     if (!user.role) newErrors.role = "Please select a role!";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         const res = await axios.post(`${api_url}/api/user/register`, user);
//         console.log(res.data);
//         dispatch(loginSuccess(res.data));
//         navigate("/");
//       } catch (error) {
//         dispatch(loginFailure(error.response?.data?.message || "Registration failed"));
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-slate-600">
//       <div className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-5">Create Account</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col">
//           <input
//             type="text"
//             name="userName"
//             placeholder="Enter your username"
//             className="w-full p-3 mb-2 border rounded-md"
//             value={user.userName}  
//             onChange={handleChange}
//           />
//           {errors.userName && (
//             <motion.p className="text-red-500 text-sm mb-3">{errors.userName}</motion.p>
//           )}

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             className="w-full p-3 mb-2 border rounded-md"
//             value={user.email}
//             onChange={handleChange}
//           />
//           {errors.email && <motion.p className="text-red-500 text-sm mb-3">{errors.email}</motion.p>}

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             className="w-full p-3 mb-2 border rounded-md"
//             value={user.password}
//             onChange={handleChange}
//           />
//           {errors.password && <motion.p className="text-red-500 text-sm mb-3">{errors.password}</motion.p>}

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm password"
//             className="w-full p-3 mb-2 border rounded-md"
//             value={user.confirmPassword}
//             onChange={handleChange}
//           />
//           {errors.confirmPassword && <motion.p className="text-red-500 text-sm mb-3">{errors.confirmPassword}</motion.p>}

//           <select
//             name="role"
//             className="w-full p-3 mb-2 border rounded-md bg-white"
//             value={user.role}
//             onChange={handleChange}
//           >
//             <option value="">Select Role</option>
//             <option value="driver">Driver</option>
//             <option value="client">Client</option>
//           </select>
//           {errors.role && <motion.p className="text-red-500 text-sm mb-3">{errors.role}</motion.p>}

//           <button type="submit" className="bg-red-600 p-3 text-white cursor-pointer w-full rounded-md hover:bg-red-700 transition">
//             Sign Up
//           </button>
//         </form>
//         {/* Register Link */}
//         <h3 className="text-center text-gray-700 mt-4">
//           Have an account?{" "}
//           <Link to="/login" className="text-red-500 font-bold">
//             Login
//           </Link>
//         </h3>
//       </div>
//     </div>
//   );
// };

// export default Register;
