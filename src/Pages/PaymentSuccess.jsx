import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
const formatCurrency = (amount) => {
  return amount !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    : "N/A";
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setLoading(true);
      axios
        .post(`https://serverside11.vercel.app/payment-success`, {
          sessionId,
        })
        .then((response) => {
          setPaymentDetails(response.data);
        })
        .catch((error) => {
          console.error("Error confirming payment or fetching details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Processing payment details...</p>
      </div>
    );
  }
  if (!paymentDetails) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-red-100 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Payment Status Unknown
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't confirm your payment details. Please check your
          applications or contact support.
        </p>
        <Link
          to="/dashboard/my-applications"
          className="inline-block bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Go to My Applications
        </Link>
      </div>
    );
  }
  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCity,
    universityCountry,
    amountPaid,
    transactionId,
  } = paymentDetails;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 max-w-lg w-full rounded-2xl shadow-2xl text-center border-t-8 border-green-500">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />

        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your scholarship application payment has been completed.
        </p>

        {/* --- Scholarship Details Section --- */}
        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 mt-6 text-left">
          <h2 className="text-xl font-semibold border-b pb-2 text-gray-700">
            Order Summary
          </h2>
          <div className="flex justify-center">
            <img
              src={universityImage}
              className="w-20 h-20 object-cover opacity-80 "
            />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Scholarship:</span>
            <span className="font-medium text-gray-800">{scholarshipName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">University:</span>
            <span className="font-medium text-gray-800">{universityName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">University Address:</span>
            <span className="font-medium text-gray-800">
              {universityCity}, {universityCountry}
            </span>
          </div>

          <div className="flex justify-between pt-2 border-t border-dashed">
            <span className="text-gray-500 font-bold">Amount Paid:</span>
            <span className="text-green-600 text-xl font-extrabold">
              {formatCurrency(amountPaid)}
            </span>
          </div>

          {transactionId && (
            <div className="text-xs text-gray-400 pt-1 border-t">
              Transaction ID: {transactionId}
            </div>
          )}
        </div>

        <Link
          to="/dashboard/my-applications"
          className="mt-8 inline-block w-full bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-800 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Go to My Applications
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
