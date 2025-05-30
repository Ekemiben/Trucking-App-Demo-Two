import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const NewTruck = () => {

const [truck, settruck] = useState({
  truckNo: '',
  driver: '',
  maxLoadWeight: '',
})
const [status, setstatus] = useState("active")
console.log(status)

const api_url = import.meta.env.VITE_api_url;
const handlechange = (e)=>{
  const value = e.target.value
  settruck({...truck,
      [e.target.name]:value}
  )
  }
  
  const navigate = useNavigate()

  const currentUser = useSelector(state=>state.user?.currentUser)
   const token = currentUser?.accessToken
   console.log(token)
   const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
const handleSubmit = async(e)=>{
  e.preventDefault()
try {
  const res = await axios.post(`${api_url}/api/truck/create`, {...truck, status}, config)
  console.log(res.data)
  navigate("/trucks")
} catch (error) {
  console.log(error)
}
}

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl mb-6 text-gray-800 text-center">New User</h1>
      <form className="flex flex-col gap-4 w-4/5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username" className="font-medium text-sm mb-2 text-gray-600">
            Truck_no
          </label>
          <input
            type="text"
            name='truckNo'
            onChange={handlechange}
            placeholder="456jlk"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Driver
          </label>
          <input
            type="text"
            name='driver'
            onChange={handlechange}
            placeholder="jon snow"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="password" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Max_Load(tons)
          </label>
          <input
            type="Number"
            name='maxLoadWeight'
            onChange={handlechange}
            placeholder="25"
            className="input border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="confirmPassword" className="font-medium text-sm mb-2 text-gray-600 mt-4">
            Status
          </label>
          <select name="status" id="" value={status}  onChange={(e)=>{setstatus(e.target.value)}}>
            <option value="active">active</option>
            <option value="on repair">on repair</option>
          </select>
        </div>

        <div className="flex flex-col">
         
        </div>
        <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </div>
      </form>

      
    </div>
  );
};

export default NewTruck;
