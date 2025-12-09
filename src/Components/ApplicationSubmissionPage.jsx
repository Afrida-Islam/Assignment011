import { Form, useLoaderData, useNavigation } from "react-router-dom";

// --- PURE HELPER FUNCTION: Currency Formatting ---
const formatCurrency = (amount) => {
  return amount !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    : "N/A";
};

const ApplicationSubmissionPage = () => {
  // Assume the loader for this route fetches the scholarship details using the :scholarshipId param
  const scholarship = useLoaderData();

  // Hook for tracking form submission state
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Destructure required data from the loaded scholarship object
  const {
    _id: scholarshipId,
    scholarshipName,
    universityName,
    scholarshipCategory,
    degree,
    applicationFees = 0, // Default to 0 if undefined to prevent NaN calculation
    serviceCharge = 0, // Default to 0 if undefined
  } = scholarship || {};

  // Safety Check: If data is missing, display an error message
  if (!scholarship || !scholarshipId) {
    return (
      <div className="text-center p-20 text-red-600 bg-white shadow-lg m-10 rounded-lg">
        <h1 className="text-3xl font-bold">Error: Scholarship Data Missing</h1>
        <p className="mt-4">
          Cannot proceed with application. Please ensure you are applying from a
          valid scholarship details page.
        </p>
      </div>
    );
  }

  // Calculate the total fee due at checkout
  const totalPaymentDue = applicationFees + serviceCharge;

  // --- Mock/Placeholder User Data (Must be replaced with data from Auth Context/Loader) ---
  const user = {
    name: "Student Name Placeholder",
    email: "student@example.com",
    userId: "user12345", // Important for backend
  };
  // --------------------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden p-8">
       
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
          Final Application Details
        </h1>
        <p className="text-gray-600 mb-8 border-b pb-4">
          Review your details and fees before proceeding to the secure checkout
          for payment.
        </p>

        {/* The React Router <Form> should be set up to post data to your server action */}
        {/* The 'action' should be your dedicated server endpoint for application submission/payment intent creation */}
        <Form
          method="post"
          action="/payment/checkout"
          className="lg:grid lg:grid-cols-3 lg:gap-8"
        >
          {/* LEFT COLUMN: Student Details Form (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-6">
              Applicant & Application Data
            </h2>

            {/* Hidden fields carrying essential application and user data */}
            <input type="hidden" name="scholarshipId" value={scholarshipId} />
            <input type="hidden" name="universityName" value={universityName} />
            <input
              type="hidden"
              name="scholarshipCategory"
              value={scholarshipCategory}
            />
            <input type="hidden" name="degree" value={degree} />
            <input
              type="hidden"
              name="applicationFees"
              value={applicationFees}
            />
            <input type="hidden" name="serviceCharge" value={serviceCharge} />
            <input
              type="hidden"
              name="totalPaymentAmount"
              value={totalPaymentDue}
            />
            <input type="hidden" name="userId" value={user.userId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name (pre-filled from user profile) */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="fullName"
                  defaultValue={user.name}
                  required
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Email (pre-filled from user profile) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="userEmail"
                  id="email"
                  defaultValue={user.email}
                  required
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mt-8 mb-4 border-t pt-4">
              Required Application Materials
            </h3>

            {/* Field for Resume/CV Upload (URL) */}
            <div>
              <label
                htmlFor="resumeUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Resume/CV Link (Google Drive/Dropbox URL)
              </label>
              <input
                type="url"
                name="resumeUrl"
                id="resumeUrl"
                placeholder="e.g., https://drive.google.com/d/your-resume-link"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Personal Statement/Motivation Letter (URL or Summary) */}
            <div>
              <label
                htmlFor="personalStatement"
                className="block text-sm font-medium text-gray-700"
              >
                Personal Statement Link/Summary
              </label>
              <textarea
                name="personalStatement"
                id="personalStatement"
                rows="4"
                placeholder="Provide a direct link to your statement or a brief summary of why you are applying."
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Checkbox for Terms and Conditions */}
            <div className="flex items-center mt-6">
              <input
                id="agreement"
                name="agreement"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="agreement"
                className="ml-2 block text-sm text-gray-900"
              >
                I confirm that all information provided is accurate and I agree
                to the{" "}
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Terms and Conditions
                </a>
                .
              </label>
            </div>
          </div>

          {/* RIGHT COLUMN: Fee Summary (1/3 width) */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-10 bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-xl">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                Fee Checkout Summary
              </h2>

              {/* Scholarship Info */}
              <div className="mb-6 border-b border-indigo-200 pb-4">
                <p className="text-lg font-semibold text-indigo-700">
                  {scholarshipName}
                </p>
                <p className="text-sm text-gray-500">
                  {universityName} | {degree}
                </p>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(applicationFees)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(serviceCharge)}
                  </span>
                </div>
                <hr className="my-3 border-t border-indigo-300" />
                <div className="flex justify-between items-center text-2xl font-bold text-gray-800">
                  <span>Total Due Now</span>
                  <span className="text-green-600">
                    {formatCurrency(totalPaymentDue)}
                  </span>
                </div>
              </div>

              {/* Apply/Checkout Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full py-3 px-6 text-xl font-extrabold rounded-lg shadow-2xl text-white bg-green-600 hover:bg-green-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Redirecting..." : `Proceed to Secure Payment`}
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                You will be redirected to a secure Stripe checkout page.
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ApplicationSubmissionPage;
