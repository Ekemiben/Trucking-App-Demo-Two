import React from "react";
import BgImgOne from "/images/TimingDelivery.png";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const AboutSectionTwo = () => {
	return (
		<div className="bg-slate-200 border-2">
			<div className="h-auto overflow-y-auto bg-slate-200 mb-32 ">
				<div className="flex flex-row justify-evenly items-center max-h-96 mr-20 max-sm:flex-col max-sm:mr-0">
				
					<div className="m-auto ml-20 max-sm:ml-0 max-sm:w-[90%] max-sm:text-center max-sm:mt-10">
						<h2 className="text-2xl mb-3 font-bold">THE COMPANY PROMISES</h2>
						<p className="flex justify-center items-center max-w-72 text-gray-700 max-sm:max-w-full">
							As a contractor we promise to take care of all supply chain
							management, to make your shipments travel safe, fast and on time.{" "}
							<span className="text-red-600 text-4xl">
								<RocketLaunchIcon />
							</span>
						</p>
					</div>

				
					<div className="h-80 max-sm:h-auto max-sm:w-[90%] max-sm:mt-10 ">
						<img
							src={BgImgOne}
							alt="Company Promise"
							className="h-[100%] w-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutSectionTwo;