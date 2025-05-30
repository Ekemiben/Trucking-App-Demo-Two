// import React from "react";
import React, { useState } from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { EmailOutlined } from "@mui/icons-material";
import Imageone from "/images/contactUs.png";
 import { ToastContainer, toast } from 'react-toastify';
import { baseURL } from "../utils/constant";
 import axios from 'axios'



const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone_no: "",
		message: "",
	});


	const [errors, setErrors] = useState({
		name: "",
		email: "",
		phone_no: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
		setErrors({ ...errors, [id]: "" });
	};

	
	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};


	const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { name: "", email: "", phone_no: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
    }

    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
    } else if (!validateEmail(formData.email)) {
        newErrors.email = "Invalid email address";
        isValid = false;
    }

    if (!formData.phone_no.trim()) {
        newErrors.phone_no = "Number is required";
        isValid = false;
    }

    if (!formData.message.trim()) {
        newErrors.message = "Message is required";
        isValid = false;
    }

    if (!isValid) {
        setErrors(newErrors);
        return;
    }

    const api_url = import.meta.env.VITE_api_url;
    setIsSubmitting(true);

    try {
        const response = await axios.post(`${api_url}/api/contact`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        toast.success("Message sent successfully, the admin will contact you soonest!");
        
        // Reset form
        setFormData({ name: "", email: "", phone_no: "", message: "" });
        setErrors({ name: "", email: "", phone_no: "", message: "" });
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(
            error.response?.data?.message || "An error occurred. Please try again."
        );
    } finally {
        setIsSubmitting(false);
    }
};

	return (
		<div className="bg-slate-200">
			<div className="border-2">
				{/* Hero Section */}
				<div className="flex flex-col md:flex-row justify-center items-center w-full h-auto md:h-[400px] bg-sky-800 mt-0">
					<div className="flex flex-col md:flex-row mt-10 ml-10">
						<div className="flex flex-col px-4 md:px-10 py-8 md:py-16">
							<h1 className="text-white text-2xl md:text-4xl mb-4">
								We would love to hear from you!
							</h1>
							<p className="text-white text-sm md:text-base w-full md:w-[600px]">
								Have questions or need more information about our transportation
								system? We're here to help! Whether you're interested in hiring
								a truck, partnering with us, or simply seeking more details,
								feel free to reach out.
							</p>
						</div>
						<div className="mt-8 md:mt-0">
							<img
								src={Imageone}
								alt="Contact Image"
								className="object-contain h-48 md:h-72 w-full md:w-[100vw]"
							/>
						</div>
					</div>
				</div>

				{/* Contact Information and Form Section */}
				<div className="flex flex-col md:flex-row mt-10 md:mt-20 ml-4 md:ml-20 mr-4 md:mr-20 mb-16 md:mb-32">
					
					<div className="w-full md:w-1/2">
					
						<p className="text-2xl md:text-4xl mb-2 animate-blink-colors">
							Connect With Us!
						</p>
						<ul className="flex flex-col gap-y-5">
							{[
								{
									icon: <FacebookOutlinedIcon />,
									title: "FaceBook",
									detail: "SarnatruckingINCfacebook.com",
								},
								{
									icon: <LinkedInIcon />,
									title: "LinkedIn",
									detail: "SarnatruckingINCLinkedIn.com",
								},
								
								{
									icon: <PhoneForwardedIcon />,
									title: "Phone",
									detail: "559-835-8006",
								},
								{
									icon: <EmailOutlined />,
									title: "Email address",
									detail: "sarabmeet@sarnatrucking.com",
								},
								
								{
									icon: <AddHomeWorkOutlinedIcon />,
									title: "Address",
									detail: "7361 E SIMPSON AVE FRESNO, CA   93737-0042",
								},
							].map((item, index) => (
								<li
									key={index}
									className="h-16 md:h-20 bg-sky-800 w-full md:w-[80%] flex rounded-xl">
									<span className="flex flex-row items-center gap-x-3 text-white px-4 md:px-6">
										{item.icon}
										<span className="flex flex-col justify-start">
											<p className="text-sm md:text-base">{item.title}</p>
											<p className="text-xs md:text-sm">{item.detail}</p>
										</span>
									</span>
								</li>
							))}
						</ul>
					</div>

				
					<div className="bg-sky-900 w-full md:w-1/2 p-4 rounded-xl mt-8 md:mt-0">
					

						<form className="mt-4 md:mt-8" onSubmit={handleSubmit}>
						
							<div className="w-full px-4 md:px-8">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-white">
									Your name
								</label>
								<input
									type="text"
									id="name"
									value={formData.name}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 text-white border-2 border-white rounded-md shadow-sm bg-sky-950"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>

							<div className="w-full px-4 md:px-8 mt-4">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-white">
									Your email
								</label>
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 text-white border-2 border-white rounded-md shadow-sm bg-sky-950"
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>

							
							<div className="w-full px-4 md:px-8 mt-4">
								<label
									htmlFor="number"
									className="block text-sm font-medium text-white">
									Your number
								</label>
								<input
									type="text"
									id="phone_no"
									value={formData.phone_no}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 text-white border-2 border-white rounded-md shadow-sm bg-sky-950"
								/>
								{errors.phone_no && (
									<p className="text-red-500 text-sm mt-1">{errors.phone_no}</p>
								)}
							</div>

						
							<div className="mt-6 px-4 md:px-8">
								<label
									htmlFor="message"
									className="block text-sm font-medium text-white">
									Message
								</label>
								<textarea
									id="message"
									rows="4"
									value={formData.message}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border-2 border-white rounded-md shadow-sm bg-sky-950 text-white"></textarea>
								{errors.message && (
									<p className="text-red-500 text-sm mt-1">{errors.message}</p>
								)}
							</div>

						
							<div className="mt-6 p-4 md:p-6">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50">
									{isSubmitting ? "Sending..." : "Send Message"}
								</button>
								<ToastContainer />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;