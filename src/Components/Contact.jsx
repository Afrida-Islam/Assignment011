import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import Container from "../Components/Navber/Container";

const Contact = () => {
  const contactInfo = [
    {
      icon: <HiOutlineMail className="text-3xl" />,
      title: "Email Us",
      details: "afrida0627@gmail.com",
      sub: "Response within 24 hours",
    },
    {
      icon: <HiOutlinePhone className="text-3xl" />,
      title: "Call Us",
      details: "+8801738128752",
      sub: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: <HiOutlineLocationMarker className="text-3xl" />,
      title: "Visit Us",
      details: "123 Scholarship Way",
      sub: "New York, NY 10001",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-20">
      <Container>
        {/* Header - Large Typography */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold text-green-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <p className="text-xl text-gray-600">
            Have questions about scholarship applications or donor funds? Our
            team is here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-green-50 rounded-3xl border border-green-100 group hover:bg-green-800 transition-colors duration-300"
              >
                <div className="text-green-800 group-hover:text-white transition-colors mb-4">
                  {info.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-lg font-semibold text-green-900 group-hover:text-green-100">
                  {info.details}
                </p>
                <p className="text-sm text-gray-500 group-hover:text-green-200">
                  {info.sub}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form - Professional UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100"
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-800 outline-none transition text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@example.com"
                  className="px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-800 outline-none transition text-lg"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold text-gray-700 ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-800 outline-none transition text-lg"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold text-gray-700 ml-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="Type your message here..."
                  className="px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-800 outline-none transition text-lg resize-none"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="md:col-span-2 bg-green-800 text-white py-5 rounded-xl font-bold text-xl hover:bg-green-900 transition-all shadow-xl mt-4"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
