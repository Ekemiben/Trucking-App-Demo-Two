import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const NewUser = () => {
const [user, setUser] = useState({})
const api_url = import.meta.env.VITE_api_url;
const handlechange = (e)=>{
  const value = e.target.value
  setUser({...user,
      [e.target.name]:value}
  )
  }
  const navigate = useNavigate()

  const currentUser = useSelector(state=>state.user?.currentUser)
   const token = currentUser?.accessToken
   const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
const handleSubmit = async(e)=>{
  e.preventDefault()
try {
  const res = await axios.post(`${api_url}/api/user/register`, user)
  console.log(res.data)
  navigate("/users")
} catch (error) {
  console.log(error)
}
}

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl mb-6 text-gray-800 text-center">New User</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username" className="font-medium text-sm mb-2 text-gray-600">
            Username
          </label>
          <input
            type="text"
            name='userName'
            onChange={handlechange}
            placeholder="jon"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="email" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Email
          </label>
          <input
            type="email"
            name='email'
            onChange={handlechange}
            placeholder="jon@yahoo.com"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="password" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Password
          </label>
          <input
            type="password"
            name='password'
            onChange={handlechange}
            placeholder="********"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

        
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="font-medium text-sm mb-2 text-gray-600">
            Address
          </label>
          <input
            type="text"
            name='address'
            onChange={handlechange}
            placeholder="Chicago, USA"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="phone" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Phone no.
          </label>
          <input
            type="text"
            name='phone_no'
            onChange={handlechange}
            placeholder="+112358943"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="role" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Role
          </label>
          <select
          name='role'
          onChange={handlechange}
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="client">Client</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </form>

      <div className="mt-6 text-center">
        
      </div>
    </div>
  );
};

export default NewUser;
