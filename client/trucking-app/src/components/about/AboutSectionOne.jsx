
import React from "react";
import ImgOne from "/images/aboutusImg.png";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const AboutSectionOne = () => {
	return (
		<div className="z-10">
			<div className="flex flex-row bg-slate-200 max-sm:flex-col max-sm:w-full">
				<div className="border-2 w-[50%] mt-20 mb-20 ml-20 mr-20 max-sm:w-[90%] max-sm:mx-auto max-sm:mt-10 max-sm:mb-10">
					<img src={ImgOne} alt="Trucking Company" className="w-full" />
				</div>

				<div className="border-2 w-[50%] mt-20 mb-20 ml-20 mr-20 max-sm:w-[90%] max-sm:mx-auto max-sm:mt-0 max-sm:mb-10">
					<h2 className=" text-2xl font-bold lg:text-start sm:text-center max-sm:text-left md:text-center">
						WHY CHOOSE OUR COMPANY
					</h2>

					<div className="flex flex-col mt-5">
						<div className="flex flex-row gap-x-4">
							<span className="text-red-600">
								<CheckCircleOutlinedIcon />
							</span>
							<p className="text-lg font-medium">Fast Worldwide delivery</p>
						</div>
						<p className="text-sm ml-10 mr-10 mt-2 text-gray-700">
							From Europe to Australia, by air or sea? We offer fast, reliable
							and accurate worldwide delivery directly to your doors, factory
							and warehouses.
						</p>
					</div>

					<div className="flex flex-col mt-5">
						<div className="flex flex-row gap-x-4">
							<span className="text-red-600">
								<CheckCircleOutlinedIcon />
							</span>
							<p className="text-lg font-medium">
								End-to-end solution available
							</p>
						</div>
						<p className="text-sm ml-10 mr-10 mt-2 text-gray-700">
							From 2015 Trucking offers new service - we are now offering
							end-to-end solutions using multiple transportation means and
							covering all supply chain from the origin to the destination.
						</p>
					</div>

					<div className="flex flex-col mt-5">
						<div className="flex flex-row gap-x-4">
							<span className="text-red-600">
								<CheckCircleOutlinedIcon />
							</span>
							<p className="text-lg font-medium">Safety & Compliance</p>
						</div>
						<p className="text-sm ml-10 mr-10 mt-2 text-gray-700">
							Safety of your cargo is one of our top priorities. Every package
							is handled with most care by our trained and high skilled
							personnel. You can be sure that your cargo will travel and arrive
							safely.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutSectionOne;