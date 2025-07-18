import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingBar from "../../../../components/loding/LoadingBar";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();

  const { data: { users = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["users", searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil(total / limit);

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchInput.trim());
  };

  const handleMakeAdmin = async (email) => {
    try {
      await axiosSecure.patch(`/users/${email}/role`, { role: "admin" });
      toast.success("User promoted to admin");
      queryClient.invalidateQueries(["users"]);
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to promote");
    }
  };

  const handleRemoveAdmin = async (email) => {
    try {
      await axiosSecure.patch(`/users/${email}/role`, { role: "user" });
      queryClient.invalidateQueries(["users"]);
      toast.success("Admin role removed");
    } catch {
      toast.error("Failed to remove admin");
    }
  };

  const openAdminModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Reorder users: if search result is found, show it at the top
  let displayedUsers = users;
  if (searchTerm) {
    const matched = users.find(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matched) {
      displayedUsers = [matched, ...users.filter((u) => u._id !== matched._id)];
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Manage Users</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="px-4 py-2 rounded bg-slate-800 border border-slate-600 text-white w-full sm:w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <LoadingBar />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-slate-700">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Membership</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-700 text-white"
                >
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user.email)}
                        className="text-red-400 hover:underline cursor-pointer"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => openAdminModal(user)}
                        className="text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 capitalize text-yellow-600">{user.membership}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 gap-2">
            {/* Prev Button */}
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-blue-700"
              } text-white`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-gray-300"
                } hover:bg-blue-700 cursor-pointer`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${
                page === totalPages
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-blue-700"
              } text-white`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal for confirm admin */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-slate-800 p-6 rounded-lg max-w-md w-full text-white shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-2">
              Confirm Make Admin
            </Dialog.Title>
            <p className="text-sm text-gray-300 mb-4">
              Are you sure you want to promote the following user to admin?
            </p>
            <div className="bg-slate-700 p-3 rounded mb-4">
              <p>
                <span className="font-medium">Name:</span> {selectedUser?.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedUser?.email}
              </p>
              <p>
                <span className="font-medium">Membership:</span>{" "}
                {selectedUser?.membership}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleMakeAdmin(selectedUser.email)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <title>Manage Users | ThinkHub</title>

    </div>
  );
};

export default ManageUsers;
