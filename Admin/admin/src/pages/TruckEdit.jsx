import { Handyman, CalendarToday, Scale, MailOutline, LocationOn, Publish } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const TruckEdit = () => {

  const [truck, settruck]=useState({})
  const [image, setImage] = useState('')
  const [details, setdetails]=useState({})
    const api_url = import.meta.env.VITE_api_url;
  const {id} = useParams()
  const navigate = useNavigate()
  
  const currentUser = useSelector(state=>state.user?.currentUser)
   const token = currentUser?.accessToken
   const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(()=>{
   const getTruck = async()=>{
    try {
      const res = await axios.get(`${api_url}/api/truck/${id}`)
      settruck(res.data)
    } catch (error) {
      console.log(error)
    }
   }
   getTruck()
  }, [api_url,id])
  
  
  const handlechange = (e)=>{
    const value = e.target.value
    setdetails({...details,
        [e.target.name]:value}
    )
    }
    const handleSubmit = async(e)=>{
         e.preventDefault()
         try {
          const res = await axios.put(`${api_url}/api/truck/update/${id}`,{...details, image},config)
          navigate("/trucks")
         } catch (error) {
          console.log(error)
         }
    }

    const handleImage = (e)=>{
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result; 
        setImage(dataURL);    
      };
      reader.readAsDataURL(file);
    }
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      return `${formattedDate} `
    }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h1 className="font-bold text-2xl text-gray-800">Edit Truck</h1>
        <Link to="/newtruck" className="text-white bg-green-700 px-4 py-2 rounded-md hover:bg-green-800 transition-all">
          Create
        </Link>
      </div>
      <div className="flex flex-col md:flex-row mt-6 gap-6">
        <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <img className="w-16 h-16 rounded-full border" src={truck.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="avatar" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{truck.truckNo}</h3>
              <h3 className="text-sm text-gray-600">{truck.status}</h3>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700">Truck Details</h3>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <Handyman className="text-blue-500" fontSize="small" />
              <span>{truck.driver}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <CalendarToday className="text-blue-500" fontSize="small" />
              <span>{formatDate(truck.createdAt)}</span>
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-700">Truck Details</h3>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <Scale className="text-blue-500" fontSize="small" />
              <span>{truck.maxLoadWeight + "tons"}</span>
            </div>
           
          </div>
        </div>
        <div className="flex-[3] bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Truck</h2>
          <form className="flex flex-col md:flex-row gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700">Truck Number</label>
              <input name="truckNo" onChange={handlechange} type="text" placeholder="456jlk" className="border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
              <label className="text-sm font-medium text-gray-700 mt-3">Driver</label>
              <input name="driver" onChange={handlechange} type="text" placeholder="Jon Snow" className="border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
              <label className="text-sm font-medium text-gray-700 mt-3">Max Load (tons)</label>
              <input name="maxLoadWeight" onChange={handlechange} type="text" placeholder="25" className="border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
              <label className="text-sm font-medium text-gray-700 mt-3">Status</label>
              <select name="status" onChange={handlechange}   className="border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="active">Active</option>
                <option value="repair">On Repairs</option>
              </select>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 bg-gray-50 rounded-lg p-4 border">
              <img className="w-24 h-24 rounded-full border" src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" alt="Truck" />
              <label htmlFor="file" className="mt-2 cursor-pointer text-blue-500 hover:underline">
                <Publish /> Upload Image
              </label>
              <input type="file" id="file" className="hidden" onChange={handleImage}  />
              <button className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TruckEdit;
