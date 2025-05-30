import React from "react";
import { Data } from "./Dummy.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Trucks = () => {
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="px-10 md:px-32 py-4 bg-slate-200">
      <motion.div
        className=" flex justify-between items-center mb-6"
        initial="hiddenRight"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0.8 }}
        variants={cardVariants}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="font-bold text-2xl">Our trucks</h2>
        <div className="bg-red-600 p-2 text-white w-40 flex justify-center items-center">
          view all
        </div>
      </motion.div>
      <div>
        {Data.map((truck) => {
          return (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 m-2">
              <motion.div
                className="flex-1"
                initial="hiddenLeft"
                whileInView="visible"
                transition={{ duration: 0.6, delay: 0.8 }}
                variants={cardVariants}
                viewport={{ once: false, amount: 0.3 }}
              >
                <img
                  src={truck.Image}
                  alt={truck.truck_no}
                  className="object-cover w-200 hover:scale-105"
                />
              </motion.div>

              <motion.div
                className="flex-1 object-cover bg-gray-100 shadow-lg   p-4 rounded-lg text-gray-700 flex gap-4 flex-col items-start justify-center"
                initial="hiddenRight"
                whileInView="visible"
                transition={{ duration: 0.6, delay: 0.8 }}
                variants={cardVariants}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h2 className="text-xl italic">{truck.desc}</h2>
                <h3 className="text-xl">{truck.weight}</h3>
                <h3 className="text-sm">{truck.truck_no}</h3>
                <button className="bg-red-600 hover:shadow-xl transition-shadow duration-300 text-white text-sm p-2 flex items-center justify-center w-40">
                  <Link to="/booking"> Book now</Link>
                 
                </button>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trucks;
