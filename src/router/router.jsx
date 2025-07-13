import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home-page/home/Home";
import JoinUs from "../pages/auth-page/login-page/JoinUs";
import Register from "../pages/auth-page/register-page/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

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
    children: [],
  },
]);

export default router;
