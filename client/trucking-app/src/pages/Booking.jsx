import { useState } from "react";
import ImageOne from "/images/bookingtruck.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux"

const BookingForm = () => {
    const [formData, setFormData] = useState({
        pickupLocation: "",
        dropoffLocation: "",
        date: "",
        time: "",
        truckType: "",
        loadWeight: "",
        loadType: "",
        specialInstructions: "",
        paymentMethod: "",
    });

    const [errors, setErrors] = useState({});
    const currentUser = useSelector(state=>state.user?.currentUser)
 const token = currentUser?.accessToken
    const truckTypes = ["Mini Truck", "Cargo Van", "Flatbed", "Trailer"];
    const loadTypes = ["Fragile", "Liquid", "Solid", "Perishable"];
    const paymentMethods = ["Credit Card", "Cash"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user starts typing
    };

    const validateForm = () => {
        const newErrors = {};
        for (let key in formData) {
            if (key !== "specialInstructions" && !formData[key]) {
                newErrors[key] = `Please fill in the ${key.replace(/([A-Z])/g, " $1")}`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
   
    const api_url = import.meta.env.VITE_api_url;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post(`${api_url}/api/truckbooking/create`, {...formData}, {
                headers:{
                    Authorization: `Bearer ${token}`,
                    
                }
            });
            toast.success("Truck Booking Submitted Successfully!");
            console.log("Success:", response.data);
        } catch (error) {
            toast.error("Error submitting booking. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="mx-auto p-6 bg-sky-950 shadow-lg h-full mt-20 mb-20">
            <div className="grid lg:grid-cols-2 p-10 max-sm:p-0 max-md:p-0 sm:grid-cols-1 sm:w-full gap-6">
               
                <div className="flex justify-center items-center w-full">
                    <img
                        src={ImageOne}
                        alt="Truck"
                        className="m-auto max-w-full sm:w-[80%] md:w-[70%]"
                    />
                </div>

              
                <div className="flex flex-col justify-center items-center bg-white w-full sm:w-full md:w-full max-sm:w-[350px] lg:w-[600px] shadow-2xl mx-auto p-6 border-2">
                    <h2 className="text-xl font-bold mb-4 text-center text-orange-500">
                        Booking Form <span className="text-3xl sm:text-6xl">🚚</span>
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4 gap-3 mb-5 rounded-md sm:w-[100%]">
                      
                        <div className="mx-2 sm:mx-6">
                            <label className="block text-sm text-gray-600">Pickup Location</label>
                            <input
                                type="text"
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                                placeholder="Enter pickup location"
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm"
                            />
                            {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation}</p>}
                        </div>

                      
                        <div className="mx-2 sm:mx-6">
                            <label className="block text-sm text-gray-600">Drop-off Location</label>
                            <input
                                type="text"
                                name="dropoffLocation"
                                value={formData.dropoffLocation}
                                onChange={handleChange}
                                placeholder="Enter drop-off location"
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm"
                            />
                            {errors.dropoffLocation && <p className="text-red-500 text-sm">{errors.dropoffLocation}</p>}
                        </div>

                     
                        <div className="flex flex-col sm:flex-row sm:space-x-4 mx-2 sm:mx-6">
                            <div className="w-full sm:w-1/2">
                                <label className="text-sm text-gray-600">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm text-gray-600"
                                />
                                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                            </div>
                            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                                <label className="block text-sm text-gray-600">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm text-gray-600"
                                />
                                {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                            </div>
                        </div>

                      
                        <div className="mx-2 sm:mx-6">
                            <label className="block text-sm text-gray-600">Truck Type</label>
                            <select
                                name="truckType"
                                value={formData.truckType}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm text-gray-600"
                            >
                                <option value="">Select Truck Type</option>
                                {truckTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.truckType && <p className="text-red-500 text-sm">{errors.truckType}</p>}
                        </div>

                       
                        <div className="mx-2 sm:mx-6">
                            <label className="block text-sm text-gray-600">Load Weight (kg/tons)</label>
                            <input
                                type="number"
                                name="loadWeight"
                                value={formData.loadWeight}
                                onChange={handleChange}
                                placeholder="Enter load weight"
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm text-gray-600"
                            />
                            {errors.loadWeight && <p className="text-red-500 text-sm">{errors.loadWeight}</p>}
                        </div>

                       
                        <div className="mx-2 sm:mx-6">
                            <label className="block text-sm text-gray-600">Load Type</label>
                            <select
                                name="loadType"
                                value={formData.loadType}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm text-gray-600"
                            >
                                <option value="">Select Load Type</option>
                                {loadTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.loadType && <p className="text-red-500 text-sm">{errors.loadType}</p>}
                        </div>

                       
                        <div className="mx-2 sm:mx-6">
                            <label className="block text-sm text-gray-600">Special Instructions</label>
                            <textarea
                                name="specialInstructions"
                                value={formData.specialInstructions}
                                onChange={handleChange}
                                placeholder="Any additional details..."
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm"
                                rows="3"
                            ></textarea>
                        </div>

                        
                        <div className="mx-2 sm:mx-6">
                            <label className="text-sm text-gray-600">Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 text-sm text-gray-600"
                            >
                                <option value="">Select Payment Method</option>
                                {paymentMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
                                ))}
                            </select>
                            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
                        </div>

                       
                        <button
                            type="submit"
                            className="w-[92%] mx-2 sm:mx-6 bg-red-600 text-white py-2 rounded-md hover:bg-red-800 transition mb-5"
                        >
                            Book Truck
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BookingForm;