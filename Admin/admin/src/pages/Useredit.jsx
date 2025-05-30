import {
  Person,
  CalendarToday,
  PhoneIphone,
  MailOutline,
  LocationOn,
  Publish,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


const Useredit = () => {
const [user, setUser]=useState({})
const [details, setdetails]=useState({})
const [image, setImage] = useState('')
  const api_url = import.meta.env.VITE_api_url;
const {id} = useParams()
const navigate = useNavigate()
console.log(image)
const currentUser = useSelector(state=>state.user?.currentUser)
 const token = currentUser?.accessToken
 const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
useEffect(()=>{
 const getUser = async()=>{
  try {
    const res = await axios.get(`${api_url}/api/user/${id}`, config)
    setUser(res.data)
  } catch (error) {
    console.log(error)
  }
 }
 getUser()
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
        const res = await axios.put(`${api_url}/api/user/update/${id}`,{...details,image},config)
        navigate("/users")
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-800">Edit User</h1>
        <Link
          to="/newuser"
          className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg shadow-md transition duration-300"
        >
          Create
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <img
              className="w-16 h-16 rounded-full border-2 border-gray-300"
              src={user.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"}
              alt="avatar"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.userName}</h3>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-gray-700 font-medium">Account Details</h3>
            <div className="flex items-center gap-2 text-gray-700">
              <Person fontSize="small" />
              <p>{user.userName}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarToday fontSize="small" />
              <p>{formatDate(user.createdAt)}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-gray-700 font-medium">Contact Details</h3>
            <div className="flex items-center gap-2 text-gray-700">
              <PhoneIphone fontSize="small" />
              <p>{user.phone ||"+112358943"}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MailOutline fontSize="small" />
              <p>{user.email}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <LocationOn fontSize="small" />
              <p>{user.address ||"Chicago, USA"}</p>
            </div>
          </div>
        </div>

        
        <div className="flex-[3] bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit</h2>
          <form className="flex flex-col md:flex-row gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full space-y-4">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                onChange={handlechange}
                name="userName"
                placeholder="jon"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
              />

              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                onChange={handlechange}
                placeholder="jon@yahoo.com"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
              />

              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handlechange}
                placeholder="******"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
              />

              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                onChange={handlechange}
                placeholder="Chicago, USA"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
              />

              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone_no"
                placeholder="+112358943"
                onChange={handlechange}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
              />

              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
              name="role"
              onChange={handlechange}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none bg-white text-gray-700 cursor-pointer"
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            
            <div className="flex flex-col items-center gap-4 w-1/2 bg-gray-100 rounded-lg p-4">
              <img
                className="w-24 h-24 rounded-full border-2 border-gray-300"
                src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                alt=""
              />
              <label htmlFor="file" className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <Publish /> Upload
              </label>
              <input   onChange={handleImage} type="file" id="file" className="hidden" />
              <button className="w-28 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium shadow-md transition duration-300">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Useredit;



























// import {
//   Person,
//   CalendarToday,
//   PhoneIphone,
//   MailOutline,
//   LocationOn,
//   Publish,
// } from "@mui/icons-material";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { Alert, CircularProgress } from "@mui/material";

// const UserEdit = () => {
//   const [user, setUser] = useState({});
//   const [details, setDetails] = useState({});
//   const [image, setImage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const api_url = import.meta.env.VITE_api_url;
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Get authentication state from Redux
//   const currentUser = useSelector(state => state.user?.currentUser);
//   const token = useSelector(state => state.user?.token);
//   const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
//   const isAdmin = currentUser?.role === 'admin';

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     if (!isAdmin) {
//       setError('You do not have permission to edit users');
//       setLoading(false);
//       return;
//     }

//     const getUser = async () => {
//       try {
//         const res = await axios.get(`${api_url}/api/user/${id}`, config);
//         setUser(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setError(error.response?.data?.message || 'Failed to fetch user data');
//         setLoading(false);
//       }
//     };
//     getUser();
//   }, [api_url, id, isAuthenticated, isAdmin, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetails(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.put(
//         `${api_url}/api/user/update/${id}`,
//         { ...details, image },
//         config
//       );
//       navigate("/users");
//     } catch (error) {
//       console.error('Error updating user:', error);
//       setError(error.response?.data?.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   if (!isAuthenticated) {
//     return null; // Will redirect via useEffect
//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <Alert severity="error" className="mt-4">
//           You do not have permission to edit users. Only administrators can access this page.
//         </Alert>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress size={60} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <Alert severity="error" className="mt-4">
//           {error}
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="font-bold text-3xl text-gray-800">Edit User</h1>
//         {isAdmin && (
//           <Link
//             to="/newuser"
//             className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg shadow-md transition duration-300"
//           >
//             Create New User
//           </Link>
//         )}
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* User Info Section */}
//         <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
//           <div className="flex items-center gap-4 mb-6">
//             <img
//               className="w-16 h-16 rounded-full border-2 border-gray-300"
//               src={user.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"}
//               alt="avatar"
//             />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">{user.userName}</h3>
//               <p className="text-sm text-gray-600 capitalize">{user.role}</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-gray-700 font-medium">Account Details</h3>
//             <div className="flex items-center gap-2 text-gray-700">
//               <Person fontSize="small" />
//               <p>{user.userName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <CalendarToday fontSize="small" />
//               <p>{formatDate(user.createdAt)}</p>
//             </div>
//           </div>

//           <div className="mt-6 space-y-4">
//             <h3 className="text-gray-700 font-medium">Contact Details</h3>
//             <div className="flex items-center gap-2 text-gray-700">
//               <PhoneIphone fontSize="small" />
//               <p>{user.phone_no || 'N/A'}</p>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <MailOutline fontSize="small" />
//               <p>{user.email || 'N/A'}</p>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <LocationOn fontSize="small" />
//               <p>{user.address || 'N/A'}</p>
//             </div>
//           </div>
//         </div>

//         {/* Edit Form Section */}
//         <div className="flex-[3] bg-white shadow-lg p-6 rounded-lg">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User</h2>
//           <form className="flex flex-col md:flex-row gap-6" onSubmit={handleSubmit}>
//             <div className="flex flex-col w-full space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   name="userName"
//                   defaultValue={user.userName}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none w-full"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   defaultValue={user.email}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none w-full"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   placeholder="Leave blank to keep current"
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none w-full"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   onChange={handleChange}
//                   defaultValue={user.address}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none w-full"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
//                 <input
//                   type="tel"
//                   name="phone_no"
//                   onChange={handleChange}
//                   defaultValue={user.phone_no}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none w-full"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
//                 <select
//                   name="role"
//                   onChange={handleChange}
//                   defaultValue={user.role}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none bg-white text-gray-700 cursor-pointer w-full"
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="client">Client</option>
//                   <option value="driver">Driver</option>
//                 </select>
//               </div>
//             </div>

//             {/* Image Upload Section */}
//             <div className="flex flex-col items-center gap-4 w-full md:w-1/2 bg-gray-100 rounded-lg p-4">
//               <img
//                 className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
//                 src={image || user.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"}
//                 alt="User avatar"
//               />
//               <label htmlFor="file" className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800">
//                 <Publish /> Upload New Image
//               </label>
//               <input 
//                 onChange={handleImage} 
//                 type="file" 
//                 id="file" 
//                 accept="image/*"
//                 className="hidden" 
//               />
//               <button 
//                 type="submit"
//                 className="w-28 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium shadow-md transition duration-300"
//                 disabled={loading}
//               >
//                 {loading ? 'Updating...' : 'Update'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserEdit;




