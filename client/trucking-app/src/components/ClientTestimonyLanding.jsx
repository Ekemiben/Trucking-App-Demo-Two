
import ImgOne from "/images/indian-one.jpg";
import ImgTwo from "/images/ImgWoman.jpeg";
import ImgThree from "/images/ImgMan.jpeg";
import ImgFour from "/images/CEO-one.jpg";
import ImgSix from "/images/CEO-Thre.jpg";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

import React, { useState } from "react";

const testimonials = [
  {
	id: 1,
	image: ImgOne,
	title: "Excellent service provided on schedule,",
	message:
	  "From booking to delivery, everything was smooth & stress-free I've never had such a seamless shipping experience. You guys are lifesavers!",
	name: "Daniel T.",
	nationality: "Arizona",
  },
  {
	id: 2,
	image: ImgTwo,
	title: "Great work and very professional",
	message:
	  "Best customer support and response time I have ever seen... This trucking app saved my business! Quick bookings & real-time tracking! a trucking service I can trust! Transparent pricing & great drivers!",
	name: "Sophia.",
	nationality: "Georgia",
  },
  {
	id: 3,
	image: ImgThree,
	title: "Highly recommend their services",
	message:
	  "Affordable, efficient, and professional. Highly recommend! Exceptional service! My shipment arrived on time and in perfect condition!",
	name: "Mark H.",
	nationality: "Florider",
  },
  {
	id: 4,
	image: ImgFour,
	title: "Highly recommend their services",
	message:
	  "Their refrigerated trucking service saved our business. Our products always arrive fresh and on time. Thank you!",
	name: "Peter Smith.",
	nationality: "California",
  },
  {
	id: 5,
	image: ImgSix,
	title: "Highly recommend their services",
	message:
	  "The team at trucking is incredible. They've been handling our shipments for years, and we've never had a single issue. Highly recommend!",
	name: "Patricia Howel.",
	nationality: "Texas",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
	setCurrentIndex((prevIndex) =>
	  prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
	);
  };

  const goToNext = () => {
	setCurrentIndex((prevIndex) =>
	  prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
	);
  };

  // Get the current testimonial for mobile or 3 testimonials for desktop
  const getVisibleTestimonials = () => {
	if (window.innerWidth < 768) {
	  // Mobile - return single testimonial
	  return [testimonials[currentIndex]];
	} else {
	  // Desktop - return 3 testimonials
	  const visible = [];
	  for (let i = 0; i < 3; i++) {
		const index = (currentIndex + i) % testimonials.length;
		visible.push(testimonials[index]);
	  }
	  return visible;
	}
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
	<div className="flex flex-col items-center justify-center p-4 md:p-8 bg-sky-950 h-auto md:min-h-[450px] lg:w-[100vw] mb-20">
	  <div className="pt-10 md:pt-20 pb-6 md:pb-10 flex flex-col justify-center items-center">
		<div className="flex flex-col justify-center items-center w-full md:w-[700px]">
		  <h1 className="text-3xl md:text-4xl text-white font-bold text-center mb-4">
			What Our Clients Say
		  </h1>
		  <p className="text-lg md:text-xl text-white text-center mb-8 md:mb-16 max-w-2xl mx-auto">
			Don't just take our word for it. Here's what our clients have to say
			about working with us
		  </p>
		</div>
		<div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-4 w-full h-auto">
		  {visibleTestimonials.map((testimonial) => (
			<div
			  key={testimonial.id}
			  className="relative flex flex-col w-full  h-56 bg-cyan-900 p-4 rounded-lg"
			>
			  <div className="px-3">
				<p className="text-lg md:text-xl italic text-white mt-1">
				  <span className="text-orange text-xl md:text-2xl">"</span>
				  {testimonial.title}
				  <span className="text-orange text-xl md:text-2xl">"</span>
				</p>
				<p className="text-sm mt-2 text-white line-clamp-4">
				  - {testimonial.message}
				</p>
				<div>
				  <p className="text-white text-sm mt-3 md:mt-5">
					{testimonial.name}
				  </p>
				  <p className="text-sm text-orange">
					{testimonial.nationality}
				  </p>
				</div>
			  </div>
			</div>
		  ))}
		</div>
	  </div>
	  <div className="flex items-center justify-center mt-6 mb-6 md:mt-8 md:mb-8">
		<div
		  onClick={goToPrevious}
		  className="text-red-600 cursor-pointer bg-white rounded-full p-2 mr-4 hover:bg-gray-200 transition"
		>
		  <KeyboardBackspaceOutlinedIcon />
		</div>
		<div
		  onClick={goToNext}
		  className="cursor-pointer text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
		>
		  <EastOutlinedIcon />
		</div>
	  </div>
	</div>
  );
};

export default Testimonial;
