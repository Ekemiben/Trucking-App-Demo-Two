
// import { useState } from "react";
// import { Button, CircularProgress, Typography } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function DriverForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     licenseNumber: "",
//     experience: "",
//     truckType: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     resume: null
//   });

//   const [isUploading, setIsUploading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const api_url = import.meta.env.VITE_api_url;




//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setErrors(prev => ({
//       ...prev,
//       [name]: ""
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate PDF file
//     if (file.type !== 'application/pdf') {
//       setErrors(prev => ({
//         ...prev,
//         resume: 'Only PDF files are allowed'
//       }));
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) { // 5MB limit
//       setErrors(prev => ({
//         ...prev,
//         resume: 'File size must be less than 5MB'
//       }));
//       return;
//     }

//     setFormData(prev => ({
//       ...prev,
//       resume: file
//     }));
//     setErrors(prev => ({
//       ...prev,
//       resume: ""
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = [
//       'fullName', 'email', 'phone', 'licenseNumber',
//       'experience', 'truckType', 'address',
//       'city', 'state', 'zipCode', 'resume'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         const fieldName = field.replace(/([A-Z])/g, " $1").toLowerCase();
//         newErrors[field] = `Please provide your ${fieldName}`;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       // Create FormData for the entire submission
//       const submissionData = new FormData();
      
//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'resume') {
//           submissionData.append('pdf', formData[key]);
//         } else {
//           submissionData.append(key, formData[key]);
//         }
//       });

//       const response = await axios.post(
//         `${api_url}/api/application`,
//         submissionData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data) {
//         toast.success("Application submitted successfully!");
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       let errorMessage = "Error submitting application";
      
//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center w-full">
//       <div className="lg:w-[71%] flex flex-col justify-center items-center lg:rounded-2xl lg:mt-20 mb-20 border-2 bg-gray-50 sm:w-full md:w-[90%]">
//         <h1 className="mt-10 px-10 text-xl font-semibold">
//           Please make sure you fill all your details correctly!
//         </h1>

//         <div className="w-[90%] flex justify-center items-center gap-x-10">
//           <form onSubmit={handleSubmit} className="flex flex-col bg-gray-50 shadow-xl mb-10 w-full">
            
//             <div className="flex flex-col lg:flex-row gap-x-10 space-y-4 p-6 w-full sm:flex-col md:flex-col">
              
//               {/* Left Column */}
//               <div className="lg:w-[50%] mb-10 mt-4 sm:w-full md:w-full">
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     maxLength={40}
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.fullName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     maxLength={40}
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     maxLength={14}
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     inputMode="numeric"  // Show numeric keyboard on mobile
//                     pattern="[0-9]*"     // HTML5 pattern for numbers
//                   />
//                   {errors.phone && (
//                     <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Driver's License Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="licenseNumber"
//                     maxLength={20}
//                     value={formData.licenseNumber}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.licenseNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Years of Experience <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="experience"
//                     maxLength={2}
//                     value={formData.experience}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.experience && (
//                     <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Preferred Truck Type <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="truckType"
//                     value={formData.truckType}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Truck Type</option>
//                     <option value="Flatbed">Flatbed</option>
//                     <option value="Refrigerated">Refrigerated</option>
//                     <option value="Container">Container</option>
//                     <option value="Tanker">Tanker</option>
//                   </select>
//                   {errors.truckType && (
//                     <p className="mt-1 text-sm text-red-600">{errors.truckType}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="lg:w-[50%] mb-10 sm:w-full md:w-full">
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     maxLength={70}
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.address && (
//                     <p className="mt-1 text-sm text-red-600">{errors.address}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     maxLength={40}
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.city && (
//                     <p className="mt-1 text-sm text-red-600">{errors.city}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     State <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     maxLength={30}
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.state && (
//                     <p className="mt-1 text-sm text-red-600">{errors.state}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Zip Code <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     maxLength={20}
//                     value={formData.zipCode}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors.zipCode && (
//                     <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
//                   )}
//                 </div>

//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Upload Resume (PDF only, max 5MB) <span className="text-red-500">*</span>
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       accept="application/pdf"
//                       style={{ display: 'none' }}
//                       id="resume-upload"
//                       type="file"
//                       onChange={handleFileChange}
//                       disabled={isUploading}
//                     />
//                     <label htmlFor="resume-upload">
//                       <Button
//                         variant="contained"
//                         component="span"
//                         color="primary"
//                         startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
//                         disabled={isUploading}
//                         fullWidth
//                       >
//                         {formData.resume ? formData.resume.name : 'Select PDF File'}
//                       </Button>
//                     </label>
//                     {errors.resume && (
//                       <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                         {errors.resume}
//                       </Typography>
//                     )}
//                     {formData.resume && !errors.resume && (
//                       <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
//                         {formData.resume.name} selected and ready for upload
//                       </Typography>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full px-6 pb-6 flex justify-center">
//               <button
//                 type="submit"
//                 className="w-full md:w-1/2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-400"
//                 disabled={isUploading}
//               >
//                 {isUploading ? (
//                   <span className="flex items-center justify-center">
//                     <CircularProgress size={20} color="inherit" className="mr-2" />
//                     Submitting...
//                   </span>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={5000} />
//     </div>
//   );
// }
















import { useState } from "react";
import { Button, CircularProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DriverForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    experience: "",
    truckType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    resume: null
  });

  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const api_url = import.meta.env.VITE_api_url;

  // Function to handle phone number input (only allow numbers)
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    // Remove any non-digit characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: numericValue
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate PDF file
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({
        ...prev,
        resume: 'Only PDF files are allowed'
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({
        ...prev,
        resume: 'File size must be less than 5MB'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      resume: file
    }));
    setErrors(prev => ({
      ...prev,
      resume: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'fullName', 'email', 'phone', 'licenseNumber',
      'experience', 'truckType', 'address',
      'city', 'state', 'zipCode', 'resume'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        const fieldName = field.replace(/([A-Z])/g, " $1").toLowerCase();
        newErrors[field] = `Please provide your ${fieldName}`;
      }
    });

    // Additional validation for phone number
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for the entire submission
      const submissionData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'resume') {
          submissionData.append('pdf', formData[key]);
        } else {
          submissionData.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${api_url}/api/application`,
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data) {
        toast.success("Application submitted successfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      let errorMessage = "Error submitting application";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="lg:w-[71%] flex flex-col justify-center items-center lg:rounded-2xl lg:mt-20 mb-20 border-2 bg-gray-50 sm:w-full md:w-[90%]">
        {/* <h1 className="mt-10 px-10 text-xl font-semibold">
          Please make sure you fill all your details correctly!
        </h1> */}
        <h1 className="mt-10 px-10 text-xl font-semibold">
          Apply as a Driver
        </h1>

        <div className="w-[90%] flex justify-center items-center gap-x-10">
          <form onSubmit={handleSubmit} className="flex flex-col bg-gray-50 shadow-xl mb-10 w-full">
            
            <div className="flex flex-col lg:flex-row gap-x-10 space-y-4 p-6 w-full sm:flex-col md:flex-col">
              
              {/* Left Column */}
              <div className="lg:w-[50%] mb-10 mt-4 sm:w-full md:w-full">
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    maxLength={40}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    maxLength={40}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"  // Keep as text type but restrict to numbers
                    name="phone"
                    maxLength={14}
                    value={formData.phone}
                    onChange={handlePhoneChange}  // Use the special phone handler
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    inputMode="numeric"  // Show numeric keyboard on mobile
                    pattern="[0-9]*"     // HTML5 pattern for numbers
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Driver's License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    maxLength={20}
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    maxLength={2}
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Preferred Truck Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="truckType"
                    value={formData.truckType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Truck Type</option>
                    <option value="Flatbed">Flatbed</option>
                    <option value="Refrigerated">Refrigerated</option>
                    <option value="Container">Container</option>
                    <option value="Tanker">Tanker</option>
                  </select>
                  {errors.truckType && (
                    <p className="mt-1 text-sm text-red-600">{errors.truckType}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:w-[50%] mb-10 sm:w-full md:w-full">
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    maxLength={70}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    maxLength={40}
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    maxLength={30}
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    maxLength={20}
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Upload Resume (PDF only, max 5MB) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      accept="application/pdf"
                      style={{ display: 'none' }}
                      id="resume-upload"
                      type="file"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                        disabled={isUploading}
                        fullWidth
                      >
                        {formData.resume ? formData.resume.name : 'Select PDF File'}
                      </Button>
                    </label>
                    {errors.resume && (
                      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {errors.resume}
                      </Typography>
                    )}
                    {formData.resume && !errors.resume && (
                      <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
                        {formData.resume.name} selected and ready for upload
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-6 pb-6 flex justify-center">
              <button
                type="submit"
                className="w-full md:w-1/2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-400"
                disabled={isUploading}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <CircularProgress size={20} color="inherit" className="mr-2" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
}


























