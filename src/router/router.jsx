import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home-page/home/Home";
import JoinUs from "../pages/auth-page/login-page/JoinUs";
import Register from "../pages/auth-page/register-page/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import PostDetails from "../pages/home-page/post-details-&-comment/PostDetails";
import MyProfile from "../pages/dashboard/my-profile/MyProfile";
import AddPost from "../pages/dashboard/add-post/AddPost";
import MyPosts from "../pages/dashboard/my-posts/MyPosts";
import CommentManagement from "../pages/dashboard/comments-management/CommentManagement.";
import AdminProfile from "../pages/dashboard/admin/admin-profile/AdminProfile";
import ManageUsers from "../pages/dashboard/admin/manage-users/ManageUsers";
import ReportedComments from "../pages/dashboard/admin/reported-comments/ReportedComments";
import MakeAnnouncement from "../pages/dashboard/admin/make-announcemments/MakeAnnouncement";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/posts/search",
        Component: Home,
      },
      {
        path: "/posts/:id",
        element: <PostDetails />,
      },
      {
        path: "join-us",
        Component: JoinUs,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  //   dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/add-post",
        element: <AddPost />,
      },
      {
        path: "/dashboard/my-posts",
        element: <MyPosts />,
      },
      {
        path: "/dashboard/comments/:postId",
        element: <CommentManagement />,
      },

      // admin route
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/reported-comments",
        element: <ReportedComments />,
      },
      {
        path: "/dashboard/announcement",
        element: <MakeAnnouncement />,
      },
    ],
  },
]);

export default router;
