import React, { useState } from "react";
// Assuming these imports are correctly set up in your local file structure
import img1 from "../assets/download (1).jpeg";
import img2 from "../assets/download (2).jpeg";
import img3 from "../assets/download (3).jpeg";
import img4 from "../assets/images (4).jpeg";
import img5 from "../assets/download (4).jpeg";
import img6 from "../assets/images (5).jpeg";
import img7 from "../assets/download (5).jpeg";

const FeatureCard = ({ imageSrc, icon, title, description, isReversed }) => (
  <div
    className={`flex flex-col gap-4 p-4 ${
      isReversed ? "md:flex-row-reverse" : "md:flex-row"
    } items-center`}
  >
    <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg relative">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-auto object-cover aspect-video"
      />
    </div>
    <div
      className={`w-full md:w-1/2 flex flex-col justify-center text-center ${
        isReversed ? "md:text-left" : "md:text-right"
      } p-4`}
    >
      <div
        className={`flex items-center gap-3 ${
          isReversed ? "md:justify-start" : "md:justify-end"
        } justify-center mb-2`}
      >
        <span className="text-3xl text-yellow-400">{icon}</span>

        <h3 className="text-xl font-bold text-green-800 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-800">{description}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="bg-green-800/80 rounded-lg mb-2 overflow-hidden">
    <button
      className="flex justify-between items-center w-full py-4 px-6 text-left text-lg font-medium transition-colors"
      style={{
        backgroundColor: isOpen ? "#22201d" : "transparent",
      }}
      onClick={onClick}
    >
      <span className={isOpen ? "text-green-400 font-semibold" : "text-white"}>
        {question}
      </span>

      <span className={`text-2xl ${isOpen ? "text-green-400" : "text-white"}`}>
        {isOpen ? "−" : "+"}
      </span>
    </button>

    <div
      className={`overflow-hidden transition-all duration-500 ${
        isOpen ? "max-h-96 opacity-100 pb-4 pt-0" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-sm text-gray-800 pr-6 border-l-4 border-orange-400 pl-6 mx-6">
        {answer}
      </p>
    </div>
  </div>
);

const CanaGatePage = () => {
  const [openFAQ, setOpenFAQ] = useState(
    "Can I work while studying in Canada?"
  );

  const faqData = [
    {
      question: "How do I apply for a study permit in Canada?",
      answer:
        "You must apply online through the official Government of Canada website. You will need a letter of acceptance from a Designated Learning Institution (DLI) and proof of funds.",
    },
    {
      question: "Can I work while studying in Canada?",
      answer:
        "Yes, in most cases, full-time international students in Canada are allowed to work part-time (up to 20 hours per week) and full-time during scheduled breaks. However, there are exceptions, so it’s important to check the specific regulations related to your study permit.",
    },
    {
      question: "How can I extend my study permit in Canada?",
      answer:
        "You must apply for an extension online at least 30 days before your current permit expires. Ensure you maintain your student status while the application is processing.",
    },
    {
      question: "Can I work in Canada after completing my studies?",
      answer:
        "You may be eligible for the Post-Graduation Work Permit (PGWP) program, allowing you to gain valuable Canadian work experience after graduation. The length of the permit varies.",
    },
    {
      question: "Can I bring my family with me to Canada while I study?",
      answer:
        "Yes, your spouse or common-law partner may apply for an open work permit, and dependent children may apply for study permits or visitor visas.",
    },
  ];

  return (
    <div className="bg-white text-white min-h-screen">
      <div className="py-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
          Why Apply on CanaGate?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <FeatureCard
            imageSrc={img1}
            icon="⭐"
            title="Free Service"
            description="Free Service Free Service Experience ethical and accessible Free Free Free Free Service Free Service Free Service Free."
            isReversed={false}
          />

          <FeatureCard
            imageSrc={img2}
            icon="📝"
            title="Easy Application"
            description="Make it Easier to make it easier to application to make it easier to application to make it easier to application."
            isReversed={true}
          />

          <FeatureCard
            imageSrc={img3}
            icon="🏅"
            title="Award Winning Support"
            description="Our team provides Our team providesOur team providesOur team providesOur team provides."
            isReversed={false}
          />

          <FeatureCard
            imageSrc={img4}
            icon="🌟"
            title="4.9 Rated out of 5"
            description="Thousands of students Thousands students Thousands Thousands The Thousands The Thousands The Thousands."
            isReversed={true}
          />
        </div>
      </div>
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-[350px] h-[550px]">
              <img
                src={img6}
                alt="Cityscape"
                className="absolute top-0 left-0 w-64 h-40 object-cover rounded-lg shadow-2xl z-10"
              />
              <img
                src={img5}
                alt="Students Group"
                className="absolute top-20 left-20 w-64 h-48 object-cover rounded-lg shadow-2xl z-20"
              />
              <img
                src={img7}
                alt="Autumn Campus"
                className="absolute bottom-0 left-0 w-80 h-60 object-cover rounded-lg shadow-2xl z-30"
              />
              <div className="absolute bottom-10 right-10 z-40 bg-green-500 p-4 rounded-full shadow-lg">
                <span className="text-white text-3xl">🎓</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqData.map((item, index) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === item.question}
                  onClick={() =>
                    setOpenFAQ(openFAQ === item.question ? null : item.question)
                  }
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <span className="text-3xl text-gray-500 animate-bounce">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanaGatePage;
