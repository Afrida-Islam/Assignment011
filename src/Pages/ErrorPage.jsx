
import React from 'react';

const ErrorPage = () => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Code and Main Message */}
        <div className="relative">
          <p className="text-9xl font-extrabold text-indigo-200 opacity-50 dark:text-indigo-800 dark:opacity-30">404</p>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-7xl">
              Lost In Space
            </h1>
          </div>
        </div>

        {/* Descriptive Text */}
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you're looking for seems to have vanished into the digital void.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Don't worry, we'll help you find your way back.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="/" // Link to your homepage
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            🚀 Go Home
          </a>
          <a
            href="/support" // Link to a help/support page
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Need Help?
          </a>
        </div>
        
        {/* Optional Footer/Detail */}
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-600">
          Error Code: E_404_PAGE_NOT_FOUND
        </p>
      </div>
    </div>
  );
};

export default ErrorPage ;