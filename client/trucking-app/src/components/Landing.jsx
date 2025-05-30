import React from "react";
import truck1 from '/images/vanbg.png'
import { Link } from "react-router-dom"
import BgOurTeam from "/images/ourTeam.png"

const Landing = () => {
  return (
    <div className="relative py-16">
       <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url(${BgOurTeam})` }}
      ></div>

    <div className="flex lg:px-6   w-full flex-col-reverse  md:flex-row items-center justify-between gap-10 md:px-4    text-white h-[90vh] sm:w-[95%] relative">
       
      <div className="flex flex-col gap-4 flex-1 lg:ml-20 px-4">
        <h3 className="text-xs font-light sm:lg">The future of smart dispatching</h3>
        <h1 className="lg:text-4xl font-bold md:3xl sm:2xl">
          Sarna trucking INC is your smart, convenient and sure way of delivering your loads.
        </h1>
        {/* <h2 className="text-xl font-light">
          Want to get your goods delivered in time and in good condition? Talk to us today.
        </h2> */}
        <h2 className="text-xl font-light">
          Want to take a new step of success in your driving career? Talk to us today.
        </h2>
        <div className="flex flex-col md:flex-row  items-center gap-6">
          <button className="bg-red-600 hover:shadow-xl transition-shadow duration-300 text-white text-sm p-2 flex items-center justify-center lg:h-10 h-16 w-full lg:w-40 hover:bg-transparent hover:border-white hover:border-2 hover:text-white rounded-lg lg:rounded-none">
            <Link to="/driver-form">
            Apply Here
            </Link>
          </button>
          <div className="flex items-center justify-center border p-2 w-full h-16 lg:h-10 lg:w-40 hover:bg-red-600 rounded-lg lg:rounded-none">
           <Link to="/services">
           Our services
           </Link>
          </div>
        </div>
        </div>
        <div className="w-full">
      <img
        className="md:h-full md:w-full object-cover hover:scale-105 flex-1 lg:scale-105 "
        src={truck1} 
        alt="Trucking Service"
      />
        </div>
        </div>
      </div>
  );
};

export default Landing;
