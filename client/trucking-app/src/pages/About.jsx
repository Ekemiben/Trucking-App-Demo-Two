import React from "react";
import AboutUs from "../components/about/AboutSectionOne";
import BgImgtWO from "/images/bookingImg.PNG";

import AboutSection from "../components/about/AboutSectionTwo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OurTeam from "../components/OurTeam";

const About = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const element = document.querySelector(location.hash);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location]);

	return (
		<div id="about-us" className="h-auto ">
			<div id="our-company" className="border-2">
				<div className="relative h-screen  ">
					{/* Background Image */}
					<div
						className="fixed inset-0 bg-center bg-no-repeat bg-fit -z-10"
						style={{ backgroundImage: `url(${BgImgtWO}) ` }}></div>

					{/* Content Overlay */}
					{/* <div className="relative z-10 flex flex-col justify-center items-center min-h-96 h-[606px]  max-sm:h-[850px] max-sm:min-h-[850px] max-sm:px-4 text-white bg-black bg-opacity-50"> */}

{/* 
					<div className="relative z-10 flex flex-col justify-center items-center min-h-[400px] h-full py-16 px-4 sm:min-h-[500px] sm:h-[606px] lg:h-[674px] md:px-8 lg:px-16 text-white bg-black bg-opacity-50"> */}

					<div className="relative z-10 flex flex-col justify-center items-center  h-full py-16 px-4 md:px-8 lg:px-16 text-white bg-black bg-opacity-50">
						<p className="text-5xl font-bold text-center px-4 max-w-[70%]">
							Providing first class logistics services worldwide.
						</p>
						<p className="mt-4 text-center px-4 max-w-2xl text-xl font-semibold">
							In IFBC Trucking Services, we deliver excellent service to our
							clients in a timely manner and ensure that the product is in good
							condition. We place our customers as the top priority in our daily
							business schedule.
						</p>
					</div>
				</div>
				<div id="logistic">
					<AboutUs />
				</div>
				<OurTeam />
				<div id="promises">
					<AboutSection />
				</div>
			</div>
		</div>
	);
};

export default About;
