import React from "react";
import ImgOne from "/images/ServiceTrOne.png";
import ImgTwo from "/images/all-in-a-one-truck.jpg";
import ImgThree from "/images/serviceWherehouse.png";
import ImgFour from "/images/freight.png";
import ImgFive from "/images/refrigerated-trucking.png";
import {Link} from 'react-router-dom'
import Testimonial from "../components/ClientTestimony";

import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Services = () => {
	 const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
	
	
	return (
		<div>
			

			<div className="relative lg:h-screen sm:h-[500px] flex items-center justify-center text-white text-center">
				<img
					src={ImgTwo}
					alt="Trucking Services"
					className="absolute inset-0 w-full h-[690px]  object-cover "
				/>
				<div id="drive-busines" className="absolute inset-0 bg-black bg-opacity-50 h-[690px]"></div>
				<div className="relative z-10 max-w-4xl px-4 py-10">
					<h1 className="text-5xl font-bold mb-6">
						Driving Your Business Forward
					</h1>
					<p className="text-xl mb-8">
						From local deliveries to nationwide logistics, we provide reliable,
						efficient, and cost-effective trucking solutions tailored to your
						needs. Let us handle the heavy lifting while you focus on growing
						your business.
					</p>
					<a
						href="#our-services"
						className="bg-transparent border text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300">
						Discover Our Services
					</a>
				</div>
			</div>
			

			<section id="our-services" className="py-36 lg:py-10 bg-gray-50">
				<div className="container mx-auto px-6 mt-56 lg:mt-32">
					<h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
					<p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
						We offer a comprehensive range of trucking and logistics services
						designed to meet the unique needs of businesses across industries.
						Whether you’re shipping locally or across the country, we’ve got you
						covered.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div id="service" className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
							<img
								src={ImgFour}
								alt="Freight Transport"
								className="w-full h-48 object-contain rounded-lg mb-6"
							/>
							<h3 className="text-2xl font-bold mb-4">Freight Transport</h3>
							<p className="text-gray-600">
								We specialize in transporting goods of all sizes, from small
								packages to full truckloads. Our fleet of modern trucks ensures
								your cargo arrives safely and on time, every time.
							</p>
							{/* <a
								href="#freight-transport"
								className="text-blue-600 font-semibold mt-4 inline-block hover:underline">
								Learn More →
							</a> */}
						</div>

						<div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 ">
							<img
								src={ImgFive}
								alt="Refrigerated Trucking"
								className="w-full h-48 object-contain rounded-lg mb-6"
							/>
							<h3 className="text-2xl font-bold mb-4">Dry Van</h3>
							<p className="text-gray-600">
							Need to transport your goods with less time? Our dry van trucks provide secure and reliable transportation to ensure your products arrive safely and on time.
							</p>
							{/* <p className="text-gray-600">
								Need to transport perishable goods? Our refrigerated trucks
								maintain optimal temperatures to ensure your products stay fresh
								and safe throughout the journey.
							</p> */}
							{/* <a
								href="#refrigerated-trucking"
								className="text-blue-600 font-semibold mt-4 inline-block hover:underline">
								Learn More →
							</a> */}
						</div>
{/* 
						<div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
							<img
								src={ImgThree}
								alt="Warehousing"
								className="w-full h-48 object-cover rounded-lg mb-6"
							/>
							<h3 className="text-2xl font-bold mb-4">Warehousing</h3>
							<p className="text-gray-600">
								Our secure and scalable warehousing solutions provide the
								perfect storage for your goods. With 24/7 monitoring, your
								inventory is always safe and accessible.
							</p>
							
						</div> */}


					</div>
				</div>
			</section>

			<section className="relative h-screen overflow-y-auto md:overflow-y-hidden border-2 ">
				<div
					className="fixed inset-0 bg-center bg-no-repeat bg-contain -z-10"
					style={{ backgroundImage:`url(${ImgOne})` }}></div>

				<div id="technology" className="relative z-10 flex flex-col justify-center items-center min-h-96 h-[606px]  max-sm:h-[850px] max-sm:min-h-[850px] max-sm:px-4 lg:h-[674px] text-white bg-black bg-opacity-50">

					<div className="container mx-auto px-6">
						<h2 className="text-4xl font-bold text-center mb-4">
							Why Choose Us?
						</h2>
						<p className="text-xl text-center mb-16 max-w-2xl mx-auto font-semibold">
							At IFBC Trucking Services, we go the extra mile to ensure your logistics needs
							are met with precision, care, and efficiency. Here’s what sets us
							apart:
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<h3 className="text-2xl font-bold mb-4">Experienced Team</h3>
								<p className=" font-semibold">
									With over 10 years in the industry, our team of logistics
									experts knows how to handle even the most complex shipping
									challenges.
								</p>
							</div>

							<div className="text-center">
								<h3 className="text-2xl font-bold mb-4">Advanced Technology</h3>
								{/* <p className="font-semibold">
									We use cutting-edge tracking and logistics software to provide
									real-time updates and ensure seamless operations.
								</p> */}
								<p className="font-semibold">
								We leverage advanced technology and smart routing technology to optimize efficiency and ensure smooth, reliable deliveries.
								</p>
							</div>

							<div className="text-center">
								<h3 className="text-2xl font-bold mb-4">
									Customer-Centric Approach
								</h3>
								<p className="font-semibold ">
									Your success is our priority. We work closely with you to
									create customized solutions that fit your business needs.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			

			{/* <TestimonialCarousel /> */}
			<div id="testimony">< Testimonial /></div>
			

			<section className="py-20 bg-gray-50 text-gray-600 text-center ">
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold mb-6">
						Ready to Elevate Your Logistics?
					</h2>
					<p className="text-xl mb-8">
						Let us take the stress out of shipping. Contact us today to get
						started with our reliable and efficient trucking services.
					</p>
					<Link to="/contact">
					<a href="#contact" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 hover:text-white transition duration-300">
            Contact Us
						</a>
						</Link>
				</div>
			</section>
		</div>
	);
};



export default Services