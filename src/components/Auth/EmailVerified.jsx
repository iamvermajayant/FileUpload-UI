import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function VerifiedCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg shadow-emerald-200/50 dark:shadow-emerald-500/30 transition-all duration-300 ease-in-out">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Email Verified</h2>
        </div>
        <div className="p-4 rounded-md mb-4 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200">
          <p className="text-lg">Your email has been successfully verified!</p>
        </div>
        <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
          Thank you for verifying your email. You can now sign in to your account.
        </p>
        <Link to="/login" >
          <button className="w-full py-2 px-4 rounded-md flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white transition-colors duration-300 ease-in-out">
            <FontAwesomeIcon icon="fa-light fa-right-to-bracket" />
            Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}

