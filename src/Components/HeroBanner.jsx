import React from "react";
import ScholarshipCard from "./ScholarshipCard";
import bannerImg from "../assets/bannerImg.jpeg";

const HeroBanner = () => {
  return (
    // Outer container with padding and max width
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout: 1/2 for text, 1/2 for image/card */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-10 lg:mb-0">
            <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              The smartest way to <br />
              <span className=" text-green-800  italic font-serif">
                establish a donor-advised scholarship
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              We help conservative- and libertarian-minded donors honor and
              protect their legacy through the creation of donor-advised
              scholarship funds.
            </p>

            {/* Buttons Group */}
            <div className="flex space-x-4">
              <button className="px-6 py-3 text-base font-semibold bg-green-800 text-white rounded-md shadow-md hover:bg-green-900 transition duration-300">
                Create a Scholarship
              </button>
              <button className="px-6 py-3 text-base font-semibold border-2 border-gray-300 text-gray-700 rounded-md hover:border-gray-500 transition duration-300">
                Apply for Scholarships
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <img
              className="rounded-lg h-150 object-cover shadow-2xl"
              src={bannerImg}
            />

            {/* Scholarship Card Overlay */}
            <div className="absolute -bottom-4 lg:-right-4 right-0 transform translate-y-1/2 lg:translate-y-0 lg:translate-x-1/4">
              <ScholarshipCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
