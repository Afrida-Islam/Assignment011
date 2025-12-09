import { Link } from "react-router-dom";

export const ScholarshipCard = ({ model }) => {
  const {
    scholarshipName,
    universityName,
    universityImage,
    country,
    city,
    worldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,

    _id,
  } = model;

  const formatCurrency = (amount) => {
    return amount !== undefined
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      : "N/A";
  };

  const displayRank = worldRank ? `#${worldRank}` : "N/A";

  return (
    <div className="card bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm transform hover:scale-[1.02] transition duration-300">
      {/* Figure (Image) Section */}
      <figure className="h-48 overflow-hidden bg-gray-100">
        <img
          src={universityImage}
          alt={universityName || "University Image"}
          className="w-full h-full object-cover transition duration-500 hover:opacity-90"
        />
      </figure>

      <div className="card-body p-5 flex flex-col">
        <p className="text-sm text-indigo-600 font-bold uppercase mb-1 flex justify-between items-center">
          <span>{universityName || "University"}</span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            🌍 Rank: {displayRank}
          </span>
        </p>

        <h2 className="text-2xl font-extrabold text-gray-900 leading-snug mb-3">
          {scholarshipName}
        </h2>

        <div className="flex flex-wrap gap-2 text-sm mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            🎓 {degree || "Degree"}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
            📚 {subjectCategory || "Subject"}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
            💰 {scholarshipCategory || "Type"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 border-b pb-4 border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="font-semibold text-gray-700">
              {city}, {country}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.026a1 1 0 011.606 0l2.564 3.418a1 1 0 01-.806 1.55l-2.073.414 1.488 2.58a1 1 0 01-.628 1.483l-.707.141-2.074.414a1 1 0 01-1.393-.84l-.568-2.84L5.6 13.916a1 1 0 01-.284-1.353l1.802-2.703-1.606.321a1 1 0 01-1.123-.84l-.568-2.84 1.488 2.58a1 1 0 01-.628 1.483l-.707.141-2.074.414a1 1 0 01-1.393-.84l-.568-2.84L5.6 13.916a1 1 0 01-.284-1.353l1.802-2.703-1.606.321a1 1 0 01-1.123-.84l-.568-2.84z" />
              </svg>
            </span>
            <span className="font-semibold text-gray-700">
              {formatCurrency(tuitionFees)}
            </span>
          </div>
        </div>

        {/* Fees Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="block text-xs font-medium text-gray-500">
              Application Fee
            </span>
            <span className="text-lg font-bold text-gray-800">
              {formatCurrency(applicationFees)}
            </span>
          </div>
          <div>
            <span className="block text-xs font-medium text-gray-500">
              Service Charge
            </span>
            <span className="text-lg font-bold text-gray-800">
              {formatCurrency(serviceCharge)}
            </span>
          </div>
        </div>

        {/* View Details Button (CTA) */}
        <div className="pt-2">
          {_id && (
            <Link
              to={`/scholarshipdetails/${_id}`}
              className="w-full inline-block text-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg shadow-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:shadow-lg"
            >
              View Details
            </Link>
          )}
          {!_id && (
            // Fallback for when _id is not available
            <button
              disabled
              className="w-full inline-block text-center py-3 px-4 text-lg font-bold rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Details N/A
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
