import React, { useState } from 'react';
import { FaGraduationCap, FaUniversity, FaDollarSign, FaUser } from 'react-icons/fa';
// NOTE: Assuming useAuth hook provides user information
import useAuth from '../hooks/useAuth'; 

// Placeholder Data (Replace with actual data fetched from a scholarship list)
const SCHOLARSHIP_DATA = {
    scholarshipId: "SCHOLAR123",
    scholarshipCategory: "Science & Technology",
    degree: "Masters",
    applicationFees: 50, // USD
    serviceCharge: 10, // USD
};

const ApplicationForm = () => {
  // 1. Get User Data using the custom hook
  const { user } = useAuth(); 

  // 2. Initialize Form State
  const [formData, setFormData] = useState({
    scholarshipId: SCHOLARSHIP_DATA.scholarshipId,
    userId: user?.uid || '',
    userName: user?.displayName || '',
    userEmail: user?.email || '',
    universityName: '',
    scholarshipCategory: SCHOLARSHIP_DATA.scholarshipCategory,
    degree: SCHOLARSHIP_DATA.degree,
    applicationFees: SCHOLARSHIP_DATA.applicationFees,
    serviceCharge: SCHOLARSHIP_DATA.serviceCharge,
    applicationStatus: 'pending', // Default status
    paymentStatus: 'unpaid',     // Default status
    applicationDate: new Date().toISOString(),
    // feedback: '' // feedback is added by moderator, so not needed in form
  });
  
  // 3. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend/database
    console.log("Application Submitted:", formData);

    // TODO: Add logic for processing payment here (e.g., redirect to payment gateway)
    alert(`Application submitted! Total Fee: $${formData.applicationFees + formData.serviceCharge}. Proceeding to payment...`);

    // Reset form or redirect user after successful submission/payment
  };

  const totalFee = formData.applicationFees + formData.serviceCharge;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h2 className="text-3xl font-extrabold text-green-700 border-b-4 border-green-500 pb-3 mb-6 flex items-center">
          <FaGraduationCap className="mr-3 text-4xl" /> Scholarship Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* --- User and Scholarship Information (Read-Only) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-green-50 p-4 rounded-lg">
            
            {/* User Name */}
            <div className='flex items-center space-x-3'>
                <FaUser className="text-xl text-green-600" />
                <label className="block text-sm font-medium text-gray-700">Applicant:</label>
                <p className="text-lg font-semibold text-gray-800">{formData.userName || 'N/A'}</p>
            </div>

            {/* User Email */}
            <div className='flex items-center space-x-3'>
                <FaUser className="text-xl text-green-600" />
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="text-lg font-semibold text-gray-800 truncate">{formData.userEmail || 'N/A'}</p>
            </div>

            {/* Scholarship Category */}
            <div className='flex items-center space-x-3'>
                <FaGraduationCap className="text-xl text-green-600" />
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                <p className="text-lg font-semibold text-gray-800">{formData.scholarshipCategory}</p>
            </div>

            {/* Degree Applied For */}
            <div className='flex items-center space-x-3'>
                <FaGraduationCap className="text-xl text-green-600" />
                <label className="block text-sm font-medium text-gray-700">Degree:</label>
                <p className="text-lg font-semibold text-gray-800">{formData.degree}</p>
            </div>
            
          </div>
          
          {/* --- Application Details (User Input) --- */}
          <div>
            <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaUniversity className="mr-2 text-green-600" /> University Name Applied To
            </label>
            <input
              type="text"
              id="universityName"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              required
              placeholder="Enter the University name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
            />
          </div>

          {/* --- Fee Summary --- */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
              <FaDollarSign className="mr-2" /> Application Fee Summary
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Application Fee:</span>
                <span className="font-medium">${formData.applicationFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge:</span>
                <span className="font-medium">${formData.serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-yellow-200 text-xl font-extrabold text-green-700">
                <span>Total Payable Amount:</span>
                <span>${totalFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* --- Submission Button --- */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Submit Application & Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;