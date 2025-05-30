// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';

 


// const MessageForm = () => {

//   const [isSubmitting, setIsSubmitting] = useState("");
//   const api_url = import.meta.env.VITE_api_url;
//   const currentUser = useSelector(state=>state.user?.currentUser)
//   const token = currentUser?.accessToken
  
//  const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };
//   const [formData, setFormData] = useState({
//     subject: "",
//     body: "",
//     image: '',
//   });
//   const [errors, setErrors] = useState({
//     subject: "",
//     body: "",
//     image: '',
//   });
  
//   const [imagePreview, setImagePreview] = useState(null);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };
  

//   const handleSubmit = async(e)=>{
//      e.preventDefault()
//      try {
//       const res = await axios.post(`${api_url}/api/message/create`,{...formData, image:imagePreview},config)
//       console.log(res.data)
//        toast.success("Message sent successfully, the admin will contact you soonest!");
//        setFormData({ subject: "", body: "", image: "" });
//        setErrors({ subject: "", body: "", image: "" });
//      } catch (error) {
//      toast.errors(
//                  error.response?.data?.message || "An error occurred. Please try again."
//              );
//      }
//   }

 
  
  

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Send a Message</h2>

       
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Title</label>
//           <input
//             type="text"
//             name="subject"
            
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

       
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Message </label>
//           <textarea
//             name="body"
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             required
//           />
//         </div>

//         {/* Driver ID */}
//         {/* <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Driver ID</label>
//           <input
//             type="text"
//             name="driverID"
//             value={formData.driverID}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div> */}

       
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Upload Image </label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             accept="image/*"
//           />
//         </div>

       
//         {imagePreview && (
//           <div className="mb-4">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-full h-48 object-cover rounded-lg"
//             />
//           </div>
//         )}

      
//         <button
//           type="submit"
//           className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
//         >
//           Send Message
//         </button>
//         <ToastContainer />
//       </form>
//     </div>
//   );
// };

// export default MessageForm;





import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

const MessageForm = () => {
  const [isSubmitting, setIsSubmitting] = useState("");
  const api_url = import.meta.env.VITE_api_url;
  const currentUser = useSelector(state => state.user?.currentUser);
  const token = currentUser?.accessToken;
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
    image: '',
  });
  
  const [errors, setErrors] = useState({
    subject: "",
    body: "",
    image: '',
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Remove the data URL prefix
        setFormData({ ...formData, image: base64String });
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(
        `${api_url}/api/message/create`,
        formData,
        config
      );
      
      console.log(res.data);
      toast.success("Message sent successfully, the admin will contact you soonest!");
      setFormData({ subject: "", body: "", image: "" });
      setImagePreview(null);
      setErrors({ subject: "", body: "", image: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Send a Message</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Message </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload Image </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default MessageForm;