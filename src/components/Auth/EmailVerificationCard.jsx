export default function EmailVerificationCard() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 rounded-lg bg-white text-gray-800 shadow-lg shadow-indigo-200/50 transition-all duration-300 ease-in-out">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Email Verification</h2>
          </div>
          <div className="p-4 rounded-md mb-4 bg-yellow-100 text-yellow-800">
            <p className="text-lg">Your email verification is pending.</p>
          </div>
          <p className="text-sm text-gray-600">
            Please check your inbox and click on the verification link to complete the process.
          </p>
        </div>
      </div>
    )
  }
  
  