import { FaCrown, FaStar, FaTrophy, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MembershipPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handlePayment = async () => {
    if (user?.membership === "gold") {
      return Swal.fire("Info", "You're already a Gold Member 🥇", "info");
    }

    const result = await Swal.fire({
      title: "Confirm Payment?",
      text: "Pay $10 USD to become a Gold Member",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Make Payment",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/member/${user?.email}`, {
          membership: "gold",
        });

        Swal.fire({
          title: "🎉 You're now a Gold Member!",
          html: "<h2 class='text-xl mt-2'>Welcome to the elite Thinkhub community 🥇</h2>",
          icon: "success",
          confirmButtonText: "Start Posting",
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Payment failed. Try again later.", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        {" "}
        <title>Membership | ThinkHub</title>
      </Helmet>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          Become a{" "}
          <span className="text-yellow-400">
            ThinkHub Gold <br /> Member
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl lg:text-2xl font-semibold my-3">
          Post without limits. Stand out with the Gold Badge 🥇
        </p>
        <span className="inline-block mt-4 bg-yellow-500/10 text-yellow-400 px-3 py-2 rounded-full font-semibold border border-yellow-500/20">
          🥇 Elite Community Access
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Card - Payment Section */}
        <div className="md:col-span-2 bg-slate-800 text-white rounded-xl p-6 border-l-4 border-yellow-400 shadow-[0_0_10px_#facc15]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gold Membership</h2>
            <p className=" text-yellow-400 text-3xl font-bold">$10</p>
          </div>

          <ul className="mt-5 space-y-4 ">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Post more than 5
              posts per day
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Earn exclusive Gold
              badge 🥇
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Priority visibility
              in forums
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Access to premium
              developer resources
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Direct messaging with
              other Gold members
            </li>
          </ul>

          <button
            onClick={handlePayment}
            disabled={user?.membership === "gold"}
            className={`mt-6 w-full font-bold py-2 px-4 rounded-xl transition cursor-pointer
    ${
      user?.membership === "gold"
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }
  `}
          >
            {user?.membership === "gold"
              ? "You're Already a Gold Member 🥇"
              : "Make Payment - $10"}
          </button>
        </div>

        {/* Right Card - Badges Info */}
        <div className="md:col-span-1 space-y-6">
          <h3 className="text-lg font-semibold text-gray-200">
            Membership Badges
          </h3>

          <div className="bg-slate-800 border-l-4 border-orange-400 p-4 rounded shadow">
            <h4 className="text-orange-500 text-xl font-bold text-center">
              🥉 Bronze Member
            </h4>
            <p className="text-gray-300 text-center">Free for all users</p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-100">
              <li>5 posts per day</li>
              <li>Basic forum access</li>
            </ul>
          </div>

          <div className="bg-slate-800 border-2 border-yellow-300 p-4 rounded-lg shadow-[0_0_10px_#facc15]">
            <h4 className="text-yellow-600 text-xl font-bold text-center">
              🥇 Gold Member
            </h4>
            <p className="text-gray-300 text-center">Premium membership</p>
            <ul className="mt-2 list-disc list-inside text-sm text-white">
              <li>Unlimited posts</li>
              <li>Priority visibility</li>
              <li>Premium resources</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
