import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

// Helper to format currency for display
const formatCurrency = (amount) => {
  return amount !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    : "N/A";
};

const ScholarshipPaymentModal = ({ closeModal, isOpen = false, model }) => {
  const { user } = useAuth();
  const {
    _id,
    scholarshipName,
    universityName,
    applicationFees,
    serviceCharge,
    subjectCategory,
    universityImage,
  } = model || {};

  const totalPayment = (applicationFees || 0) + (serviceCharge || 0);

  const handlePayment = async () => {
    const scholarshipInfo = {
      // FIX: Change key name from 'plantId' to 'versityId' 
      versityId: _id, // <-- Use the correct key name here
      name: `Application for ${scholarshipName}`,
      description: `Application Fee + Service Charge for ${scholarshipName} at ${universityName}`,
      price: totalPayment,
      category: subjectCategory,
      image: universityImage,
      quantity: 1,
      student: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    // ... rest of the axios call and redirection
    const {data} = await axios.post(
      `http://localhost:3000/create-checkout-session`,
      scholarshipInfo
    );
    window.location.href = data.url;
    // console.log(result);
    
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Application Payment Details
            </DialogTitle>

            <div className="mt-4 space-y-3">
              <p className="text-base font-semibold text-gray-800">
                Scholarship: {scholarshipName}
              </p>
              <p className="text-sm text-gray-600">
                University: {universityName}
              </p>
              <p className="text-sm text-gray-600">
                Subject: {subjectCategory}
              </p>

              <hr className="my-3" />

              <div className="flex justify-between text-sm text-gray-500">
                <span>Application Fee:</span>
                <span className="font-medium text-gray-700">
                  {formatCurrency(applicationFees)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Service Charge:</span>
                <span className="font-medium text-gray-700">
                  {formatCurrency(serviceCharge)}
                </span>
              </div>

              <hr className="my-3 border-dashed" />

              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total Payment:</span>
                <span className="text-green-600">
                  {formatCurrency(totalPayment)}
                </span>
              </div>

              <div className="pt-2 text-sm text-gray-500 border-t mt-4">
                Student: {user?.displayName || user?.email}
              </div>
            </div>

            <div className="flex mt-6 justify-around">
              <button
                onClick={handlePayment}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Proceed to Pay {formatCurrency(totalPayment)}
              </button>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ScholarshipPaymentModal;
