import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 text-center">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-300 mb-6">
        You don't have permission to view this page. This route is restricted to
        administrators only.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-all duration-200"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Forbidden;
