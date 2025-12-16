// src/components/Modals/DetailsModal.jsx
import React from "react";
import BasicModal from "./BasicModal"; // Adjust path as necessary

const DetailsModal = ({ isOpen, closeModal, application }) => {
  // Destructure application properties for display
  const {
    scholarshipName,
    universityName,
    status,
    amountPaid,
    paymentStatus, // Assuming this is present
    ...otherDetails // Catch all other fields
  } = application || {};

  const formatCurrency = (amount) => {
    return amount !== undefined
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      : "N/A";
  };

  return (
    <BasicModal
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Details: ${scholarshipName}`}
    >
      <div className="space-y-3 text-sm">
        <h4 className="text-lg font-semibold border-b pb-1">
          Core Information
        </h4>
        <p>
          <strong>Scholarship:</strong> {scholarshipName}
        </p>
        <p>
          <strong>University:</strong> {universityName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-medium ${
              status === "completed" ? "text-green-600" : "text-blue-600"
            }`}
          >
            {status}
          </span>
        </p>
        <p>
          <strong>Application Fee:</strong> {formatCurrency(amountPaid)}
        </p>
        <p>
          <strong>Payment Status:</strong>{" "}
          <span
            className={`font-medium ${
              paymentStatus === "paid" ? "text-green-600" : "text-red-600"
            }`}
          >
            {paymentStatus}
          </span>
        </p>

        <h4 className="text-lg font-semibold border-b pb-1 pt-3">
          Additional Data
        </h4>
        {/* Render a simple list of other properties */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded">
          {Object.entries(otherDetails).map(([key, value]) => (
            // Skip large objects or arrays for clean display, or format them specifically
            <p key={key}>
              <strong className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </strong>
              {typeof value === "object" && value !== null
                ? "[...]"
                : String(value)}
            </p>
          ))}
        </div>
      </div>
    </BasicModal>
  );
};

export default DetailsModal;
