import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

/**
 * Renders the Payment Status Page (either Success or Failure).
 * * @param {object} props
 * @param {boolean} props.isSuccess - Determines the state (true for success, false for failure).
 * @param {string} props.scholarshipName - The name of the scholarship.
 * @param {string} [props.errorMessage] - The error message, only shown on failure.
 * @param {function} props.onReturnToDashboard - Handler for the dashboard button click.
 */
const PaymentStatusPage = ({
  isSuccess,
  scholarshipName,
  errorMessage,
  onReturnToDashboard,
}) => {
  // --- Dynamic Content based on State ---
  const statusIcon = isSuccess ? (
    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
  ) : (
    <XCircleIcon className="w-20 h-20 text-red-500 mx-auto" />
  );

  const statusTitle = isSuccess ? "Payment Successful!" : "Payment Failed";

  const titleColor = isSuccess ? "text-green-700" : "text-red-700";

  const buttonColor = isSuccess
    ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
    : "bg-red-600 hover:bg-red-700 focus:ring-red-500";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 sm:p-10 text-center border-t-8 border-indigo-500">
        {/* 1. Status Icon */}
        {statusIcon}

        {/* 2. Status Title */}
        <h1 className={`mt-4 text-3xl font-extrabold ${titleColor}`}>
          {statusTitle}
        </h1>

        {/* 3. Scholarship Name */}
        <p className="mt-2 text-lg text-gray-600">
          Status for:{" "}
          <span className="font-semibold text-gray-800">{scholarshipName}</span>
        </p>

        {/* 4. Error Message (Only visible on Failure) */}
        {!isSuccess && errorMessage && (
          <div className="mt-5 p-4 bg-red-50 border border-red-300 rounded-lg">
            <h2 className="text-sm font-medium text-red-800">Error Details:</h2>
            <p className="mt-1 text-sm text-red-600 font-mono break-words">
              {errorMessage}
            </p>
          </div>
        )}

        {/* 5. Success Message (Only visible on Success) */}
        {isSuccess && (
          <p className="mt-5 text-gray-700">
            Your payment has been successfully processed. The scholarship
            application is now complete.
          </p>
        )}

        {/* 6. Action Button */}
        <div className="mt-8">
          <button
            onClick={onReturnToDashboard}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out`}
          >
            {isSuccess
              ? "Go to Dashboard"
              : "Return to Dashboard (Retry Payment)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
