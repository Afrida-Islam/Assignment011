import React from "react";
import { motion } from "framer-motion";
import { HiChevronDoubleDown } from "react-icons/hi"; // ফ্লো বোঝানোর জন্য আইকন
import BannerCard from "../Components/BannerCard";
import bannerImg from "../assets/bannerImg.jpeg";

const HeroBanner = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, delay: 0.6 },
    },
  };

  return (
    // Requirement: Height limited to 60–70% of the screen
    <section className="relative w-full min-h-[65vh] lg:h-[70vh] bg-white flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content Area */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4"
              variants={itemVariants}
            >
              The smartest way to <br />
              <span className="text-green-800 italic font-serif">
                establish a scholarship
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg"
              variants={itemVariants}
            >
              We help donors honor and protect their legacy through the creation
              of donor-advised scholarship funds.
            </motion.p>

            {/* Buttons Group (CTA) */}
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
              variants={itemVariants}
            >
              <button className="px-8 py-4 text-lg font-bold bg-green-800 text-white rounded-lg shadow-xl hover:bg-green-900 hover:scale-105 transition duration-300">
                Create a Scholarship
              </button>
              <button className="px-8 py-4 text-lg font-bold border-2 border-green-800 text-green-800 rounded-lg hover:bg-green-50 transition duration-300">
                Apply Now
              </button>
            </motion.div>
          </div>

          {/* Visual Area (Image & Card) */}
          <div className="relative mt-12 lg:mt-0 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <motion.img
              className="rounded-2xl h-64 sm:h-80 lg:h-[50vh] w-full object-cover shadow-2xl border-4 border-green-50"
              src={bannerImg}
              alt="Scholarship Banner"
              variants={imageVariants}
            />

            {/* Scholarship Card Overlay */}
            <motion.div
              className="absolute -bottom-6 lg:-left-10 left-1/2 lg:left-auto transform -translate-x-1/2 lg:translate-x-0 w-[85%] sm:w-auto scale-90 lg:scale-100"
              variants={cardVariants}
            >
              <BannerCard />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Requirement: Clear visual flow to the next section */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center text-green-800 opacity-50"
      >
        <span className="text-xs font-bold uppercase tracking-widest mb-1">
          Scroll
        </span>
        <HiChevronDoubleDown className="text-2xl" />
      </motion.div>
    </section>
  );
};

export default HeroBanner;
