import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../Components/Navber/Container";

const ScholarshipBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "How to Write a Winning Scholarship Essay",
      category: "Tips & Tricks",
      date: "Oct 12, 2025",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      description:
        "Learn the secrets to crafting a personal statement that captures the attention of scholarship committees.",
    },
    {
      id: 2,
      title: "Top 10 Fully Funded Scholarships for 2026",
      category: "Education News",
      date: "Nov 05, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWyl8NrxeNhyJF_3facF5gaMneOpVhperbKA&s",
      description:
        "A comprehensive list of the most prestigious scholarships worldwide that cover tuition and living expenses.",
    },
    {
      id: 3,
      title: "Navigating the Commonwealth Application Process",
      category: "Guides",
      date: "Dec 01, 2025",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
      description:
        "Step-by-step guidance on how to apply for the Commonwealth scholarship without making common mistakes.",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-20">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-green-900 mb-6 leading-tight"
            >
              Scholarship <br /> Insights & News
            </motion.h1>
            <p className="text-xl text-gray-600">
              Stay updated with the latest trends, guides, and news in the world
              of international scholarships.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="bg-green-100 text-green-800 px-8 py-3 rounded-full font-bold hover:bg-green-200 transition text-lg">
              View All News
            </button>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container - Fixed height for all images */}
              <div className="w-full h-64 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-gray-400 font-bold mb-3 uppercase tracking-wider">
                  {blog.date}
                </span>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-800 transition line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {blog.description}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  className="text-green-800 font-extrabold text-lg flex items-center gap-2 group/btn hover:gap-4 transition-all w-fit"
                >
                  Read Full Story{" "}
                  <span className="transition-transform group-hover/btn:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter - Section 9 or 10 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 bg-green-50 rounded-[2.5rem] p-10 md:p-16 text-center border border-green-100 shadow-inner"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-green-900 mb-6">
            Never miss an update
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto font-medium">
            Subscribe to our newsletter and get the latest scholarship
            opportunities delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-transparent focus:border-green-800 outline-none transition text-lg bg-white shadow-sm"
              required
            />
            <button className="bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-900 transition-all shadow-lg active:scale-95">
              Subscribe Now
            </button>
          </form>
        </motion.div>
      </Container>
    </div>
  );
};

export default ScholarshipBlogs;
