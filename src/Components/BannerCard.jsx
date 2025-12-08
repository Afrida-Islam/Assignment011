import React from "react";

const BannerCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xs mx-auto">
      <div className="bg-green-800 p-6">
        <p className="text-xs text-white font-semibold">
          The Michael C. Maibach Scholarship
        </p>
      </div>

      {/* Content Section (White Background) */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-green-700 mb-1">$15,107</h3>
        <p className="text-xs text-gray-500">University of Northern Vermont</p>
      </div>
    </div>
  );
};

export default BannerCard;
