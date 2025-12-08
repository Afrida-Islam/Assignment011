// import { useLoaderData } from "react-router-dom";

const formatCurrency = (amount) => {
  return amount !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    : "N/A";
};

const mockData = {
  _id: "6935d58d14a09c5713e8d398",
  scholarshipName: "Global Excellence Scholarship",
  universityName: "University of Toronto",
  universityImage: "https://i.ibb.co.com/wFk6MLSt/download-17.jpg",
  country: "Canada",
  city: "Toronto",
  worldRank: 21,
  subjectCategory: "Engineering",
  scholarshipCategory: "Partial",
  degree: "Masters",
  tuitionFees: 25000,
  applicationFees: 100,
  serviceCharge: 500,
  // Added some mock detail text for content
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
  // Use mockData for demonstration. In a real app, replace with:
  // const scholarship = useLoaderData();
  const scholarship = mockData;

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
    description,
    requirements,
  } = scholarship;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* University Header Section */}
        <div className="relative h-64">
          <img
            src={universityImage}
            alt={universityName}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 flex flex-col justify-center items-center text-white p-6">
            <p className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-yellow-400">
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
            <h1 className="text-5xl font-extrabold text-center tracking-tight">
              {scholarshipName}
            </h1>
            <p className="mt-3 text-lg font-medium">
              {city}, {country} | World Rank: **#{worldRank}**
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* LEFT COLUMN (Details & Description) */}
          <div className="lg:col-span-2">
            ## 📜 Scholarship Description
            <p className="text-gray-700 leading-relaxed mb-6 border-l-4 border-indigo-400 pl-4 bg-indigo-50 p-3 rounded">
              {description}
            </p>
            --- ## 🛠️ Key Information
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
            --- ## 📑 Application Requirements
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN (Summary & CTA) */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 space-y-6">
              {/* Fee Summary Card */}
              <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-xl">
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

              {/* Other Fees */}
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
              <a
                href="#" // Replace with actual application link
                className="w-full inline-block text-center py-4 px-6 text-xl font-extrabold rounded-lg shadow-2xl text-white bg-green-500 hover:bg-green-600 transition duration-300 transform hover:scale-[1.02]"
              >
                Apply for this Scholarship Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsPage;
