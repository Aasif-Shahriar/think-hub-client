import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MembershipPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: currentUserData,
    isLoading,
    error,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isGoldMember = currentUserData?.membership === "gold";
  const isAdmin = currentUserData?.role === "admin";
  const shouldDisablePayment = isGoldMember || isAdmin;

  const handlePayment = async () => {
    if (isAdmin) {
      return Swal.fire(
        "Info",
        "Admins don’t need to upgrade membership.",
        "info"
      );
    }

    if (isGoldMember) {
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

        await queryClient.invalidateQueries({
          queryKey: ["user", user?.email],
        });

        Swal.fire({
          title: "🎉 You're now a Gold Member!",
          html: "<h2 class='text-xl mt-2'>Welcome to the elite Thinkhub community 🥇</h2>",
          icon: "success",
          confirmButtonText: "Start Posting",
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Payment failed. Try again later.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-white text-center py-10">
        Loading membership info...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-10">
        Failed to load user data.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-aos="fade-up">
      <title>Membership | ThinkHub</title>

      {/* Header */}
      <div
        className="text-center mb-8 px-2 sm:px-6"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          Become a{" "}
          <span className="text-yellow-500 dark:text-yellow-400">
            ThinkHub Gold <br /> Member
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold my-3">
          Post without limits. Stand out with the Gold Badge 🥇
        </p>
        <span className="inline-block mt-4 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-3 py-2 rounded-full font-semibold border border-yellow-300 dark:border-yellow-500/20 text-sm sm:text-base">
          🥇 Elite Community Access
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Card - Payment Section */}
        <div
          className="md:col-span-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-xl p-6 border-l-4 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)] dark:shadow-[0_0_10px_#facc15]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Gold Membership
            </h2>
            <p className="text-yellow-500 dark:text-yellow-400 text-2xl sm:text-3xl font-bold">
              $10
            </p>
          </div>

          <ul className="mt-5 space-y-4 text-sm sm:text-base">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
              <FaCheckCircle className="text-green-500" /> Post more than 5
              posts per day
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
              <FaCheckCircle className="text-green-500" /> Earn exclusive Gold
              badge 🥇
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
              <FaCheckCircle className="text-green-500" /> Priority visibility
              in forums
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
              <FaCheckCircle className="text-green-500" /> Access to premium
              developer resources
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-100">
              <FaCheckCircle className="text-green-500" /> Direct messaging with
              other Gold members
            </li>
          </ul>

          {/* Payment Button */}
          {!isAdmin && (
            <button
              onClick={handlePayment}
              disabled={shouldDisablePayment}
              className={`mt-6 w-full font-bold py-3 rounded-xl transition-colors duration-200 ${
                shouldDisablePayment
                  ? "bg-gray-300 dark:bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isGoldMember
                ? "You're Already a Gold Member 🥇"
                : "Make Payment - $10"}
            </button>
          )}
        </div>

        {/* Right Card - Badges Info */}
        <div
          className="md:col-span-1 space-y-6 px-2 sm:px-0"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center md:text-left">
            Membership Badges
          </h3>

          <div className="bg-white dark:bg-slate-800 border-l-4 border-orange-400 p-4 rounded shadow">
            <h4 className="text-orange-500 dark:text-orange-400 text-xl font-bold text-center">
              🥉 Bronze Member
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
              Free for all users
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-100">
              <li>5 posts per day</li>
              <li>Basic forum access</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 border-2 border-yellow-300 p-4 rounded-lg shadow-[0_0_10px_rgba(250,204,21,0.3)] dark:shadow-[0_0_10px_#facc15]">
            <h4 className="text-yellow-500 dark:text-yellow-400 text-xl font-bold text-center">
              🥇 Gold Member
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
              Premium membership
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-white">
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
