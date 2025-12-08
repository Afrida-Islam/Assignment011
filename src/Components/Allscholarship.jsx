import { useLoaderData } from "react-router";
import { ScholarshipCard } from "../Components/ScholarshipCard";
import { useState } from "react";

const Allscholarship = () => {
  const data = useLoaderData();
  console.log(data);
  const initialData = useLoaderData();

  const [models, setModels] = useState(
    Array.isArray(initialData) ? initialData : []
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const category = e.target.search.value;
    console.log(`Searching for: ${category}`);
    setLoading(true);
    setModels([]);
    fetch(
      `https://assignment010serverside.vercel.app/search?search=${category}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setModels(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error during search:", error);

        setModels([]);
        setLoading(false);
      });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="text-5xl text-center font-extrabold text-green-900">
        Global Scholarship Opportunities 🎓
      </div>
      <p className="text-center text-gray-900 mt-2 mb-8 max-w-3xl mx-auto font-[40px] ">
        Discover and apply for scholarships worldwide. Browse our curated
        catalog of University Scholarships, Grants, and Financial Aid from top
        institutions to fund your education journey.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
      >
        <div className="relative flex items-center w-full max-w-md">
          <input
            name="search"
            type="search"
            placeholder="Search by topic or title..."
            className="w-full input input-bordered rounded-full pl-10 pr-4 py-2 text-gray-700 shadow-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <svg
            className="h-5 w-5 absolute left-3 opacity-50 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </div>
        <button
          type="submit"
          className={`py-2 px-6 rounded-full font-semibold text-white transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
          }`}
          disabled={loading}
        >
          {loading ? "Searching...." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {models.map((model) => (
          <ScholarshipCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Allscholarship;
