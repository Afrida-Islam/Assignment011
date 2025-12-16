import { useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import DeleteModal from "../../Pages/DeleteScholarship";

const StudentApplicationDataRow = ({ application }) => {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const {
    _id,
    universityName,
    universityAddress,
    subjectCategory,
    amountPaid,
    status,
    feedback,
  } = application || {};
  const isHighlighted = highlightId && _id === highlightId;

  // ... (formatCurrency and getStatusColor functions remain the same)
  // const formatCurrency = (amount) => {
  //   return amount !== undefined
  //     ? new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount)
  //     : "N/A";
  // };

  const getStatusColor = (currentStatus) => {
    switch (currentStatus?.toLowerCase()) {
      case "paid":
      case "submitted":
        return "bg-yellow-200 text-yellow-900";
      case "pending":
        return "bg-blue-200 text-blue-900";
      case "rejected":
      case "cancelled":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  return (
    <tr
      className={isHighlighted ? "bg-green-50 animate-pulse-once" : ""}
    >
 
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{universityName }</p>
      </td>

      {/* 2. University Address */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600 text-xs">
          {universityAddress }
        </p>
      </td>

      {/* 3. Subject Category */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{subjectCategory }</p>
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

      {/* 6. Feedback (from moderator) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm max-w-[200px] whitespace-normal">
        <p className="text-gray-700 text-xs italic">{feedback || "N/A"}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {["submitted", "pending", "paid"].includes(status?.toLowerCase()) ? (
          <button
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
          >
            <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-70 rounded-full"></span>
            <span className="relative cursor-pointer">Cancel</span>
          </button>
        ) : (
          <span className="text-gray-400">No Action</span>
        )}

        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          applicationId={_id}
        />
      </td>
    </tr>
  );
};

export default StudentApplicationDataRow;
