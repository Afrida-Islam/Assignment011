import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const formatCurrency = (amount) => {
  // Removed incorrect useLoaderData calls from here.
  return amount !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    : "N/A";
};

const mockData = {
  description:
    "The Global Excellence Scholarship is awarded to outstanding international students entering the University of Toronto's Master's program in Engineering. It recognizes academic achievement, leadership potential, and commitment to global citizenship. The scholarship covers a significant portion of the tuition and is renewable based on continued academic performance.",
  requirements: [
    "Minimum GPA of 3.8/4.0 or equivalent.",
    "Two letters of recommendation.",
    "Statement of Purpose (500 words maximum).",
    "Proof of English proficiency (TOEFL/IELTS).",
  ],
};

const ScholarshipDetailsPage = () => {
  const loadedData = useLoaderData();

  const model = {
    ...loadedData,
    ...mockData,
  };

  if (!model || !model.scholarshipName) {
    return (
      <div className="text-center p-20 text-red-600 bg-white shadow-lg m-10 rounded-lg">
        <h1 className="text-3xl font-bold">Scholarship Not Found</h1>
        <p className="mt-4">
          The details for this scholarship could not be loaded. Please ensure
          the URL is correct or try again later.
        </p>
      </div>
    );
  }

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
    description, // These now come from the merged 'mockData'
    requirements, // These now come from the merged 'mockData'
    _id,
  } = model;
  // -------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* University Header Section */}
        <div className="flex flex-col lg:flex-row h-96 bg-white overflow-hidden">
          {/* LEFT SIDE: Image Container */}
          <div className="lg:w-1/2 w-full h-1/2 lg:h-full relative">
            <div className="justify-center items-center flex flex-col ">
              <img
                src={universityImage}
                alt={universityName}
                // Ensure the image covers its container
                className="w-150 h-100 object-cover opacity-80 "
              />
            </div>
          </div>

          <div className="lg:w-1/2 w-full h-1/2 lg:h-full relative">
            <div className="absolute inset-0 bg-green-900 flex flex-col justify-center items-center text-white p-6">
              <p className="text-xl font-semibold mb-2 flex items-center gap-2 text-yellow-400">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 14.5l-8-4v6l8 4 8-4v-6l-8 4zM12 11l-8-4v6l8 4 8-4v-6l-8 4z" />
                  </svg>
                </span>
                {universityName}
              </p>

              <h1 className="text-5xl font-extrabold text-center tracking-tight text-white">
                {scholarshipName}
              </h1>

              <p className="mt-3 text-lg font-medium text-white">
                {city}, {country} | World Rank:{worldRank}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          <div className="lg:col-span-2">
            <h2> 📜 Scholarship Description</h2>
            <p className="text-gray-700 leading-relaxed mb-6 border-l-4 border-indigo-400 pl-4 bg-indigo-50 p-3 rounded">
              {description}
            </p>
            <hr />
            <h2> 🛠️ Key Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {[
                { label: "Degree Level", value: degree, icon: "🎓" },
                { label: "Subject Area", value: subjectCategory, icon: "📚" },
                {
                  label: "Scholarship Type",
                  value: scholarshipCategory,
                  icon: "💰",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-sm font-medium text-gray-500">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-gray-800 flex items-center gap-1 mt-1">
                    {item.icon} {item.value}
                  </p>
                </div>
              ))}
            </div>
            <hr />
            <h2> 📑 Application Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-10 space-y-6">
              <div className="bg-orange-700 text-white p-6 rounded-xl shadow-xl">
                <p className="text-lg font-medium mb-2">
                  Estimated Annual Cost
                </p>
                <p className="text-4xl font-extrabold">
                  {formatCurrency(tuitionFees)}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  Tuition fees before scholarship coverage.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Application Costs
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(applicationFees)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Charge</span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(serviceCharge)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <Link
                to={"/application"}
                className="w-full inline-block text-center py-4 px-6 text-xl font-extrabold rounded-lg shadow-2xl text-white bg-green-800 hover:bg-green-900 transition duration-300 transform hover:scale-[1.02]"
              >
                Apply for this Scholarship Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsPage;
