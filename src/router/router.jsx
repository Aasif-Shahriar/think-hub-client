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
import MembershipPage from "../pages/membership/MembershipPage";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../components/forbidden/Forbidden";
import NotFoundPage from "../pages/not-found/NotFoundPage";

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
      {
        path: "membership",
        element: (
          <PrivateRoute>
            <MembershipPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/forbidden",
        Component: Forbidden,
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
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-comments",
        element: (
          <AdminRoute>
            <ReportedComments />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    Component: NotFoundPage,
  },
]);

export default router;
