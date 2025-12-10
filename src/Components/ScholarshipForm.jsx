import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// New Import: Toast Library
import toast, { Toaster } from "react-hot-toast";

// --- 1. Define Zod Validation Schema (Schema remains unchanged) ---
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

// Common options for dropdowns (Unchanged)
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
    reset, // <-- Use reset to clear the form after submission
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      worldRank: undefined,
    },
  });

  // --- 2. Updated onSubmit Function ---
  const onSubmit = (data) => {
    // NOTE: This part simulates a successful API call.
    // In a real application, you would wrap your fetch/axios call here.

    console.log("Form Data (Validated):", data);

    // Simulate a successful API response delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // 1. Show Success Toast
        toast.success(
          `Scholarship "${data.scholarshipName}" created successfully!`
        );

        // 2. Clear the form fields
        reset();

        resolve();
      }, 1500); // 1.5 second delay to show loading state
    }).catch((error) => {
      // Handle API errors and show an error toast
      toast.error("An error occurred while creating the scholarship.");
      console.error("Submission Error:", error);
    });
  };

  // --- 3. Input Component Helper (Unchanged) ---
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
        className={`mt-1 block w-full border rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );

  // --- 4. Select Component Helper (Fixed border-green-300 to border-gray-300) ---
  const SelectField = ({ label, name, options, error }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {errors[name] && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`mt-1 block w-full border rounded-md shadow-sm p-3 bg-white focus:ring-green-500 focus:border-green-500 ${
          error ? "border-red-500" : "border-gray-300" // Changed green-300 back to gray-300 for normal state
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

  // --- 5. Component Render (Added Toaster component) ---
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Required for toasts to appear */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6 border-b pb-2">
          📝 Add New Scholarship
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ... Form sections 1, 2, 3, and 4 ... (Layout unchanged) */}
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
                className="block text-sm font-medium text-gray-700" // Changed green-700 to gray-700 for better contrast
              >
                Image (University or Scholarship Logo)
              </label>
              <input
                type="file"
                id="imageFile"
                {...register("imageFile")} // register file input
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" // Adjusted colors for file input
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
              className="w-full justify-center py-3 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
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
