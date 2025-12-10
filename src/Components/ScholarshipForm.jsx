import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- 1. Define Zod Validation Schema ---
const scholarshipSchema = z.object({
  // Core Details
  scholarshipName: z.string().min(3, {
    message: "Scholarship name is required and must be at least 3 characters.",
  }),
  universityName: z.string().min(3, {
    message: "University name is required and must be at least 3 characters.",
  }),

  // Location and Ranking
  country: z.string().min(1, { message: "Country is required." }),
  city: z.string().optional(),
  worldRank: z.preprocess(
    (a) => (a === "" ? undefined : a), // Treat empty string as undefined
    z.number().int().positive("Rank must be a positive integer.").optional()
  ),

  // Classification
  subjectCategory: z
    .string()
    .min(1, { message: "Subject Category is required." }),
  scholarshipCategory: z
    .string()
    .min(1, { message: "Scholarship Category is required." }),
  degree: z.string().min(1, { message: "Degree Level is required." }),

  // Financials and Media
  tuitionFees: z
    .string()
    .min(1, { message: "Tuition Fees information is required." }),
  imageFile: z.any().optional(), // File inputs are complex, often validated server-side or with custom logic
});

// Define the type for the form data based on the Zod schema
// type FormData = z.infer<typeof scholarshipSchema>;

// Common options for dropdowns
const countries = ["USA", "UK", "Canada", "Australia", "Germany", "Other"];
const degrees = [
  "Undergraduate",
  "Graduate (Master's)",
  "Graduate (Ph.D.)",
  "Post-doc",
];
const subjectCategories = [
  "Engineering",
  "Computer Science",
  "Medicine",
  "Arts",
  "Business",
];
const scholarshipCategories = [
  "Merit-Based",
  "Need-Based",
  "Government",
  "University-Specific",
];

const ScholarshipForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      worldRank: undefined,
    },
  });

  // --- 2. Handle Form Submission ---
  const onSubmit = (data) => {
    // NOTE: For file handling, you would typically use FormData:
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, key === 'imageFile' && value[0] ? value[0] : value);
    // });

    console.log("Form Data (Validated):", data);
    alert("Scholarship data submitted! Check console for details.");
    // Example API call: fetch('/api/scholarships', { method: 'POST', body: formData });
  };

  // --- 3. Input Component Helper (for clean repetitive code) ---
  const InputField = ({ label, name, type = "text", placeholder, error }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {errors[name] && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: type === "number" })}
        className={`mt-1 block w-full border rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );

  // --- 4. Select Component Helper ---
  const SelectField = ({ label, name, options, error }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {errors[name] && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`mt-1 block w-full border rounded-md shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );

  // --- 5. Component Render ---
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
          📝 Add New Scholarship
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* --- Section 1: Core Details --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Scholarship Name"
              name="scholarshipName"
              placeholder="e.g., Global Excellence Award"
              error={errors.scholarshipName}
            />
            <InputField
              label="University Name"
              name="universityName"
              placeholder="e.g., Oxford University"
              error={errors.universityName}
            />
          </div>

          {/* --- Section 2: Location and Ranking --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField
              label="Country"
              name="country"
              options={countries}
              error={errors.country}
            />
            <InputField
              label="City"
              name="city"
              placeholder="e.g., London"
              error={errors.city}
            />
            <InputField
              label="University World Rank"
              name="worldRank"
              type="number"
              placeholder="e.g., 5"
              error={errors.worldRank}
            />
          </div>

          {/* --- Section 3: Classification --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField
              label="Subject Category"
              name="subjectCategory"
              options={subjectCategories}
              error={errors.subjectCategory}
            />
            <SelectField
              label="Scholarship Category"
              name="scholarshipCategory"
              options={scholarshipCategories}
              error={errors.scholarshipCategory}
            />
            <SelectField
              label="Degree Level"
              name="degree"
              options={degrees}
              error={errors.degree}
            />
          </div>

          {/* --- Section 4: Financials and Media --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Tuition Fees Covered (e.g., $15,000 or 'Full')"
              name="tuitionFees"
              placeholder="e.g., $20,000/year or Full Tuition"
              error={errors.tuitionFees}
            />

            <div>
              <label
                htmlFor="imageFile"
                className="block text-sm font-medium text-gray-700"
              >
                Image (University or Scholarship Logo)
              </label>
              <input
                type="file"
                id="imageFile"
                {...register("imageFile")} // register file input
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors.imageFile && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.imageFile.message}
                </p>
              )}
            </div>
          </div>

          {/* --- Submit Button --- */}
          <div className="pt-5 border-t mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full justify-center py-3 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {isSubmitting ? "Submitting..." : "🚀 Create Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipForm;
