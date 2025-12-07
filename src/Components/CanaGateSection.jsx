import React from "react";
import img1 from "../assets/download (1).jpeg";
import img2 from "../assets/download (2).jpeg";
import img3 from "../assets/download (3).jpeg";
import img4 from "../assets/images (4).jpeg";
const FeatureCard = ({ imageSrc, icon, title, description, isReversed }) => (
  <div
    className={`flex flex-col gap-4 p-4 ${
      isReversed ? "md:flex-row-reverse" : "md:flex-row"
    } items-center`}
  >
    <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg relative">
      <img src={imageSrc} alt={title} className="w-full h-auto object-cover" />
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

        <h3 className="text-xl font-bold text-green-800  uppercase tracking-wider">
          {title}
        </h3>
      </div>

      <p className="text-sm text-gray-800">{description}</p>
    </div>
  </div>
);

const CanaGateSection = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-800  text-center mb-12">
        Why Apply on CanaGate?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        <FeatureCard
          imageSrc={img1}
          icon="⭐"
          title="Free Service"
          description="Free Service Free Service Free Service Experience ethical and accessible Free Free Free Free Service Free Service Free Service Free."
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
          description="Our team provides Our team providesOur team providesOur team providesOur team providesOur team providesOur team providesOur team provides."
          isReversed={false}
        />

        <FeatureCard
          imageSrc={img4}
          icon="🌟"
          title="4.9 Rated out of 5"
          description="Thousands of students Thousands students Thousands Thousands The Thousands The Thousands The Thousands."
          isReversed={true} // Text on Left, Image on Right
        />
      </div>
    </div>
  );
};

export default CanaGateSection;
