import React from "react";
import { motion } from "framer-motion";
import truck2 from '/images/fabook-truck.jpg'; 

import {
  WatchLater,
  FlagCircleOutlined ,
  CallMade,
  RocketOutlined,
  LocalShipping,
  ShareLocationOutlined,
  HealthAndSafetyOutlined,
} from "@mui/icons-material";
import ClientTestimony from "./ClientTestimony";
import { Link } from "react-router-dom";

const Ads = () => {
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="px-10 md:px-32 py-10 text-blue-950">
      <h3 className="text-center font-medium text-2xl mb-8">
        Choose us for the following reasons
      </h3>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Left Section */}
        <motion.div
          className="flex flex-col gap-5 flex-1"
          initial="hiddenLeft"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          variants={cardVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="font-semibold text-4xl leading-tight">
            Dependable and safe cargo delivery
          </h2>
          <div className="flex justify-between items-center">
            <h4 className="flex-1 text-sm">
              Transportation and logistics solution, preserve your time
            </h4>
            <WatchLater
              style={{
                fontSize: "100px",
                paddingRight: "50px",
                color: "black",
              }}
            />
          </div>
        </motion.div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 flex-1">
          {[
            {
              title: "Quick Delivery",
              icon: <RocketOutlined style={{ fontSize: "70px", color: " #E53935" }} />,
              delay: 0.2,
            },
            {
              title: "Trustworthy",
              icon: <LocalShipping style={{ fontSize: "70px", color: " #E53935" }} />,
              delay: 0.4,
            },
            {
              title: "Tracking Service",
              icon: <ShareLocationOutlined style={{ fontSize: "70px", color: " #E53935" }} />,
              delay: 0.6,
            },
            {
              title: "Safety",
              icon: <HealthAndSafetyOutlined style={{ fontSize: "70px", color: " #E53935" }} />,
              delay: 0.8,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center md:w-4/5 bg-gray-100 shadow-lg rounded-2xl p-6"
              initial={index % 2 === 0 ? "hiddenRight" : "hiddenLeft"}
              whileInView="visible"
              transition={{ duration: 0.6, delay: item.delay }}
              variants={cardVariants}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <div className="flex items-center gap-3">
                  <h4 className="text-xs">Explore now</h4>
                  <div className="w-6 h-6 flex items-center justify-center bg-red-600 rounded-full">
                    <CallMade style={{ fontSize: "12px", color: "white" }} />
                  </div>
                </div>
              </div>
              {item.icon}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimony Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start mt-4 text-blue-950">
        <motion.div
          className="flex-1"
          initial="hiddenLeft"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.8 }}
          variants={cardVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* <img
            className="object-cover hover:scale-105 w-full lg:w-full"
            src={truck2 } 
            alt="Client Testimony"
          /> */}
        </motion.div>



        <div className='flex flex-col md:flex-row justify-between gap-4 items-start mt-4 text-blue-950 '>
        <motion.div className='flex-1'
         initial="hiddenLeft"
         whileInView="visible"
         transition={{ duration: 0.6, delay: 0.8 }}
         variants={cardVariants}
         viewport={{ once: false, amount: 0.3 }}

        >
          <img
              // className="object-cover hover:scale-105 w-200"
              className="object-fit hover:scale-105 w-[500px] lg:h-200"
            src={truck2}
            alt="truck"
          />
        </motion.div>

        <motion.div
          className="flex-1"
          initial="hiddenRight"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.8 }}
          variants={cardVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-left mb-4">
            Smooth Transportation system linked to the globe
          </h2>
          <h4 className="text-xs font-extralight text-left mb-6">
            At trucking app, we prioritze customer satisfaction, healthy and
            safe state of goods. We provide services that keep our clients
            coming back.
          </h4>
          <div className="flex justify-between items-center gap-4 mb-6">
            <div>
              <ShareLocationOutlined className="mb-4" />
              <h3 className="font-bold">Our mission</h3>
              <h4 className="text-xs font-light">
                Our mission is to provide the most reliable trucking services to
                clients no matter their destination, and to ensure they're
                satisfied.
              </h4>
            </div>
            <div>
              <FlagCircleOutlined className="mb-4" />
              <h3 className="font-bold">Our Goal</h3>
              <h4 className="text-xs font-light">
                We are dedicated to advancing trucking logistics with technology
                and pushing the limits of trucking.
              </h4>
            </div>
          </div>
          <button className="bg-red-600 hover:shadow-xl text-white text-sm mt-2 transition-shadow duration-300 p-2 flex items-center justify-center w-40">
             <Link to="/about">Know more about us</Link>
          </button>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Ads;
