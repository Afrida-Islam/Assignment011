import React from "react";
import { useForm } from "react-hook-form";
// Assuming this utility exists and handles the upload
import { imageUpload } from "../utils"; 
import useAuth from "../hooks/useAuth"; 
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Added useQueryClient
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorPage from "../Pages/ErrorPage";
import toast, { Toaster } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom"; // Added for navigation

// --- ZOD Schema (No changes needed, it's perfect) ---
const scholarshipSchema = z.object({
  scholarshipName: z
    .string()
    .min(3, { message: "Scholarship Name is required (min 3 chars)." }),
  universityName: z
    .string()
    .min(3, { message: "University Name is required (min 3 chars)." }),
  // Updated image validation for RHF file input
  image: z.any().refine((file) => file && file.length > 0, "Image is required"), 
  country: z.string().min(1, { message: "Country is required." }),
  city: z.string().min(1, { message: "City is required." }),
  worldRank: z.preprocess(
    (a) => (a === "" ? undefined : a),
    z.number().int().positive("Rank must be a positive integer.").optional()
  ),
  subjectCategory: z
    .string()
    .min(1, { message: "Subject Category is required." }),
  scholarshipCategory: z
    .string()
    .min(1, { message: "Scholarship Category is required." }),
  degree: z.string().min(1, { message: "Degree Level is required." }),
  // Financials
  tuitionFees: z
    .string()
    .min(1, { message: "Tuition Fees information is required." }),
});

// --- Constants (No changes needed) ---
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
  "Humanities",
];
const scholarshipCategories = [
  "Merit-Based",
  "Need-Based",
  "Government",
  "University-Specific",
  "Fully Funded",
];

// --- InputField Component (No changes needed) ---
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  valueAsNumber = false,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      placeholder={placeholder}
      {...register(name, { valueAsNumber: valueAsNumber })}
      className={`mt-1 block w-full border rounded-md shadow-sm p-3 focus:ring-lime-500 focus:border-lime-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

// --- SelectField Component (No changes needed) ---
const SelectField = ({ label, name, options, error, register }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      {...register(name)}
      className={`mt-1 block w-full border rounded-md shadow-sm p-3 bg-white focus:ring-lime-500 focus:border-lime-500 ${
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

const AddScholarshipForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Hook for redirection
  const queryClient = useQueryClient(); // Hook for cache invalidation

  // 1. Correctly set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(scholarshipSchema),
  });

  // 2. Setup useMutation for posting data
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (scholarshipData) => {
      // Use the secured axios instance
      const response = await axiosSecure.post(
        "http://localhost:3000/data", // Endpoint changed to a sensible path
        scholarshipData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("🚀 Scholarship added successfully!");
      // Optional: Invalidate queries to refresh any scholarship lists
      queryClient.invalidateQueries({ queryKey: ["scholarships"] }); 
      reset(); // Reset form fields
      navigate("/"); // Redirect to home or dashboard
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error(`❌ Submission failed: ${error.message || "An unknown error occurred."}`);
    },
  });

  // 3. Define the actual submission handler for RHF
  const onSubmit = async (data) => {
    try {
      // 3.1. Upload Image
      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile); // Assuming imageUpload returns a URL

      if (!imageUrl) {
        throw new Error("Failed to upload image. Please try again.");
      }

      // 3.2. Prepare Scholarship Data
      const scholarshipData = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        image: imageUrl, // Use the uploaded URL
        country: data.country,
        city: data.city,
        worldRank: data.worldRank || null, // Ensure null if undefined/empty
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: data.tuitionFees,
        // Agent information from the authenticated user
        agent: { 
          image: user?.photoURL || null,
          name: user?.displayName || user?.email, // Fallback to email if display name is missing
          email: user?.email,
        },
        // Additional Fields (e.g., date, application count) for the backend
        postedAt: new Date().toISOString(),
        applicationCount: 0,
      };

      // 3.3. Call the mutation
      mutate(scholarshipData);

    } catch (error) {
      console.error("Submission Process Error:", error);
      // If image upload fails or any part of the prep fails
      toast.error(`Error during submission: ${error.message}`); 
    }
  };

  // The isPending from useMutation and isSubmitting from useForm control the spinner
  const loading = isPending || isSubmitting;

  if (isError) return <ErrorPage />; // Handle fatal errors

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <h1 className="text-5xl font-extrabold text-green-700 mb-6 border-b pb-2">
          {" "}
          🎓 Add New Scholarship{" "}
        </h1>
        {/* Use RHF's handleSubmit wrapper with the onSubmit function */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Name and University */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Scholarship Name"
              name="scholarshipName"
              placeholder="e.g., Global Research Grant"
              error={errors.scholarshipName}
              register={register}
            />
            <InputField
              label="University Name"
              name="universityName"
              placeholder="e.g., Harvard University"
              error={errors.universityName}
              register={register}
            />
          </div>
          {/* Section 2: Location and Ranking */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField
              label="Country"
              name="country"
              options={countries}
              error={errors.country}
              register={register}
            />
            <InputField
              label="City"
              name="city"
              placeholder="e.g., Boston"
              error={errors.city}
              register={register}
            />
            <InputField
              label="University World Rank (Optional)"
              name="worldRank"
              type="number"
              placeholder="e.g., 1 or 50"
              error={errors.worldRank}
              register={register}
              valueAsNumber={true}
            />
          </div>
          {/* Section 3: Classification and Degree */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField
              label="Subject Category"
              name="subjectCategory"
              options={subjectCategories}
              error={errors.subjectCategory}
              register={register}
            />
            <SelectField
              label="Scholarship Type"
              name="scholarshipCategory"
              options={scholarshipCategories}
              error={errors.scholarshipCategory}
              register={register}
            />
            <SelectField
              label="Degree Level"
              name="degree"
              options={degrees}
              error={errors.degree}
              register={register}
            />
          </div>
          {/* Section 4: Tuition and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t">
            <InputField
              label="Tuition Fees Covered"
              name="tuitionFees"
              placeholder="e.g., $15,000/year or Fully Funded"
              error={errors.tuitionFees}
              register={register}
            />
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Scholarship/University Image{" "}
                {errors.image && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                id="image"
                {...register("image")}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>
          {/* --- Submit Button --- */}
          <div className="pt-5 border-t mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full justify-center py-3 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-700 hover:bg-green-600 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto text-xl" />
              ) : (
                "🚀 Create Scholarship"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipForm;