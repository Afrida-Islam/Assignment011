// src/components/Modals/PayModal.jsx
import React from "react";
import BasicModal from "./BasicModal"; // Adjust path as necessary

const PayModal = ({ isOpen, closeModal, application }) => {
  const amount = application?.amountPaid || 0;

  const handlePayment = () => {
    console.log(
      `Initiating payment of $${amount} for Application ID: ${application?._id}`
    );
    // 1. Redirect to payment gateway or launch embedded payment form (e.g., Stripe, PayPal)
    // 2. After successful payment, call an API to update `paymentStatus` to 'paid'
    // 3. Close the modal on success

    // Simulate payment initiation
    alert("Payment process initiated. (Placeholder)");
    // closeModal(); // Only close on successful API response in real life
  };

  return (
    <BasicModal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Complete Payment"
    >
      <div className="space-y-4 text-center">
        <p className="text-xl font-semibold text-gray-900">
          Amount Due:{" "}
          <span className="text-green-600">${amount.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-600">
          This payment is required to finalize your **pending** application.
        </p>

        {/* Placeholder for payment methods */}
        <div className="border p-4 rounded bg-blue-50">
          <p className="text-sm font-medium">
            Payment Gateway Integration Here
          </p>
          <div className="flex justify-center mt-2 space-x-4">
            {/* Example logos or method buttons */}
            <span className="text-xs text-blue-700">Stripe</span>
            <span className="text-xs text-blue-700">PayPal</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white px-4 py-3 rounded-md text-lg font-bold hover:bg-green-700 transition-colors"
        >
          Proceed to Pay
        </button>
      </div>
    </BasicModal>
  );
};

export default PayModal;
