import React from "react";
import { motion } from "framer-motion";
import Container from "../Components/Navber/Container";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Arif Rahman",
      scholarship: "Global Excellence Scholarship",
      university: "University of Toronto",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      story:
        "National Scholarship Trust helped me navigate the complex application process. Today, I am pursuing my dream in Engineering without any financial burden.",
    },
    {
      id: 2,
      name: "Sara Islam",
      scholarship: "Women in Tech Award",
      university: "MIT",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      story:
        "As a first-generation student, I didn't know where to start. This platform's transparent filtering made it easy to find a scholarship that matched my profile perfectly.",
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      scholarship: "Commonwealth Scholarship",
      university: "Oxford University",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      story:
        "The success rate here is real. I applied to three scholarships through this portal and won two of them! Highly recommend to all serious students.",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-20">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-green-900 mb-6"
          >
            Real Stories, Real Success
          </motion.h1>
          <p className="text-xl text-gray-600">
            Meet the students who transformed their academic journey with the
            help of our scholarship funds.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-3xl p-8 border border-green-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-800">{story.name}</h3>
              <p className="text-green-700 font-semibold mb-2">
                {story.scholarship}
              </p>
              <p className="text-sm text-gray-500 italic mb-6">
                {story.university}
              </p>
              <p className="text-gray-700 leading-relaxed uppercase-first">
                "{story.story}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Professional Impact Section (Requirement 2.3) */}
        <div className="mt-24 bg-green-900 rounded-[3rem] p-10 md:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Want to be our next success story?
            </h2>
            <p className="text-green-100 text-lg">
              Start your application today and join thousands of students who
              have secured their future through National Scholarship Trust.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-green-900 px-10 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition">
              Browse Scholarships
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuccessStories;
