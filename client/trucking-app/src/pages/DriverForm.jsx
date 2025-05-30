// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// export default function DriverForm() {
// 	const [formData, setFormData] = useState({
// 		fullName: "",
// 		email: "",
// 		phone: "",
// 		licenseNumber: "",
// 		experience: "",
// 		truckType: "",
// 		address: "",
// 		city: "",
// 		state: "",
// 		zipCode: "",
// 		resume: null,
// 	});
//     const api_url = import.meta.env.VITE_api_url;
// 	const [errors, setErrors] = useState({});

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 		setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user starts typing
// 	};

// 	const validateForm = () => {
// 		const newErrors = {};
// 		for (let key in formData) {
// 			if (key !== "specialInstructions" && !formData[key]) {
// 				newErrors[key] = `Please fill in the ${key
// 					.replace(/([A-Z])/g, " $1")
// 					.toLowerCase()}`;
// 			}
// 		}
// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!validateForm()) {
// 			toast.error("Please fill in all required fields.");
// 			return;
// 		}

// 		try {
// 			const response = await axios.post(`${api_url}/api/application`, formData);
// 			 console.log("Success:", response.data);
// 			toast.success(
// 				"Application Submitted Successfully!",
// 				setTimeout((window.location = "/"), 6000)
// 			);
			
			
// 		} catch (error) {
// 			toast.error("Error submitting application. Please try again.");
// 			console.error("Error:", error);
// 		}
// 	};

// 	return (
// 		<div className="flex justify-center w-full">
// 			<div className="lg:w-[71%] flex flex-col justify-center items-center lg:rounded-2xl lg:mt-20 mb-20 border-2 bg-gray-50 sm:w-full md:w-[90%]">
// 				<h1 className="mt-10 px-10">
// 					Please make sure you fill all your details correctly!
// 				</h1>

// 				<div className="w-[90%] flex justify-center items-center gap-x-10">
// 					<form
// 						onSubmit={handleSubmit}
// 						className="flex flex-col bg-gray-50 shadow-xl mb-10 w-full">
						
// 						<div className="flex flex-col lg:flex-row gap-x-10 space-y-4 p-6 w-full sm:flex-col md:flex-col ">
						
// 							<div className="lg:w-[50%] mb-10 mt-4 sm:w-full md:w-full">
								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Full Name <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="text"
// 										name="fullName"
// 										value={formData.fullName}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.fullName && (
// 										<p className="text-red-500 text-sm">{errors.fullName}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Email <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="email"
// 										name="email"
// 										value={formData.email}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.email && (
// 										<p className="text-red-500 text-sm">{errors.email}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Phone <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="tel"
// 										name="phone"
// 										value={formData.phone}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.phone && (
// 										<p className="text-red-500 text-sm">{errors.phone}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Driver's License Number{" "}
// 										<span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="text"
// 										name="licenseNumber"
// 										value={formData.licenseNumber}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.licenseNumber && (
// 										<p className="text-red-500 text-sm">
// 											{errors.licenseNumber}
// 										</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Years of Experience <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="number"
// 										name="experience"
// 										value={formData.experience}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.experience && (
// 										<p className="text-red-500 text-sm">{errors.experience}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Preferred Truck Type <span className="text-red-500">*</span>
// 									</label>
// 									<select
// 										name="truckType"
// 										value={formData.truckType}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500">
// 										<option value="">Select Truck Type</option>
// 										<option value="Flatbed">Flatbed</option>
// 										<option value="Refrigerated">Refrigerated</option>
// 										<option value="Container">Container</option>
// 										<option value="Tanker">Tanker</option>
// 									</select>
// 									{errors.truckType && (
// 										<p className="text-red-500 text-sm">{errors.truckType}</p>
// 									)}
// 								</div>
// 							</div>

// 							{/* Right Column */}
// 							<div className="lg:w-[50%] mb-10 sm:w-full md:w-full">
								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Address <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="text"
// 										name="address"
// 										value={formData.address}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.address && (
// 										<p className="text-red-500 text-sm">{errors.address}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										City <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="text"
// 										name="city"
// 										value={formData.city}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.city && (
// 										<p className="text-red-500 text-sm">{errors.city}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										State <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="text"
// 										name="state"
// 										value={formData.state}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.state && (
// 										<p className="text-red-500 text-sm">{errors.state}</p>
// 									)}
// 								</div>

							
// 								<div className="mb-3">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Zip Code <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="text"
// 										name="zipCode"
// 										value={formData.zipCode}
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 									/>
// 									{errors.zipCode && (
// 										<p className="text-red-500 text-sm">{errors.zipCode}</p>
// 									)}
// 								</div>

								
// 								<div className="mb-8">
// 									<label className="block text-sm font-medium text-gray-500">
// 										Upload Resume <span className="text-red-500">*</span>
// 									</label>
// 									<input
// 										type="file"
// 										name="resume"
// 										onChange={handleChange}
// 										className="mt-1 p-2 w-full border rounded-md text-gray-500"
// 										accept=".pdf,.doc,.docx"
// 									/>
// 									{errors.resume && (
// 										<p className="text-red-500 text-sm">{errors.resume}</p>
// 									)}
// 								</div>
// 							</div>
// 						</div>

						
// 						<div className="w-full px-6 pb-6 flex flex-row justify-center items-center">
// 							<button
// 								type="submit"
// 								className="w-[50%]  bg-red-600 text-white p-2 rounded-md hover:bg-red-700">
// 								Submit
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 			<ToastContainer />
// 		</div>
// 	);
// }




















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
//     resumeUrl: null,
//     resumePublicId: null
//   });

//   const [isUploading, setIsUploading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const api_url = import.meta.env.VITE_api_url;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate PDF file
//     if (file.type !== 'application/pdf') {
//       setErrors({...errors, resume: 'Please upload a PDF file'});
//       return;
//     }

//     setIsUploading(true);
//     setErrors({...errors, resume: ''});

//     const formData = new FormData();
//     formData.append('pdf', file);

//     try {
//       const response = await axios.post(`${api_url}/api/application`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       setFormData(prev => ({
//         ...prev,
//         resumeUrl: response.data.resumeUrl,
//         resumePublicId: response.data.resumePublicId
//       }));
      
//     } catch (err) {
//       console.error('Upload failed:', err);
//       setErrors({...errors, resume: 'Upload failed. Please try again.'});
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     for (let key in formData) {
//       if (key !== "specialInstructions" && !formData[key]) {
//         newErrors[key] = `Please fill in the ${key
//           .replace(/([A-Z])/g, " $1")
//           .toLowerCase()}`;
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${api_url}/api/application`, formData);
//       toast.success("Application Submitted Successfully!");
//       setTimeout(() => window.location = "/", 3000);
//     } catch (error) {
//       toast.error("Error submitting application. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center w-full">
//       <div className="lg:w-[71%] flex flex-col justify-center items-center lg:rounded-2xl lg:mt-20 mb-20 border-2 bg-gray-50 sm:w-full md:w-[90%]">
//         <h1 className="mt-10 px-10">
//           Please make sure you fill all your details correctly!
//         </h1>

//         <div className="w-[90%] flex justify-center items-center gap-x-10">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col bg-gray-50 shadow-xl mb-10 w-full">
            
//             <div className="flex flex-col lg:flex-row gap-x-10 space-y-4 p-6 w-full sm:flex-col md:flex-col ">
            
//               <div className="lg:w-[50%] mb-10 mt-4 sm:w-full md:w-full">
                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.fullName && (
//                     <p className="text-red-500 text-sm">{errors.fullName}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm">{errors.email}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.phone && (
//                     <p className="text-red-500 text-sm">{errors.phone}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Driver's License Number{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="licenseNumber"
//                     value={formData.licenseNumber}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.licenseNumber && (
//                     <p className="text-red-500 text-sm">
//                       {errors.licenseNumber}
//                     </p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Years of Experience <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="experience"
//                     value={formData.experience}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.experience && (
//                     <p className="text-red-500 text-sm">{errors.experience}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Preferred Truck Type <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="truckType"
//                     value={formData.truckType}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500">
//                     <option value="">Select Truck Type</option>
//                     <option value="Flatbed">Flatbed</option>
//                     <option value="Refrigerated">Refrigerated</option>
//                     <option value="Container">Container</option>
//                     <option value="Tanker">Tanker</option>
//                   </select>
//                   {errors.truckType && (
//                     <p className="text-red-500 text-sm">{errors.truckType}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="lg:w-[50%] mb-10 sm:w-full md:w-full">
                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.address && (
//                     <p className="text-red-500 text-sm">{errors.address}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.city && (
//                     <p className="text-red-500 text-sm">{errors.city}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     State <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.state && (
//                     <p className="text-red-500 text-sm">{errors.state}</p>
//                   )}
//                 </div>

              
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Zip Code <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleChange}
//                     className="mt-1 p-2 w-full border rounded-md text-gray-500"
//                   />
//                   {errors.zipCode && (
//                     <p className="text-red-500 text-sm">{errors.zipCode}</p>
//                   )}
//                 </div>

                
//                 <div className="mb-8">
//                   <label className="block text-sm font-medium text-gray-500">
//                     Upload Resume (PDF only) <span className="text-red-500">*</span>
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       accept="application/pdf"
//                       style={{ display: 'none' }}
//                       id="resume-upload"
//                       type="file"
//                       onChange={handleFileUpload}
//                     />
//                     <label htmlFor="resume-upload">
//                       <Button
//                         variant="outlined"
//                         component="span"
//                         startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
//                         disabled={isUploading}
//                         fullWidth
//                       >
//                         {formData.resumeUrl ? 'Resume Uploaded' : 'Upload Resume'}
//                       </Button>
//                     </label>
//                     {errors.resume && (
//                       <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                         {errors.resume}
//                       </Typography>
//                     )}
//                     {formData.resumeUrl && (
//                       <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
//                         Resume successfully uploaded
//                       </Typography>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//             <div className="w-full px-6 pb-6 flex flex-row justify-center items-center">
//               <button
//                 type="submit"
//                 className="w-[50%] bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
//                 disabled={isUploading}>
//                 {isUploading ? 'Processing...' : 'Submit Application'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
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
        <h1 className="mt-10 px-10 text-xl font-semibold">
          Please make sure you fill all your details correctly!
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
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
//       'city', 'state', 'zipCode'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         const fieldName = field.replace(/([A-Z])/g, " $1").toLowerCase();
//         newErrors[field] = `Please provide your ${fieldName}`;
//       }
//     });

//     // Special validation for resume
//     if (!formData.resume) {
//       newErrors.resume = "Please upload your resume";
//     }

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
//       const formDataToSend = new FormData();
      
//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'resume') {
//           formDataToSend.append('pdf', formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       const response = await axios.post(
//         `${api_url}/api/application`,
//         formDataToSend,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data) {
//         toast.success("Application submitted successfully!");
//         // Reset form after successful submission
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           licenseNumber: "",
//           experience: "",
//           truckType: "",
//           address: "",
//           city: "",
//           state: "",
//           zipCode: "",
//           resume: null
//         });
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       let errorMessage = "Error submitting application";
      
//       if (error.response) {
//         if (error.response.data.errorDetails) {
//           console.error("Detailed error:", error.response.data.errorDetails);
//         }
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
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
//                         color="red"
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














