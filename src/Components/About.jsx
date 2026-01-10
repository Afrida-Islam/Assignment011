import React from "react";
import { motion } from "framer-motion";
import Container from "../Components/Navber/Container";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stats = [
    { label: "Scholarships Awarded", value: "5,000+" },
    { label: "Partner Universities", value: "120+" },
    { label: "Total Funding", value: "$10M+" },
    { label: "Success Rate", value: "98%" },
  ];

  return (
    <div className="bg-white">
      {/* 1. Header Section */}
      <section className="bg-green-50 py-16 lg:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 mb-6">
              Empowering Dreams, <br /> One Scholarship at a Time
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              National Scholarship Trust is dedicated to bridging the gap
              between ambitious students and their academic goals through
              transparent and accessible funding.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 2. Mission & Image Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="Students studying"
                className="rounded-3xl shadow-2xl border-b-8 border-green-800"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to empower the next generation of leaders by
                providing them with the financial resources they need to succeed
                in higher education. We believe that financial constraints
                should never stand in the way of talent and hard work.
              </p>
              <div className="space-y-4">
                {[
                  "Transparency in Selection",
                  "Global Opportunities",
                  "Donor-Advised Support",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-green-800 font-bold text-lg"
                  >
                    <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Statistics Section (Dynamic Data feel) */}
      <section className="bg-green-900 py-16 text-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                  {stat.value}
                </div>
                <div className="text-green-200 text-sm md:text-base uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Call to Action */}
      <section className="py-20 text-center">
        <Container>
          <div className="bg-gray-50 rounded-3xl p-10 md:p-16 border border-gray-100 shadow-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
              Ready to start your journey?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-green-800 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-green-900 transition shadow-lg">
                Explore Scholarships
              </button>
              <button className="border-2 border-green-800 text-green-800 px-10 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition">
                Become a Donor
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
