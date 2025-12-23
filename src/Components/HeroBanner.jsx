import React from "react";
import { motion } from "framer-motion";
import BannerCard from "../Components/BannerCard";
import bannerImg from "../assets/bannerImg.jpeg";

const HeroBanner = () => {
  // Animation variants remain the same (they are already great!)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50, delay: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, x: 0 }, // Reduced x for mobile
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { type: "spring", stiffness: 80, delay: 0.6 },
    },
  };

  return (
    <section className="bg-white py-10 lg:py-24 overflow-hidden">
      {/* Added overflow-hidden to prevent horizontal scroll from animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content Area */}
          <div className="mb-16 lg:mb-0 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
              variants={itemVariants}
            >
              The smartest way to <br />
              <span className="text-green-800 italic font-serif">
                establish a donor-advised scholarship
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg"
              variants={itemVariants}
            >
              We help conservative- and libertarian-minded donors honor and
              protect their legacy through the creation of donor-advised
              scholarship funds.
            </motion.p>

            {/* Buttons Group - Stacked on small mobile, row on larger */}
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
              variants={itemVariants}
            >
              <button className="px-6 py-3 text-base font-semibold bg-green-800 text-white rounded-md shadow-md hover:bg-green-900 transition duration-300">
                Create a Scholarship
              </button>
              <button className="px-6 py-3 text-base font-semibold border-2 border-gray-300 text-gray-700 rounded-md hover:border-gray-500 transition duration-300">
                Apply for Scholarships
              </button>
            </motion.div>
          </div>

          {/* Visual Area (Image & Card) */}
          <div className="relative w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <motion.img
              className="rounded-lg h-80 sm:h-120 lg:h-150 w-full object-cover shadow-2xl"
              src={bannerImg}
              alt="People shaking hands over a deal"
              variants={imageVariants}
            />

            {/* Scholarship Card Overlay */}
            <motion.div
              className="absolute -bottom-10 lg:-right-4 left-1/2 lg:left-auto transform -translate-x-1/2 lg:translate-x-0 w-[90%] sm:w-auto"
              variants={cardVariants}
            >
              <BannerCard />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
