import React from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";
import ScholarshipCard from "./ScholarshipCard";
import bannerImg from "../assets/bannerImg.jpeg";

const HeroBanner = () => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
     
        staggerChildren: 0.1,
        delayChildren: 0.2, 
      },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };


  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.4, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, x: 50 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        delay: 0.6, 
      },
    },
  };

  return (
    
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <motion.div
          className="lg:grid lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-10 lg:mb-0">
            
            <motion.h1
              className="text-5xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
              variants={itemVariants} // Apply item variants
            >
              The smartest way to <br />
              <span className=" text-green-800  italic font-serif">
                establish a donor-advised scholarship
              </span>
            </motion.h1>

            {/* Animated Paragraph */}
            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              variants={itemVariants} // Apply item variants
            >
              We help conservative- and libertarian-minded donors honor and
              protect their legacy through the creation of donor-advised
              scholarship funds.
            </motion.p>

            {/* Animated Buttons Group - Use a motion.div wrapper */}
            <motion.div className="flex space-x-4" variants={itemVariants}>
              <button className="px-6 py-3 text-base font-semibold bg-green-800 text-white rounded-md shadow-md hover:bg-green-900 transition duration-300">
                Create a Scholarship
              </button>
              <button className="px-6 py-3 text-base font-semibold border-2 border-gray-300 text-gray-700 rounded-md hover:border-gray-500 transition duration-300">
                Apply for Scholarships
              </button>
            </motion.div>
          </div>

          {/* Animated Image and Card Container */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Animated Image */}
            <motion.img
              className="rounded-lg h-150 object-cover shadow-2xl"
              src={bannerImg}
              alt="People shaking hands over a deal" // Always include an alt tag for images!
              variants={imageVariants} // Apply image variants
            />

            {/* Scholarship Card Overlay - Animated */}
            <motion.div
              className="absolute -bottom-4 lg:-right-4 right-0 transform translate-y-1/2 lg:translate-y-0 lg:translate-x-1/4"
              variants={cardVariants} // Apply card variants
            >
              <ScholarshipCard />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;