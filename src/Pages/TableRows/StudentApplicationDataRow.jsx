import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DetailsModal from "../Actions/DetailsModal";
import EditApplicationModal from "../Actions/EditApplicationModal";
import PayModal from "../Actions/PayModal";
import AddReviewModal from "../Actions/AddReviewModal";
// --- END: Import Placeholder Modals ---

const StudentApplicationDataRow = ({ application }) => {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  // Replaced the single 'isOpen' with states for all modals
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Unified closeModal handler
  const closeModal = (modalName) => {
    switch (modalName) {
      case "delete":
        setIsDeleteOpen(false);
        break;
      case "details":
        setIsDetailsOpen(false);
        break;
      case "edit":
        setIsEditOpen(false);
        break;
      case "pay":
        setIsPayOpen(false);
        break;
      case "review":
        setIsReviewOpen(false);
        break;
      default:
        // Fallback for the original simple delete modal if needed
        setIsDeleteOpen(false);
        break;
    }
  };

  const {
    _id,
    scholarshipName,
    universityName,
    universityAddress,
    subjectCategory,
    amountPaid,
    status, // Application Status (e.g., "pending", "completed")
    feedback,
    // *** ASSUMING THESE FIELDS EXIST in the application object for full logic ***
    paymentStatus = "unpaid", // Must be 'paid' or 'unpaid'
    review = null, // Check if a review object/content exists
  } = application || {};

  const applicationStatus = status?.toLowerCase();

  // Conditional Logic Variables
  const isPending = applicationStatus === "pending";
  const isCompleted = applicationStatus === "completed";
  const isUnpaid = paymentStatus?.toLowerCase() === "unpaid";
  const hasReview = !!review; // Check if the review field is not null/empty

  const isHighlighted = highlightId && _id === highlightId;

  const formatCurrency = (amount) => {
    return amount !== undefined
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      : "N/A";
  };

  const getStatusColor = (currentStatus) => {
    switch (currentStatus?.toLowerCase()) {
      case "paid":
      case "submitted":
      case "unpaid":
        return "bg-yellow-200 text-yellow-900";
      case "pending":
        return "bg-blue-200 text-blue-900";
      case "completed": // Added color for completed status
        return "bg-green-200 text-green-900";
      case "rejected":
      case "cancelled":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  // Reusable Action Button Component
  const ActionButton = ({
    onClick,
    children,
    bgColor,
    textColor,
    condition = true,
  }) => {
    if (!condition) return null;
    return (
      <button
        onClick={onClick}
        className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full text-xs transition-colors duration-150 ease-in-out mr-1 mb-1 ${bgColor} ${textColor} hover:opacity-80`}
      >
        <span className="relative">{children}</span>
      </button>
    );
  };

  return (
    <tr className={isHighlighted ? "bg-green-50 animate-pulse-once" : ""}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{scholarshipName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{universityName}</p>
      </td>

      {/* 2. University Address */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600 text-xs">{universityAddress}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{subjectCategory}</p>
      </td>

      {/* 4. Application Fees (Amount Paid) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-green-600 font-semibold">
          {formatCurrency(amountPaid)}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full text-xs ${getStatusColor(
            status
          )}`}
        >
          {status || "Pending"}
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm max-w-[200px] whitespace-normal">
        <p className="text-gray-700 text-xs italic">{feedback || "N/A"}</p>
      </td>

      {/* --- ACTIONS COLUMN --- */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex flex-wrap gap-1">
          {/* 1. Details (Always Visible) */}
          <ActionButton
            onClick={() => setIsDetailsOpen(true)}
            bgColor="bg-gray-200"
            textColor="text-gray-800"
          >
            Details
          </ActionButton>

          {/* 2. Edit (Visible only if status is "pending") */}
          <ActionButton
            onClick={() => setIsEditOpen(true)}
            bgColor="bg-yellow-200"
            textColor="text-yellow-900"
            condition={isPending}
          >
            Edit
          </ActionButton>

          {/* 3. Pay (Visible only if status is "pending" AND payment is "unpaid") */}
          <ActionButton
            onClick={() => setIsPayOpen(true)}
            bgColor="bg-green-200"
            textColor="text-green-900"
            condition={isPending && isUnpaid}
          >
            Pay
          </ActionButton>

          {/* 4. Delete (Visible only if status is "pending") */}
          <ActionButton
            onClick={() => setIsDeleteOpen(true)}
            bgColor="bg-red-200"
            textColor="text-red-900"
            condition={isPending}
          >
            Delete
          </ActionButton>

          {/* 5. Add Review (Visible only if status is "completed") */}
          <ActionButton
            onClick={() => setIsReviewOpen(true)}
            bgColor={hasReview ? "bg-purple-100" : "bg-purple-200"}
            textColor="text-purple-900"
            condition={isCompleted}
          >
            {hasReview ? "View Review" : "Add Review"}
          </ActionButton>
        </div>
      </td>

      {/* --- MODALS RENDERED HERE --- */}

      {/* Details Modal */}
      <DetailsModal
        isOpen={isDetailsOpen}
        closeModal={() => closeModal("details")}
        application={application}
      />

      {/* Edit Modal */}
      <EditApplicationModal
        isOpen={isEditOpen}
        closeModal={() => closeModal("edit")}
        application={application}
      />

      {/* Pay Modal */}
      <PayModal
        isOpen={isPayOpen}
        closeModal={() => closeModal("pay")}
        application={application}
      />

      {/* Delete Modal (Uses existing component, updated logic) */}
      {/* <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={() => closeModal("delete")}
        applicationId={_id}
      /> */}

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isReviewOpen}
        closeModal={() => closeModal("review")}
        applicationId={_id}
      />
    </tr>
  );
};

export default StudentApplicationDataRow;
